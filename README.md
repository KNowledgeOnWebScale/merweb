# Mermaid to SHACL shapes

## Usage
- Install dependencies via `npm i`.
- Execute tool via `node bin/cli.js -f path/to/diagram -o path/to/jsonld`.
You can try
```bash
node bin/cli.js -f examples/diagram.txt -o shapes.jsonld -b "sc=https://w3di.org/idlab/ns/supply-chain/#"
```