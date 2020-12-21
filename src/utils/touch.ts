import * as fs from 'fs';
import * as util from 'util';

// util.promisify ->> we can change the writeFile function in a way that it returns a promise.
const writeFile = util.promisify(fs.writeFile);

export default function touch(path: string) {
    writeFile(path, 'jo')
        .then(() => {
            console.log('file created successfully');
        })
        .catch(error => console.log(error));
}