# 🕸 Merweb

Merweb (Mermaid meets Semantic Web) is library and command line interface to 
generate SHACL shapes and vocabularies from [Mermaid class diagrams](https://mermaid-js.github.io/mermaid/#/classDiagram).

## Usage

- Install dependencies via `npm i`.
- Execute tool via `node bin/cli.js -f path/to/diagram -s path/to/jsonld`.
You can try
```bash
node bin/cli.js -f examples/diagram.txt -s shapes.jsonld -b "sc=https://w3di.org/idlab/ns/supply-chain/#" -v "sc=https://w3di.org/idlab/ns/supply-chain/#" -c vocab.jsonld
```

## Examples

You can find example diagrams in the folder `examples`.

## License

This code is copyrighted by [Ghent University – imec](http://idlab.ugent.be/) and 
released under the [MIT license](http://opensource.org/licenses/MIT).