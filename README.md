# 🕸 Merweb

Merweb (Mermaid meets Semantic Web) is library and command line interface to 
generate SHACL shapes and vocabularies from [Mermaid class diagrams](https://mermaid-js.github.io/mermaid/#/classDiagram).

## Usage

- Install via `npm i -g merweb`.
- Execute tool via `merweb -f path/to/diagram -s path/to/jsonld`.
You can try
```bash
merweb -f examples/diagram.txt \
  -s shapes.jsonld \
  -b "sc=https://w3id.org/idlab/ns/supply-chain/#" \
  -v "sc=https://w3id.org/idlab/ns/supply-chain/#" \
  -c vocab.jsonld
```

## Examples

You can find example diagrams in the folder `examples`.

## Remove annotations from diagrams

You can remove the annotations (lines starting with `@`) from diagrams via the `-r, --remove-annotations` option.
The changed diagram is outputted to the terminal.

```bash
merweb -f examples/diagram.txt -r
```

## License

This code is copyrighted by [Ghent University – imec](http://idlab.ugent.be/) and 
released under the [MIT license](http://opensource.org/licenses/MIT).