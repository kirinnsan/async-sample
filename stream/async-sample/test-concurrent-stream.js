const fs = require('fs');
const split = require('split');
const request = require('request');
const ConcurrentlStream = require('./concurrent-stream');

let concurrentlStream = new ConcurrentlStream((url, enc, done, push) => {
  if (!url) {
    return done();
  }
  request.head(url, (err, response) => {
    push(url + ' is ' + (err ? 'down' : 'up') + '\n');
    done(); // 次のstreamに移す
  });
});

fs.createReadStream(process.argv[2])
  .pipe(split())
  .pipe(concurrentlStream)
  .pipe(fs.createWriteStream('results.txt'))
  .on('finish', () => console.log('all url checked'));