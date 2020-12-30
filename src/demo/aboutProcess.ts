import { exec, execFile, spawn, fork } from 'child_process';

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
// execFile('node', ['--version'], (error, stdout, stderr) => {
//     if (error) {
//       console.error(`error: ${error.message}`);
//       return;
//     }
  
//     if (stderr) {
//       console.error(`stderr: ${stderr}`);
//       return;
//     }
  
//     console.log(`stdout:\n${stdout}`);
//   })


// The spawn() function runs a command in a process. 
// This function returns data via the stream API.

// It’s often a good idea to choose spawn() over exec() or execFile() 
// when the command you want to run can output a large amount of data. 
// With a buffer, as used by exec() and execFile(), 
// all the processed data is stored in the computer’s memory. 
// For large amounts of data, this can degrade system performance. 
// With a stream, the data is processed and transferred in small chunks. 
// Therefore, you can process a large amount of data without using too much memory at any one time.

// const child = spawn('node', ['-v']);
// child.stdout.on('data', (data) => {
//   console.log(`输出：${data}`);
// })
// child.stderr.on('data', (data) => {
//   console.log(`错误输出:${data}`);
// })
// child.on('error', (err) => {
//   console.error(err);
// })
// child.on('close', (code) => {
//   console.log(`结束：${code}`)
// })

// The fork function is a variation of the spawn function for spawning node processes. 
// The biggest difference between spawn and fork is that 
// a communication channel is established to the child process when using fork, 
// so we can use the send function on the forked process along 
// with the global process object itself to exchange messages between the parent and forked processes.
const forked = fork('child.ts');
forked.on('message', (msg) => {
  console.log(`消息：${msg}`);
})
forked.send({
  hello: 'jo'
})