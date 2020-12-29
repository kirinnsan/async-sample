const async = require('async');
const mkdirp = require('mkdirp');
const request = require('request');
const fs = require('fs');

function download(url, filename, callback) {
  console.log(`Downloading ${url}`);
  request(url, (err, response, body) => {
    if (err) {
      return callback(err);
    }
    saveFile(filename, body, err => {
      if (err) {
        return callback(err);
      }
      console.log(`Downloaded and saved: ${url}`);
      callback(null, body);
    });
  });
}

// Sequential processing by async liblary
function downloadByAsync() {
  console.log(`Donwloading ${url}`);
  let body;

  async.series([
    callback => {
      request(url, (err, res, resBody) => {
        if (err) {
          return callback();
        }
        body = resBody;
        callback();
      });
    }, mkdirp.bind(null, path.dirname(filename)),
    callback => {
      fs.writeFile(filename, body, callback);
    }
  ], err => {
    if (err) {
      return callback();
    }
    console.log(`Downloaded and saved: ${url}`)
    callback(null, body);
  })
}