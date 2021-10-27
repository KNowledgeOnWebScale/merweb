# Mermaid to SHACL shapes

## Features

- Generates SHACL shapes from Mermaid class diagram.
- Generates custom vocabulary for classes and properties from Mermaid class diagram.

## Usage
- Install dependencies via `npm i`.
- Execute tool via `node bin/cli.js -f path/to/diagram -s path/to/jsonld`.
You can try
```bash
node bin/cli.js -f examples/diagram.txt -s shapes.jsonld -b "sc=https://w3di.org/idlab/ns/supply-chain/#" -v "sc=https://w3di.org/idlab/ns/supply-chain/#" -c vocab.jsonld
```