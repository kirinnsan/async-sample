const util = require('util');
const fs = require('fs');
const zlib = require('zlib');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const gzip = util.promisify(zlib.gzip);

const file = process.argv[2];

// callback
fs.readFile(file, (err, buffer) => {
  zlib.gzip(buffer, (err, buffer) => {
    fs.writeFile(file + '.gz', buffer, err => {
      console.log('success');
    })
  })
})

// promise by promisify
readFile(file)
  .then((buffer) => {
    return gzip(buffer);
  })
  .then((result) => {
    return writeFile(file + '.gz', result)
  })
  .then(() => {
    console.log('success');
  }).catch((err) => {
    console.log(err);
  })