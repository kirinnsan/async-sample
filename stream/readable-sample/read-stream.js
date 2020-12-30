const stream = require('stream');
const Chance = require('chance');

const chance = new Chance();

// Readable stream(non-flowing)
process.stdin
  .on('readable', () => {
    let chunk;
    console.log('exist data');
    while ((chunk = process.stdin.read()) !== null) {
      console.log(`data: ${chunk.length} "${chunk.toString()}"`)
    }
  })
  .on('end', () => process.stdout.write('complete stream'));

// Readable stream(flowing)
process.stdin
  .on('data', chunk => {
    console.log('exist data');
    console.log(`data: ${chunk.length} "${chunk.toString()}"`)
  })
  .on('end', () => process.stdout.write('complete stream'));


class RandomReadStrem extends stream.Readable {
  constructor(options) {
    super(options);
  }

  _read(size) {
    const chunk = chance.string();
    console.log(`chunk size: ${chunk.length}`);
    this.push(chunk, 'utf-8');
    // 5%の確立で停止させる
    if (chance.bool({ likelihood: 5 })) {
      this.push(null);
    }
  }
}

module.exports = RandomReadStrem;