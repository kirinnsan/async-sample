class TaskQueue {
  constructor(maxTask) {
    this.maxTask = maxTask;
    this.running = 0;
    this.queue = [];
  }

  pushTask(task) {
    this.queue.push(task);
    this.iterator()
  }

  iterator() {
    while (this.running < this.maxTask && this.queue.length) {
      const task = this.queue.shift();
      task(() => {
        this.running--;
        this.iterator();
      });
      this.running++;
    }
  }
}

async function test1(callback) {
  console.info('test1');
  setTimeout(callback, 3000);
}

async function test2(callback) {
  console.info('test2');
  setTimeout(callback, 8000);
}

function finish() {
  console.info('finish');
}

let taskQueue = new TaskQueue(2);
taskQueue.pushTask(test1);
taskQueue.pushTask(test2);
taskQueue.pushTask(test1);
taskQueue.pushTask(finish);

