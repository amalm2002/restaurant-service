import { Channel, ConsumeMessage } from "amqplib";
import MessageHandler from "./messageHandler";
import LoginController from "../controller/loginController";
import RegistrationController from "../controller/registrationController";
import RestaurantMenuController from "../controller/restaurntMenuItemController";
import RestaurantDisplayController from "../controller/restaurantDisplayController";
import LoginUseCase from "../useCases/login.Use-Case";
import RegistrationUseCase from "../useCases/registration.use-case";
import AdminUseCase from "../useCases/admin.Use-Case";
import RestaurntMenuItemUseCase from "../useCases/restaurntMenu.use-cse";
import RestaurantRepository from "../repositeries/restaurantRepo";
import AdminRepository from "../repositeries/adminRepo";
import MenuRepository from "../repositeries/menuRepo";
import { AuthService } from "../services/auth";

export default class Consumer {
    private channel: Channel;
    private rpcQueue: string;
    private controllers: {
        registrationController: RegistrationController;
        loginController: LoginController;
        adminController: RestaurantDisplayController;
        menuController: RestaurantMenuController;
    };

    constructor(channel: Channel, rpcQueue: string) {
        this.channel = channel;
        this.rpcQueue = rpcQueue;

        // Initialize dependencies
        const authService = new AuthService();
        const restaurantRepo = new RestaurantRepository();
        const adminRepo = new AdminRepository();
        const menuRepo = new MenuRepository();

        // Initialize use cases
        const loginUseCase = new LoginUseCase(restaurantRepo, authService);
        const registrationUseCase = new RegistrationUseCase(restaurantRepo);
        const adminUseCase = new AdminUseCase(adminRepo);
        const menuUseCase = new RestaurntMenuItemUseCase(menuRepo);

        // Initialize controllers
        this.controllers = {
            registrationController: new RegistrationController(registrationUseCase, authService),
            loginController: new LoginController(loginUseCase),
            adminController: new RestaurantDisplayController(adminUseCase),
            menuController: new RestaurantMenuController(menuUseCase)
        };
    }

    async consumeMessage() {
        console.log('ready to consume messages....');

        this.channel.consume(this.rpcQueue, async (message: ConsumeMessage | null) => {
            if (message) {
                if (message.properties) {
                    const { correlationId, replyTo } = message.properties;
                    const operation = message.properties.headers?.function;

                    if (!correlationId || !replyTo) {
                        console.log('Missing some properties.......');
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
                        console.log('received message content is null or undefined.');
                    }
                } else {
                    console.log('received message is null');
                }
            } else {
                console.log('missing message properties');
            }
        }, {
            noAck: true
        });
    }
}