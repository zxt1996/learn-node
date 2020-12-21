import { EventEmitter } from 'events';

declare interface MyClass {
    on(event: 'hello', listener: (name: string) => void): this;
    on(event: string, listener: Function): this;
}

class MyClass extends EventEmitter {
    counter = 0;
}

const eventClass = new MyClass();

export {
    eventClass
}