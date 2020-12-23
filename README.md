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
