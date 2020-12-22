import { StringDecoder } from 'string_decoder';
import * as fs from 'fs';
import * as util from 'util';

const readFile = util.promisify(fs.readFile);

const decoder = new StringDecoder('utf-8');

export default function aboutBuffer() {
    // a maximum number saved on a single byte is 255
    const one = new Buffer(3);
    one[0] = 255;
    one[1] = 256;
    one[2] = -6;

    console.log(one[0], one[1], one[2]);

    // Creates a Buffer of length 5, filled with 1
    const two = Buffer.alloc(5, 1);
    console.log(two[1]);

    const three = Buffer.from([1, 2, 3]);
    console.log(three[1]);

    const buffers = [
        Buffer.from('Hello '),
        Buffer.from([0b11110000, 0b10011111]),
        Buffer.from([0b10001100, 0b10001110]),
        Buffer.from(' world!'),
      ];

    //   StringDecoder将不完整的字符保存在内部缓冲区中，直到下一次调用decoder.write()，
    //   从而确保已解码的字符串不包含任何不完整的多字节字符。
    const result = buffers.reduce((result, buffer) => (
        `${result}${decoder.write(buffer)}`
    ), '');

    console.log(result);

    readFile('./file.txt')
        .then((content) => {
            console.log(content instanceof Buffer);  //true
            console.log(content.toString());
        })
        .catch(err => console.log(err));
}