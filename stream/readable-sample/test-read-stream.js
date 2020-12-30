const RandomReadStrem = require('./read-stream');

const randomReadStream = new RandomReadStrem();

randomReadStream.on('readable', () => {
  let chunk = null;
  while ((chunk = randomReadStream.read()) !== null) {
    console.log(`chunk data: ${chunk.toString()}`);
  }
})