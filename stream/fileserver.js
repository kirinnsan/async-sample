const http = require('http');
const fs = require('fs');
const zlib = require('zlib');

const server = http.createServer((req, res) => {
  const filename = req.headers.filename;
  console.log(`file name ${filename}`);

  req
    .pipe(zlib.createGzip())
    .pipe(fs.createWriteStream(filename))
    .on('finish', () => {
      res.writeHead(201, { 'Content-type': 'text-plain' });
      res.end();
      console.log('complete');
    });
});

server.listen(3000, () => {
  console.log('listening on 3000 port');
});

