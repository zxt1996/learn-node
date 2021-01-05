// Worker threads have isolated contexts(独立上下文). 
// They exchange information with the main process using message passing, 
// so we avoid the race conditions problem threads have! 
// But they do live in the same process, so they use a lot less memory.
import { Worker, isMainThread, MessageChannel } from 'worker_threads';

const { port1, port2 } = new MessageChannel();

if (isMainThread) {
    // use the  workerData parameter to send data to the newly created worker
    // const worker = new Worker('./worker.js', {
    //     workerData: {
    //         value: 15,
    //         path: './worker.ts'
    //     }
    // });

    // worker.on('message', (result) => {
    //     console.log(result);
    // });

    const workerChannel = new Worker("./channel.js");
    const sharedUint8Array = new Uint8Array(new SharedArrayBuffer(4));

    // 要把port2传送过去，必须在postMessage的第二个参数中写入
    // worker.postMessage(value，[ transferList])
    // javascript通信传递workerData是拷贝的（所以如果是较大数据里，不建议),   
    // 可以通过传输 ArrayBuffer 实例或共享 SharedArrayBuffer 实例来实现内存共存。
    // ArrayBuffer，必须在transferList说明，此时将不再copy,而是move,但对数据的操作权限将转移接受消息者，发送者不能再操作。
    // SharedArrayBuffer，不需要说明，都是move，且多线程中都能操作，SharedArrayBuffer在多进程中共享内存也可以实现。C++ 堆外内存。
    workerChannel.postMessage({
        port: port2,
        data: sharedUint8Array
    }, [port2])

    port1.on('message', (result) => {
        console.log("post2中传过来的数据:", result.value);
    })
}