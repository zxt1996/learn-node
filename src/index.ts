// import test from './text';
// test();

import { createServer } from 'http';
import { fork } from 'child_process';

const host = 'localhost';
const port = 8000;

const requestListener = function (req: any, res: any) {
    if (req.url === '/total') {
        const child = fork(__dirname + '/getCount');

        child.on('message', (message) => {
          console.log('Returning /total results');
          res.setHeader('Content-Type', 'application/json');
          res.writeHead(200);
          res.end(message);
        });

        child.send('START');
      } else if (req.url === '/hello') {
        console.log('Returning /hello results');
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(200);
        res.end(`{"message":"hello"}`);
      }
};

const server = createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});