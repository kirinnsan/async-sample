async function test1(callback) {
  console.info('test1');
  setTimeout(callback, 3000);
}

async function test2(callback) {
  console.info('test2');
  setTimeout(callback, 5000);
}

function finish() {
  console.info('finish');
}

const tasks = [test1, test2, test1];

// Sequential processing
function iterator(index) {
  if (index === tasks.length) {
    return finish();
  }
  const task = tasks[index];
  task( ()=> {
    iterator(index + 1);
  })
}

iterator(0);

// Parallel processing
function asyncIterator() {
  let completed = 0;
  const tasks = [test1, test2, test1];

  tasks.forEach(task => {
    task(() => {
      if (++completed === tasks.length) {
        finish()
      }
    })
  })
}

asyncIterator()