#!/usr/bin/env node

import {Command} from 'commander';
import path from 'path';
import {promises as fs} from 'fs';
import parseDiagram from '../index.js';
import removeAnnotations from "../lib/remove-annotations.js";

main();

async function main() {
  const program = new Command();

  program
    .requiredOption('-f, --file <path>', 'File with diagram')
    .option('-s, --shapes-output <path>', 'File where shape is written to')
    .option('-b, --shapes-base-iri <iri>', 'Base IRI of the shapes', 'ex=http://example.com/')
    .option('-c, --custom-output <path>', 'Base IRI of the shapes',)
    .option('-v, --custom-base-iri <iri>', 'Base IRI of custom vocabulary',)
    .option('-p, --custom-prefixes <iri>', 'Prefixes mapped to IRIs',)
    .option('-r, --remove-annotations', 'Remove annotations of diagram. Result is written to stdout',);

  program.parse(process.argv);
  const options = program.opts();

  if (!path.isAbsolute(options.file)) {
    options.file = path.join(process.cwd(), options.file);
  }

  if (options.removeAnnotations) {
    await removeAnnotations(options.file);
    process.exit(0);
  }

  const diagram = await fs.readFile(options.file, 'utf-8');
  const opt = {
    shapesBaseIri: {
      prefix: options.shapesBaseIri.split('=')[0],
      iri: options.shapesBaseIri.split('=')[1]
    }
  };

  if (options.customBaseIri) {
    opt.customBaseIri = {
      prefix: options.customBaseIri.split('=')[0],
      iri: options.customBaseIri.split('=')[1]
    }
  }

  if (options.customPrefixes) {
    const prefixes = options.customPrefixes.split(";")
    opt.customPrefixes = {}
    prefixes.forEach(prefix => {
      opt.customPrefixes[prefix.split("=")[0]] = prefix.split("=")[1]
    });
  }

  const {shapes, customVocab} = parseDiagram(diagram, opt);

  printOrWriteToFile(options.shapesOutput, shapes);

  if (options.customBaseIri) {
    printOrWriteToFile(options.customOutput, customVocab);
  }

}

function printOrWriteToFile(outputPath, data) {
  if (outputPath) {
    if (!path.isAbsolute(outputPath)) {
      outputPath = path.join(process.cwd(), outputPath);
    }

    fs.writeFile(outputPath, JSON.stringify(data));
  } else {
    console.dir(data, {depth: 10});
  }
}