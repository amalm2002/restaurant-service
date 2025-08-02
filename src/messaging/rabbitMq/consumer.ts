import { Channel, ConsumeMessage } from 'amqplib';
import MessageHandler from './message-handler';
import { ILoginController } from '../../controllers/interfaces/login.controller.interface';
import { IRegistrationController } from '../../controllers/interfaces/registration.controller.interface';
import { IRestaurantDisplayController } from '../../controllers/interfaces/restaurant-display.controller.interface';
import { IRestaurantMenuController } from '../../controllers/interfaces/restaurant-menu.controller.interface';
import { ISubscriptionPlanController } from '../../controllers/interfaces/subscription-plan.controller.interface';
import LoginController from '../../controllers/implementations/login.controller';
import RegistrationController from '../../controllers/implementations/registration.controller';
import RestaurantDisplayController from '../../controllers/implementations/restaurant-display.controller';
import RestaurantMenuController from '../../controllers/implementations/restaurant-menu.controller';
import SubscriptionPlanController from '../../controllers/implementations/subscription-plan.controller';
import RestaurantRepository from '../../repositories/implementations/restaurant.repository';
import AdminRepository from '../../repositories/implementations/admin.repository';
import MenuRepository from '../../repositories/implementations/menu.repository';
import SubscriptionPlanRepository from '../../repositories/implementations/subscription-plan.repository';
import TransactionRepository from '../../repositories/implementations/transaction.repository';
import AuthService from '../../services/implementations/auth.service';
import LoginService from '../../services/implementations/login.service';
import RegistrationService from '../../services/implementations/registration.service';
import RestaurantDisplayService from '../../services/implementations/restaurant-display.service';
import RestaurantMenuService from '../../services/implementations/restaurant-menu.service';
import SubscriptionService from '../../services/implementations/subscription-plan.service';
import NodemailerService from '../../services/implementations/nodemailer.service';
import OtpService from '../../services/implementations/otp.service';
import { IReviewController } from '../../controllers/interfaces/review.controller.interfaces';
import ReviewService from '../../services/implementations/review.service';
import ReviewRepository from '../../repositories/implementations/review.repository';
import ReviewController from '../../controllers/implementations/review.controller';

export default class Consumer {
    private channel: Channel;
    private rpcQueue: string;
    private controllers: {
        registrationController: IRegistrationController;
        loginController: ILoginController;
        adminController: IRestaurantDisplayController;
        menuController: IRestaurantMenuController;
        subscriptionPlanController: ISubscriptionPlanController;
        reviewController: IReviewController;
    };

    constructor(channel: Channel, rpcQueue: string) {
        this.channel = channel;
        this.rpcQueue = rpcQueue;

        const authService = new AuthService();
        const nodemailerService = new NodemailerService();
        const otpService = new OtpService();
        const restaurantRepo = new RestaurantRepository();
        const adminRepo = new AdminRepository();
        const menuRepo = new MenuRepository();
        const subscriptionPlanRepo = new SubscriptionPlanRepository();
        const transactionRepo = new TransactionRepository();
        const reviewRepo = new ReviewRepository()

        const loginService = new LoginService(restaurantRepo, authService);
        const registrationService = new RegistrationService(restaurantRepo, otpService, nodemailerService, authService);
        const restaurantDisplayService = new RestaurantDisplayService(adminRepo, nodemailerService);
        const restaurantMenuService = new RestaurantMenuService(menuRepo);
        const subscriptionService = new SubscriptionService(subscriptionPlanRepo, transactionRepo);
        const reviewService = new ReviewService(reviewRepo)

        this.controllers = {
            registrationController: new RegistrationController(registrationService, authService, nodemailerService, otpService),
            loginController: new LoginController(loginService),
            adminController: new RestaurantDisplayController(restaurantDisplayService, nodemailerService, otpService),
            menuController: new RestaurantMenuController(restaurantMenuService),
            subscriptionPlanController: new SubscriptionPlanController(subscriptionService),
            reviewController:new ReviewController(reviewService)
        };
    }

    async consumeMessage() {
        console.log('Ready to consume messages...');

        this.channel.consume(
            this.rpcQueue,
            async (message: ConsumeMessage | null) => {
                if (!message) return;

                const { correlationId, replyTo } = message.properties;
                const operation = message.properties.headers?.function;

                if (!correlationId || !replyTo) {
                    console.log('Missing correlationId or replyTo.');
                    this.channel.ack(message);
                    return;
                }

                try {
                    const content = JSON.parse(message.content.toString());
                    await MessageHandler.handle(operation, content, correlationId, replyTo, this.controllers);
                    this.channel.ack(message);
                } catch (err) {
                    console.error('Error handling message:', err);
                    // this.channel.nack(message, false, true);
                    this.channel.nack(message, false, false);
                }
            },
            { noAck: false }
        );
    }
}
