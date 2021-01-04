// Worker threads have isolated contexts(独立上下文). 
// They exchange information with the main process using message passing, 
// so we avoid the race conditions problem threads have! 
// But they do live in the same process, so they use a lot less memory.
import { Worker, isMainThread } from 'worker_threads';

if (isMainThread) {
    // use the  workerData parameter to send data to the newly created worker
    const worker = new Worker('./worker.js', {
        workerData: {
            value: 15,
            path: './worker.ts'
        }
    });

    worker.on('message', (result) => {
        console.log(result);
    })
}