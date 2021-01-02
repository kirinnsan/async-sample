const zlib = require('zlib');
const crypto = require('crypto');
const combine = require('multipipe');

// 2つの異なるstreamをまとめて1つのstreamにまとめる

// データの圧縮と暗号化
const compressAndEncrypt = password => {
  return combine(
    zlib.createGzip(),
    crypto.createCipher('aes192', password)
  );
};

// データの複合化と展開
const decryptAndDecompress = password => {
  return combine(
    crypto.createDecipher('aes192', password),
    zlib.createGunzip(),
  );
};

module.exports = {
  compressAndEncrypt,
  decryptAndDecompress
}
