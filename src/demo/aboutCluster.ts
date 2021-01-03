// the cluster module ->>> balancing the load over multiple processes

// A cluster is a pool of similar workers running under a parent process.

// Child processes that you create with it all share server ports. 
// That means that all your processes work under the same address. 
// When someone makes a request to your API, 
// the master process accepts new connections and distributes them across the child processes.

import * as cluster from 'cluster';
import * as express from 'express';
import * as os from 'os';

const numberOfCores = os.cpus().length;

if (cluster.isMaster) {
    console.log('executing in master mode');
    for(let i=0;i<numberOfCores;i++) {
        // It spawns a new process, and you can only call it from the master
        // This method returns a worker object that contains some methods and properties about the forked worker.
        cluster.fork();
    }

    cluster.on("online", function(worker) {
        console.log(`woker ${worker.process.pid} is online`);
    })

    // the “exit” event that you can use to restart any workers if they stop working.
    cluster.on("exit", (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died with code: ${code},and signal: ${signal}`);
        console.log('starting a new worker');
        cluster.fork();
    })
} else {
    console.log("executing in child mode");
    const app = express();
    // When requests are received, they are distributed one at a time to each worker. 
    // If a worker is available, it immediately starts processing the request; 
    // otherwise it’ll be added to a queue.
    app.get("/slow", (req, res) => {
        load(5000);
        res.send("i took 5 second");
    });

    app.get("/fast", (req, res) => {
        res.send("i am fast");
    });

    function load(time: number) {
        const start = Date.now();
        while(Date.now() - start < time) {}
    }

    app.listen(5000);
}