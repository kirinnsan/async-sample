const Chance = require('chance');
const http = require('http');

const chance = new Chance();

const server = http.createServer((req, res) => {
  res.writeHead(201, { 'Content-Type': 'text/plain' });
  while (chance.bool({ likelihood: 95 })) {
    res.write(chance.string() + '\n');
  }
  res.end('\n end \n');
  res.on('finish', () => console.log('finish'));
});

server.listen(3000, () => {
  console.log('Listening on 3000 port');
});
