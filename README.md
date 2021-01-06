## File System
```
import * as fs from 'fs';
```
- writeFile
- readFile

## the synchronous nature(同步特性) of the EventEmitter
- on
- emit
- removeListener

## Buffer
> const one = new Buffer(3);

> const two = Buffer.alloc(5, 1);

> const three = Buffer.from([1, 2, 3]);

## Stream
所有的 Stream 对象都是 EventEmitter 的实例
常用的事件有：

- data - 当有数据可读时触发。
- end - 没有更多的数据可读时触发。
- error - 在接收和写入过程中发生错误时触发。
- finish - 所有数据已被写入到底层系统时触发。
### Readable - 可读流
- readable：在数据块可以从流中读取的时候发出
```
aboutReadable.on('readable', () => {
    let data;
    while(null !== (data = stream.read())) {
        console.log('received:', data.toString())
    }
})
```
- data：有数据可读时发出
- end：当数据被读完时发出
- close：当底层的资源，如文件，已关闭时发出
- error：当在接收数据中出现错误时发出
- pause: 暂停
- resume: 重新恢复流动
```
stream.on('data', (chunk) => {
    stream.pause();
    console.log('New chunk of data:', chunk);
});

setTimeout(function() {
    stream.resume();
}, 1000)
```
### Writable -> 可写流
```
const writableStream = fs.createWriteStream('./temp/write.txt');
writableStream.write('\n');
writableStream.end('end');
```

### pipe -> 管道
```
const otherRead = fs.createReadStream('./temp/log.txt');
otherRead.pipe(zlib.createGzip())
    .pipe(fs.createWriteStream('./temp/log.text.gz'));
```

### child_process  ->> 子进程
- spawn
- exec
- execFile
- fork

### cluster ->> 集群
- cluster.fork():创建 a new process
- cluster.on("online", function(worker) {})
- cluster.on("exit", (worker, code, signal) => {})

### worker_threads ->> 多线程
- Worker
- parentPort: used the  parentPort to communicate our worker thread with the main thread
- workerData: 创建 worker 线程的初始化数据  

![](img/MessageChannel.png)  

> A Message Channel is a simple communication channel. It has two ends, which are called ‘ports’. In JavaScript/NodeJS terminology, two ends of a Message Channel are just called ‘port1’ and ‘port2’.

- MessageChannel：port1和port2之间能够进行数据通信

### Single thread vs child process vs worker threads vs cluster in nodejs
#### child processes
> The child_process module provides the ability to spawn new processes which has their own memory. The communication between these processes is established through IPC (inter-process communication) provided by the operating system.  

- Only parent to child process communication is possible and there is no child to child communication.
- Separate memory is allocated for each child process which means that there is a time and resource overhead.

#### Worker threads
- worker threads share memory and communication between threads is possible.
- Essentially the difference between worker threads and child processes is same as the difference between a thread(线程) and a process(进程).

#### Cluster
> It is built on top of the child_process module. In an Http server, the cluster module uses child_process.fork() to automatically fork processes and sets up a master-slave architecture(主从结构) where the parent process distributes the incoming request to the child processes in a round-robin fashion(循环的方式). Ideally, the number of processes forked should be equal to the number of cpu cores your machine has.