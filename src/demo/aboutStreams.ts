// Streams的特性：
// you can start processing data as soon as you have just a part of it,
//  instead of waiting until the whole data is available.

import * as fs from 'fs';
import { Readable } from 'stream';

export default function aboutStream() {
    const stream = fs.createReadStream(
        './file.txt',
        {
            encoding: 'utf-8'
        }
    );

    // Every stream is an instance of EventEmitter
    // Thanks to that, we can listen to any data coming in, using the EventEmitter API
    // 监听data事件
    // 流切换到流动模式,数据会被尽可能快的读出
    stream.on('data', (chunk) => {
        // pause()暂停
        stream.pause();
        console.log('New chunk of data:', chunk);
    });

    setTimeout(function() {
        // 重新切回流动模式
        // If we turn a readable stream into a flowing mode without handlers ready to consume the incoming chunks, 
        // the data is lost and so it happens in the example above.
        stream.resume();
    }, 1000)
    // 监听end事件
    // 该事件会在读完数据后被触发
    stream.on('end', function() {
        console.log('读取结束')
    })

    // 监听error事件
    stream.on('error', function(err) {
        console.log(err);
    })

    // readable：在数据块可以从流中读取的时候发出。
    const aboutReadable = new Readable();

    // be added to an internal queue(内部队列)
    aboutReadable.push('hello');
    aboutReadable.push('node');
    aboutReadable.push(null);

    // 为读取值的时候附加功能
    const read = aboutReadable.read.bind(aboutReadable);
    aboutReadable.read = function() {
        console.log("附加");
        return read();
    }

    aboutReadable.on('data', (chunk) => {
        console.log(chunk.toString());
    })

    // we first need to wait for the stream to emnit a ‘readable‘ event, 
    // indicating that data is available to be read.
    aboutReadable.on('readable', () => {
        let data;
        while(null !== (data = stream.read())) {
            console.log('received:', data.toString())
        }
    })

    // async iterator
    async function logChunks(readable: fs.ReadStream) {
        for await (const chunk of readable) {
            console.log("async chunk:",chunk);
        }
    }

    const readable = fs.createReadStream(
        './file.txt',
        {
            encoding: 'utf8'
        }
    );

    logChunks(readable);
}