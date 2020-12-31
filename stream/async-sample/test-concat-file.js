const { constant } = require('async');
const concatFile = require('./concat-file');

concatFile(process.argv[2], process.argv.slice(3), () => {
  console.log('Connat success');
})