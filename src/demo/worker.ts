import { parentPort, workerData } from 'worker_threads';

function factorial(n: number): number {
    if (n === 1 || n === 0) {
        return 1;
    }

    return factorial(n - 1)*n;
}

console.log("workerData >>>", workerData);

// used the  parentPort to communicate our worker thread with the main thread
parentPort.postMessage(
    factorial(workerData.value)
)