import { Channel, connect, Connection } from "amqplib";
import Consumer from "./consumer";
import Producer from "./producer";

import rabbitMq from "../config/rabbitMq";


class RabbitMQClient {
    constructor() { }

    private static instatnce: RabbitMQClient
    private isInitialized = false

    private producer: Producer | undefined
    private consumer: Consumer | undefined
    private connection: Connection | undefined
    private producerChannel: Channel | undefined
    private consumerChannel: Channel | undefined

    public static getInstance() {
        if (!this.instatnce) {
            this.instatnce = new RabbitMQClient()
        }
        return this.instatnce
    }

    async initialize() {
        if (this.isInitialized) {
            return
        }

        try {
            this.connection = await connect(rabbitMq.rebbitMQ.url)

            const [producerChannel, consumerChannel] = await Promise.all([
                this.connection.createChannel(),
                this.connection.createChannel()
            ])
            this.producerChannel = producerChannel
            this.consumerChannel = consumerChannel

            const { queue: rpcQueue } = await this.consumerChannel.assertQueue(
                rabbitMq.queue.restaurantQueue,
                { exclusive: true }
            )

            this.producer = new Producer(this.producerChannel)
            this.consumer = new Consumer(this.consumerChannel, rpcQueue)

            this.consumer.consumeMessage()

            this.isInitialized = true

        } catch (error) {
            console.log('rabbitMQ error........', error);

        }
    }

    async produce(data:any,correlationId:string,replyToQueue:string) {
        if (!this.isInitialized) {
            await this.initialize()
        }

        return await this.producer?.produceMessages(
            data,
            correlationId,
            replyToQueue
        )
    }
}

export default RabbitMQClient.getInstance()