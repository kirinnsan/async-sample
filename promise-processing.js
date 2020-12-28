
const test1 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('test1');
      resolve('complete test1');
    }, 3000);
  })
}

const test2 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('test2');
      resolve('complete test2');
    }, 6000);
  })
}

function finish() {
  console.info('finish');
}

// async task
let tasks = [test1, test2];

let promsie = Promise.resolve();

// sequential processing by promise
tasks.forEach(task => {
  promsie = promsie.then(() => {
    return task();
  });
});
promsie.then(() => {
  finish();
});


// parallel processing by promise
Promise.all([test1(), test2()]).then(result => console.log(result));
