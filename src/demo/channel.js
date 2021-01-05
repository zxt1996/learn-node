const { parentPort } =  require('worker_threads');

parentPort.on("message", (data) => {
    const { port } = data;

    console.log("data>>>", data.data);
    port.postMessage({
        value: 'port2向port1传递的数据'
    })
})