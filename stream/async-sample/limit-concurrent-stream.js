const stream = require('stream');

// 制限付き並行実行(順番を担保しない)
class LimitConcurretnStream extends stream.Transform {
  constructor(councurrency, userTransform) {
    super({ objectMode: true });
    this.councurrency = councurrency;
    this.userTransform = userTransform;
    this.running = 0;
    this.terminateCallback = null;
    this.continueCallback = null;
  }

  _transform(chunk, enc, done) {
    this.running++;
    this.userTransform(chunk, enc, this._onComplete.bind(this));
    if (this.running < this.councurrency) {
      done();
    } else {
      this.continueCallback = done;
    }
  }

  _flush(done) {
    if (this.running > 0) {
      this.terminateCallback = done;
    } else {
      done();
    }
  }

  _onComplete(err) {
    this.running--;
    if (err) {
      return this.emit('error', err);
    }
    const tmpCallback = this.continueCallback;
    this.continueCallback = null;
    this.tmpCallback && this.tmpCallback();
    if (this.running === 0) {
      this.terminateCallback && this.terminateCallback();
    }
  }
}

module.exports = LimitConcurretnStream;