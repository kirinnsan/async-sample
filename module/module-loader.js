const { Console } = require('console');
const fs = require('fs');

const requireMine = moduleName => {
  const id = requireMine.resolve(moduleName);
  if (requireMine.cache[id]) {
    return requireMine.cache[id].exports;
  }

  // モジュールに保持するデータ
  const module = {
    exports: {},
    id: id
  }

  // キャッシュ更新
  requireMine.cache[id] = module;

  // モジュールの読み込み
  loadModule(id, module, requireMine);

  // 公開
  return module.exports;

}

function loadModule(filename, module, require) {
  const wrappedSrc = `(function(module, exports, require) {
    ${fs.readFileSync(filename, 'utf-8')}
  })(module, module.exports, require); `;
  eval(wrappedSrc);
}

// module.exportsとexportsは同一オブジェクト

// OK
exports.test = () => {
  console.info('test');
}

// NG module.exportsの中身は変更されないため、外部に公開されない
exports = () => {
  console.info('test');
}

// 関数、インスタンス、文字列等を公開する場合、module.exportsに代入する
module.exports = () => {
  console.log('test');
}

