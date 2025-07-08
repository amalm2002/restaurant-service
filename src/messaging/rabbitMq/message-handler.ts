import { IRegistrationController } from '../../controllers/interfaces/registration.controller.interface';
import { ILoginController } from '../../controllers/interfaces/login.controller.interface';
import { IRestaurantDisplayController } from '../../controllers/interfaces/restaurant-display.controller.interface';
import { IRestaurantMenuController } from '../../controllers/interfaces/restaurant-menu.controller.interface';
import { ISubscriptionPlanController } from '../../controllers/interfaces/subscription-plan.controller.interface';
import rabbitClient from './client';

export default class MessageHandler {
    static async handle(
        operation: string,
        data: any,
        correlationId: string,
        replyTo: string,
        controllers: {
            registrationController: IRegistrationController;
            loginController: ILoginController;
            adminController: IRestaurantDisplayController;
            menuController: IRestaurantMenuController;
            subscriptionPlanController: ISubscriptionPlanController;
        }
    ) {
        const { registrationController, loginController, adminController, menuController, subscriptionPlanController } =
            controllers;
        let response = data;

        console.log('The operation is ', operation, data);

        switch (operation) {
            case 'Registration-check':
                response = await registrationController.checkRestaurant(data);
                break;
            case 'Restaurant-register':
                response = await registrationController.register(data);
                break;
            case 'Restaurant-resendOtp':
                response = await registrationController.restaurantResendOtp(data);
                break;
            case 'Restaurant-Documents-Submission':
                response = await registrationController.restaurantDocumentUpdate(data);
                break;
            case 'Restaurant-location':
                response = await registrationController.restaurantLocation(data);
                break;
            case 'Registration-login':
                response = await loginController.checkLoginRestaurant(data);
                break;
            case 'Update-Online-Status':
                response = await loginController.updateOnlineStatus(data);
                break;
            case 'Fetch-Online-Status':
                response = await loginController.fetchOnlineStatus(data);
                break;
            case 'Get-Restaurant-By-Id':
                response = await loginController.getRestaurantDataById(data);
                break;
            case 'Get-All-Restaurants':
                response = await adminController.getAllRestaurantsData(data);
                break;
            case 'Find-Id-By-The-Restaurant':
                response = await adminController.findRestaurantById(data);
                break;
            case 'Verify-Restaurant-Documents':
                response = await adminController.verifyRestaurantDocument(data);
                break;
            case 'Rejected-Restaurant-Documents':
                response = await adminController.rejectedRestaurantDocuments(data);
                break;
            case 'Restaurant-Documents-Re-Submission':
                response = await registrationController.resubmitRestaurantDocuments(data);
                break;
            case 'Restaurant-add-menu-item':
                response = await menuController.addMenuItems(data);
                break;
            case 'Restaurant-edit-menu-item':
                response = await menuController.editMenuItems(data);
                break;
            case 'Get-All-Variants':
                response = await menuController.getAllVariants(data);
                break;
            case 'Get-All-Menus':
                response = await menuController.getAllMenuData(data);
                break;
            case 'Get-Specific-Menu':
                response = await menuController.getSpecificMenuData(data);
                break;
            case 'Delete-Menu':
                response = await menuController.softDeleteMenu(data);
                break;
            case 'Get-All-Restaurant-Data':
                response = await menuController.getAllRestaurantMenus(data);
                break;
            case 'Sort-Menu-Items':
                response = await menuController.sortAllMenus(data);
                break;
            case 'Update-Menu-Quantity':
                response = await menuController.updateMenuQuantity(data)
                break;
            case 'Update-Menu-Quantity-Cancel-Order':
                response = await menuController.cancelOrderQuantityUpdation(data)
                break;
            case 'Add-New-Subscription':
                response = await subscriptionPlanController.addNewSubscriptionPlan(data);
                break;
            case 'Get-All-Subscription-Plan':
                response = await subscriptionPlanController.getAllSubscriptionPlan(data);
                break;
            case 'Edit-Subscription-Plan':
                response = await subscriptionPlanController.editSubscriptionPlan(data);
                break;
            case 'Delete-SubScription-Plan':
                response = await subscriptionPlanController.deleteSubscriptionPlan(data);
                break;
            case 'Get-Any-Plan-Exist':
                response = await subscriptionPlanController.getAnySubscriptionPlanExist(data);
                break;
            case 'Subscription-Payment':
                response = await subscriptionPlanController.paymentSubscriptionPlan(data);
                break;
            case 'Verify-Payment':
                response = await subscriptionPlanController.verifyPaymentSubscriptionPlan(data);
                break;
            case 'Handle-Failed-Payment':
                response = await subscriptionPlanController.handleFailedPayment(data);
                break;
            case 'Retry-Payment':
                response = await subscriptionPlanController.retryPayment(data);
                break;
            case 'Get-The-Transaction-History':
                response = await subscriptionPlanController.getTheTransactionHistory(data);
                break;
            case 'Get-Transaction-Details':
                response = await subscriptionPlanController.getTheTransactionDetails(data);
                break;
            case 'Get-All-Restaurant-Payments':
                response = await subscriptionPlanController.getAllRestaurantPayments(data);
                break;

            default:
                response = 'Request key not found';
                break;
        }

        await rabbitClient.produce(response, correlationId, replyTo);
    }
}