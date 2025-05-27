import 'dotenv/config'

export default {
    rebbitMQ: {
        url: String(process.env.RABBITMQ_URL)
    },
    queue: {
        restaurantQueue: 'restaurant_queue'
    }
}