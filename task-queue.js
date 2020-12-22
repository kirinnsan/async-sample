async function test1(callback) {
  console.info('test1');
  setTimeout(callback, 3000);
}

async function test2(callback) {
  console.info('test2');
  setTimeout(callback, 4000);
}

function finish() {
  console.info('finish');
}

const tasks = [test1, test2, test1, test2]

const maxTask = 2;
let running = 0;
let completed = 0;
let index = 0;

// Concurrency limit of Sequential processing
function taskQueue() {
  while (running < maxTask && index < tasks.length) {
    task = tasks[index++];
    task(() => {
      if (completed === tasks.length) {
        return finish()
      }
      completed++;
      running--;
      taskQueue()
    })
    running++;
  }
}

taskQueue();