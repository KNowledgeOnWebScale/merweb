import { Command } from 'commander';
import path from 'path';
import { promises as fs } from 'fs';
import getShapes from '../index.js';

main();

async function main() {
  const program = new Command();

  program
    .requiredOption('-f, --file <file>', 'File with diagram')
    .option('-o, --output <output>', 'File where shape is written to');

  program.parse(process.argv);
  const options = program.opts();

  if (!path.isAbsolute(options.file)) {
    options.file = path.join(process.cwd(), options.file);
  }

  const diagram = await fs.readFile(options.file, 'utf-8');

  const shapes = getShapes(diagram);

  if (options.output) {
    if (!path.isAbsolute(options.output)) {
      options.output = path.join(process.cwd(), options.output);
    }

    fs.writeFile(options.output, JSON.stringify(shapes));
  } else {
    console.dir(shapes, {depth: 10});
  }
}