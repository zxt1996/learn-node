import touch from './utils/touch';
import cat from './utils/cat';

// The rest of the process.argv elements are any additional command line arguments.
// 即process.argv是你在命令行中输入的参数
// npm start -- touch ./file.txt
// To add additional arguments to an npm script, we need to prefix them with --.
// npm script输入额外的参数必须带上 --
const command = process.argv[2];
const path = process.argv[3];

if (command && path) {
    switch (command) {
        case 'touch': {
            touch(path);
            break;
        }
        // npm start -- cat ./file.txt 
        case 'cat': {
            cat(path);
            break;
        }
        default: {
            console.log('unknown command');
        }
    }
} else {
    console.log('command missing');
}