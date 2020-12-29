async function test1(callback) {
  console.info('test1');
  setTimeout(callback, 3000);
}

function finish() {
  console.info('finish');
}

const tasks = [test1, test1, test1];

function iterator(index) {
  if (index === tasks.length) {
    return finish();
  }
  const task = tasks[index];
  task(function () {
    iterator(index + 1);
  })
}

iterator(0);