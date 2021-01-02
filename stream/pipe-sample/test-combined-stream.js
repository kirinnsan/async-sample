const fs = require('fs');
const combine = require('multipipe');
const compressAndEncrypt = require('./combined-stream').compressAndEncrypt;

// bad
fs.createReadStream(process.argv[3])
  .pipe(compressAndEncrypt(process.argv[2]))
  .pipe(fs.createWriteStream(process.argv[3] + ".gz.enc"))
  .on('error', err => {
    // 最後のstreamで発生したエラーしかキャッチできない
    console.error(err);
  });

// good
combine(
  fs.createReadStream(process.argv[3])
    .pipe(compressAndEncrypt(process.argv[2]))
    .pipe(fs.createWriteStream(process.argv[3] + ".gz.enc"))
).on('error', err => {
  // どのstreamで発生したエラーもキャッチ可能
  console.error(err);
})