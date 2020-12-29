import { exec, execFile } from 'child_process';

// exec是对execFile的封装，execFile又是对spawn的封装

// The first argument is the command we would like to run. In this case
// If the command itself fails to run, error will capture the error. 
// If the command runs but returns output to the error stream, stderr will capture it. 
// exec('dir', (err, stdout, stderr) => {
//     if (err) {
//         console.log(`err: ${err.message}`);
//         return ;
//     }

//     if (stderr) {
//         console.log(`stderr: ${stderr}`);
//         return;
//     }

//     console.log(`stdout:\n ${stdout}`);
// })

// execFile
// run executable files(可执行文件) with the execFile() function
// the first argument of execFile() is now a path to an executable file instead of a command. 
execFile('node', ['--version'], (error, stdout, stderr) => {
    if (error) {
      console.error(`error: ${error.message}`);
      return;
    }
  
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
  
    console.log(`stdout:\n${stdout}`);
  })