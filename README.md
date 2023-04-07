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
  -p "swrl=http://www.w3.org/2003/11/swrl#;owl=http://www.w3.org/2002/07/owl#"
  -c vocab.jsonld
```

## Examples

You can find example diagrams in the folder `examples`.

## Annotations

Memweb reuses one existing Mermaid annotation and 
uses five new annotations to generate the correct shapes and vocabularies 
from the class diagrams.
Below you can find a table of these annotations.

| Annotation | Description | Shape | Vocabulary | Existing or new annotation |
| ---------- | ----------- | ----- | ---------- | --------------- |
| `@type` | The type of a class | Object of `sh:targetNode` | A `rdfs:Class` | New |
| `@superTypes` | The super-types of a class | N/A | Object(s) of `rdfs:subClassOf` | New |
| `@extraTypes` | The extra types of a class | Object of `sh:property` with `rdf:type` as `sh:path` | A `rdfs:Class` | New |
| `@label` | The label of a class or property | N/A | Object of `rdfs:label` | New  |
| `@comment` | The comment of a class or property | N/A | Object of `rdfs:comment` | New |
| Cardinality on a class attribute| The cardinality of datatype property | Objects of `sh:minCount` and `sh:maxCount` | N/A | New |
| [Cardinality on a relationship between two classes](https://mermaid-js.github.io/mermaid/#/classDiagram?id=cardinality-multiplicity-on-relations) | The cardinality of object property | Objects of `sh:minCount` and `sh:maxCount` | N/A | Existing |

Please note that the annotations `@type`, `@superTypes`, and `@extraTypes` assume a strict ordering: 
`@type` should always be declared before `@superTypes` and `@extraTypes` are declared. The internal ordering of the latter two can be arbitrary.


## Remove annotations from diagrams

You can remove the annotations starting with `@` from diagrams via the `-r, --remove-annotations` option.
The changed diagram is outputted to the terminal.

```bash
merweb -f examples/diagram.txt -r
```

## License

This code is copyrighted by [Ghent University – imec](http://idlab.ugent.be/) and 
released under the [MIT license](http://opensource.org/licenses/MIT).