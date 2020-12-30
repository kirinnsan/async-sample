const Chance = require('chance');
const http = require('http');

const chance = new Chance();

const server = http.createServer((req, res) => {
  res.writeHead(201, { 'Content-Type': 'text/plain' });

  function main() {
    while (chance.bool({ likelihood: 95 })) {
      // 内部バッファがhighWaterMarkを上回る時は、falseを返す
      // 16 * 1024 - 1はhighWaterMarkよりわずかに小さい値
      const shouldContinue = res.write(chance.string({ length: (16 * 1024 - 1) }))

      if (!shouldContinue) {
        // 内部バッファが一杯
        console.log('BackPressure');
        return res.once('drain', main);
      }
    }
    res.end('\n end \n', ()=>console.log('finish'));
    // res.on('finish', () => console.log('finish'));
  }
  main()
});

server.listen(3000, () => {
  console.log('Listening on 3000 port');
});
