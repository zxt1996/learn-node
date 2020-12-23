import * as fs from 'fs';
import * as zlib from 'zlib'

// The readable.pipe() method in a Readable Stream is used to attach a Writable stream to the readable stream 
// so that it consequently switches into flowing mode 
// and then pushes all the data that it has to the attached Writable.
export default function aboutPipe() {
    const readable = fs.createReadStream('./temp/file.txt');
    const writable = fs.createWriteStream('./temp/write.txt');

    readable.pipe(writable);

    const otherRead = fs.createReadStream('./temp/log.txt');
    otherRead.pipe(zlib.createGzip())
        .pipe(fs.createWriteStream('./temp/log.text.gz'));
}