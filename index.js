import mermaid from 'mermaid';

function main(input) {
  const idToType = {};

  const result = mermaid.parse(input).parser.yy;
// console.log(result);

  const classes = result.getClasses();
  const relations = result.getRelations();
  const classNames = Object.keys(classes);
  const shapes = [];


  classNames.forEach(className => {
    const shape = {};
    const data = classes[className];
    // console.log(data);
    shape['@id'] = 'ex:' + data.id + 'Shape';
    shape['_id'] = data.id;
    shape['@type'] = 'NodeShape';
    parseMembers({members: data.members, shape, relations, id: data.id, idToType});
    // console.log(JSON.stringify(shape));
    shapes.push(shape);
  });

  shapes.forEach(shape => {
    shape.property?.forEach(prop => {
      if (prop.potentialClass) {
        const c = getClass({str: prop.potentialClass, relations, idSource: shape['_id'], idToType});

        if (c) {
          prop.class = {'@id': c};
          const card = getCardinalityForTwoClasses({id1: shape['_id'], id2: prop.potentialClass, relations});

          if (card) {
            const {min, max} = parseCardinality(card);

            if (min !== undefined) {
              prop.minCount = min;
            }

            if (max !== undefined) {
              prop.maxCount = max;
            }
          }
        }

        delete prop.potentialClass;
      }
    });

    delete shape['_id'];
  })

  const finalJSONLD = {
    '@context': {
      '@vocab': 'http://www.w3.org/ns/shacl#',
      ex: 'http://example.com/',
      schema: 'https://schema.org/',
      xsd: 'http://www.w3.org/2001/XMLSchema#',
      io: 'http://www.industrialontologies.org/core#',
      sc: 'https://w3di.org/idlab/ns/supply-chain/#',
      scro: 'https://www.industrialontologies.org/ontology/supplychain/SCRO/'
    },
    '@graph': shapes
  };

  return finalJSONLD;
}

// console.dir(finalJSONLD, {depth: 10});
// console.log(JSON.stringify(finalJSONLD));

function parseMembers(options) {
  const {members, shape, relations, id, idToType} = options;
  members.forEach(member => {
    member = member.trim();
    const split = member.split(' ');
    console.log(split);

    if (split[0] === '@type') {
      shape.targetClass = {'@id': split[1]};
      idToType[id] = split[1];
    } else if (split.length >= 3) {
      if (!shape.property) {
        shape.property = [];
      }

      const datatype  = getDatatype(split[0]);

      const property = {
        path: {'@id': split[2]},
        name: split[1],
      };

      if (datatype) {
        property.datatype = {'@id': datatype};
      } else {
        property.potentialClass = split[0]
      }

      if (split.length === 4) {
        const {min, max} = parseCardinality(split[3]);

        if (min !== undefined) {
          property.minCount = min;
        }

        if (max !== undefined) {
          property.maxCount = max;
        }
      }

      shape.property.push(property);
    } else {
      console.warn(`Member "${member}" is ignored.`);
    }
  });
}

function parseCardinality(cardinality) {
  if (isValidInteger(cardinality)) {
    cardinality = parseInt(cardinality);
    return {
      min: cardinality,
      max: cardinality
    }
  } else if (cardinality.includes('..')) {
    const split = cardinality.split('..');

    if (isValidInteger(split[0]) && (isValidInteger(split[1]) || split[1] === '*')) {
      const result = {
        min: parseInt(split[0])
      }

      if (isValidInteger(split[1])) {
        result.max = parseInt(split[1])
      }

      return result;
    }
  } else {
    throw Error(`Cardinality ${cardinality} is not supported.`);
  }
}

function isValidInteger(str) {
  return !isNaN(str) && Number.isInteger(parseInt(str)) && parseInt(str) >= 0;
}

function getDatatype(str) {
  if (str.toLowerCase() === 'string') {
    return 'xsd:string';
  }

  return null;
}

function getClass(options) {
  const {str, relations, idSource, idToType} = options;

  if (str.endsWith('[]')) {
    str.replace('[]', '');
  }

  if (getRelatedIds({id: idSource, relations}).includes(str) && idToType[str]) {
    return idToType[str];
  }

  return null;
}

function getRelatedIds(options) {
  const {id, relations} = options;
  const result = [];

  relations.forEach(relation => {
    if (relation.id1 === id) {
      result.push(relation.id2);
    } else if (relation.id2 === id) {
      result.push(relation.id1)
    }
  });

  return result;
}

function getCardinalityForTwoClasses(options) {
  const {id1, id2, relations} = options;
  let i = 0;

  while (i < relations.length && !((relations[i].id1 === id1 && relations[i].id2 === id2) || (relations[i].id2 === id1 && relations[i].id1 === id2))) {
    i ++;
  }

  if (i < relations.length) {
    let relationTitle = relations[i].relationTitle2;

    if (relations[i].id1 === id2 && relations[i].id1 === id2) {
      relationTitle = relations[i].relationTitle1;
    }

    return relationTitle === 'none' ? null : relationTitle;
  }

}

export default main;