import lineReader from 'line-reader';

async function removeAnnotations(absoluteFilePath) {
  return new Promise(resolve => {
    lineReader.eachLine(absoluteFilePath, (line, last) => {
      if (!line.trim().startsWith('@')) {
        console.log(line);
      }

      if (last) {
        resolve();
      }
    });
  });
}

export default removeAnnotations;