import * as fs from 'fs';
import * as util from 'util';
import * as stream from 'stream';
import { once } from 'events';

const finished = util.promisify(stream.finished);

async function writeIterableToFile(
    iterable: string[],
    filePath: string
) {
    const writable = fs.createWriteStream(filePath, {
        encoding: 'utf8'
    });
    for await (const chunk of iterable) {
        // 如果调用 stream.write(chunk) 返回 false，则当可以继续写入数据到流时会触发 'drain' 事件。
        if (!writable.write(chunk)) {
            await once(writable, 'drain');
        }
    }
    
    // Closing a writable stream and waiting until writing is done
    writable.end();
    // The stream.finished() method is utilized to receive an alert 
    // if a stream is not writable or readable anymore 
    // or if it had experienced an error or a close event that is immature.
    // Wait until done. Throws if there are errors.
    // 即使用stream.finished收集错误信息，当输入结束时抛出
    await finished(writable);
}

export default function aboutWrite() {
    const readableStream = fs.createReadStream('./temp/file.txt');
    const writableStream = fs.createWriteStream('./temp/write.txt');

    readableStream.setEncoding('utf8');

    readableStream.on('data',(chunk) => {
        writableStream.write(chunk);
        writableStream.write('\n');
        writableStream.end('end');
        // Writing more now is not allowed!
    });

    writeIterableToFile(['One', ' line of text.\n'], './temp/log.txt');
}