// import { Channel, ConsumeMessage } from "amqplib";
// import MessageHandler from "./message-handler";
// import LoginController from "../controllers/loginController";
// import RegistrationController from "../controllers/registrationController";
// import RestaurantMenuController from "../controllers/restaurntMenuItemController";
// import RestaurantDisplayController from "../controllers/restaurantDisplayController";
// import LoginUseCase from "../useCases/login.Use-Case";
// import RegistrationUseCase from "../useCases/registration.use-case";
// import AdminUseCase from "../useCases/admin.Use-Case";
// import RestaurntMenuItemUseCase from "../useCases/restaurntMenu.use-cse";
// import RestaurantRepository from "../repositories/restaurantRepo";
// import AdminRepository from "../repositories/adminRepo";
// import MenuRepository from "../repositories/menuRepo";
// import { AuthService } from "../services/auth";
// import SubscriptionPlanController from "../controllers/subscriptionPlanController";
// import SubscriptionPlanRepository from "../repositories/subscriptionPlanRepo";
// import TransactionRepository from "../repositories/transactionRepo";
// import { SubscriptionPlanUseCase } from "../useCases/subscriptionPlan.Use-Case";


// export default class Consumer {
//     private channel: Channel;
//     private rpcQueue: string;
//     private controllers: {
//         registrationController: RegistrationController;
//         loginController: LoginController;
//         adminController: RestaurantDisplayController;
//         menuController: RestaurantMenuController;
//         subscriptionPlanController:SubscriptionPlanController
//     };

//     constructor(channel: Channel, rpcQueue: string) {
//         this.channel = channel;
//         this.rpcQueue = rpcQueue;

//         // Initialize dependencies
//         const authService = new AuthService();
//         const restaurantRepo = new RestaurantRepository();
//         const adminRepo = new AdminRepository();
//         const menuRepo = new MenuRepository();
//         const subscriptionPlanRepo=new SubscriptionPlanRepository()
//         const paymentRepo=	new TransactionRepository()

//         // Initialize use cases
//         const loginUseCase = new LoginUseCase(restaurantRepo, authService);
//         const registrationUseCase = new RegistrationUseCase(restaurantRepo);
//         const adminUseCase = new AdminUseCase(adminRepo);
//         const menuUseCase = new RestaurntMenuItemUseCase(menuRepo);
//         const subscriptionPlanUseCase=new SubscriptionPlanUseCase(subscriptionPlanRepo,paymentRepo)

//         // Initialize controllers
//         this.controllers = {
//             registrationController: new RegistrationController(registrationUseCase, authService),
//             loginController: new LoginController(loginUseCase),
//             adminController: new RestaurantDisplayController(adminUseCase),
//             menuController: new RestaurantMenuController(menuUseCase),
//             subscriptionPlanController:new SubscriptionPlanController(subscriptionPlanUseCase)
//         };
//     }

//     async consumeMessage() {
//         console.log('ready to consume messages....');

//         this.channel.consume(this.rpcQueue, async (message: ConsumeMessage | null) => {
//             if (message) {
//                 if (message.properties) {
//                     const { correlationId, replyTo } = message.properties;
//                     const operation = message.properties.headers?.function;

//                     if (!correlationId || !replyTo) {
//                         console.log('Missing some properties.......');
//                     }

//                     if (message.content) {
//                         await MessageHandler.handle(
//                             operation,
//                             JSON.parse(message.content.toString()),
//                             correlationId,
//                             replyTo,
//                             this.controllers
//                         );
//                     } else {
//                         console.log('received message content is null or undefined.');
//                     }
//                 } else {
//                     console.log('received message is null');
//                 }
//             } else {
//                 console.log('missing message properties');
//             }
//         }, {
//             noAck: true
//         });
//     }
// }




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

export default class Consumer {
    private channel: Channel;
    private rpcQueue: string;
    private controllers: {
        registrationController: IRegistrationController;
        loginController: ILoginController;
        adminController: IRestaurantDisplayController;
        menuController: IRestaurantMenuController;
        subscriptionPlanController: ISubscriptionPlanController;
    };

    constructor(channel: Channel, rpcQueue: string) {
        this.channel = channel;
        this.rpcQueue = rpcQueue;

        // Initialize dependencies
        const authService = new AuthService();
        const nodemailerService = new NodemailerService();
        const otpService = new OtpService();
        const restaurantRepo = new RestaurantRepository();
        const adminRepo = new AdminRepository();
        const menuRepo = new MenuRepository();
        const subscriptionPlanRepo = new SubscriptionPlanRepository();
        const transactionRepo = new TransactionRepository();


        // Initialize services
        const loginService = new LoginService(restaurantRepo, authService);
        const registrationService = new RegistrationService(restaurantRepo, otpService, nodemailerService, authService);
        const restaurantDisplayService = new RestaurantDisplayService(adminRepo, nodemailerService);
        const restaurantMenuService = new RestaurantMenuService(menuRepo);
        const subscriptionService = new SubscriptionService(subscriptionPlanRepo, transactionRepo);

        // Initialize controllers
        this.controllers = {
            registrationController: new RegistrationController(registrationService, authService, nodemailerService, otpService),
            loginController: new LoginController(loginService),
            adminController: new RestaurantDisplayController(restaurantDisplayService,nodemailerService,otpService),
            menuController: new RestaurantMenuController(restaurantMenuService),
            subscriptionPlanController: new SubscriptionPlanController(subscriptionService),
        };
    }

    async consumeMessage() {
        console.log('Ready to consume messages...');

        this.channel.consume(
            this.rpcQueue,
            async (message: ConsumeMessage | null) => {
                if (message) {
                    if (message.properties) {
                        const { correlationId, replyTo } = message.properties;
                        const operation = message.properties.headers?.function;

                        if (!correlationId || !replyTo) {
                            console.log('Missing some properties...');
                        }

                        if (message.content) {
                            await MessageHandler.handle(
                                operation,
                                JSON.parse(message.content.toString()),
                                correlationId,
                                replyTo,
                                this.controllers
                            );
                        } else {
                            console.log('Received message content is null or undefined.');
                        }
                    } else {
                        console.log('Received message is null');
                    }
                } else {
                    console.log('Missing message properties');
                }
            },
            {
                noAck: true,
            }
        );
    }
}