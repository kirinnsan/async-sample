const FileStream = require('./write-stream-implement');

const fileStream = new FileStream()

fileStream.write({ path: "file1.txt", content: "hello" });
fileStream.write({ path: "file2.txt", content: "world" });
fileStream.write({ path: "file3.txt", content: "test" });
fileStream.end(() => console.log('finish'));