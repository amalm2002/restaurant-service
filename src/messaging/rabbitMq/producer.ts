// import { Channel } from "amqplib";

// export default class Producer {
//     constructor(private channel: Channel) {
//     }
    
//     async produceMessages(data: any, correlationId: string, replyToQueue: string) {

//         // console.log(data,'is show on producer in rabbitmq');

//         this.channel.sendToQueue(replyToQueue, Buffer.from(JSON.stringify(data)), {
//             correlationId: correlationId
//         })
//     }
// }

import { Channel } from 'amqplib';

export default class Producer {
    constructor(private channel: Channel) {}

    async produceMessages(data: any, correlationId: string, replyToQueue: string) {
        this.channel.sendToQueue(replyToQueue, Buffer.from(JSON.stringify(data)), {
            correlationId: correlationId,
        });
    }
}