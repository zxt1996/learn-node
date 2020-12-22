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
- pause: 暂停
- resume: 重新恢复流动
- read