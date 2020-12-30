const slowFunction = () => {
    let counter = 0;
    while (counter < 6000000000) {
        counter++;
    }

    return counter;
}

// The messages between a parent and child process created by fork() are accessible via the Node.js global process object.  
process.on('message', (message) => {
    if (message == 'START') {
        console.log('Child process received START message');
        let slowResult = slowFunction();
        let message = `{"totalCount":${slowResult}}`;
        // We use process.send() to send a message to the parent process.
        process.send(message);
    }
});