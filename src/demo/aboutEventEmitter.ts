import { EventEmitter } from 'events';

export default function aboutEvent() {
    const eventEmitter = new EventEmitter();

    eventEmitter.on('event', function() {
        console.log('one');
    })

    eventEmitter.on('event', function(data) {
        console.log(data)
        console.log(this === eventEmitter);  //true
    })

    eventEmitter.on('event', () => {
        console.log(this === eventEmitter);  //false
    })

    eventEmitter.emit(
        'event',
        {
            key: 'value'
        }
    );

    eventEmitter.removeAllListeners('event');
}