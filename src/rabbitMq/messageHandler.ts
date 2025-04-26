import RegistrationController from '../controller/registrationController';
import RestaurantMenuController from '../controller/restaurntMenuItemController';
import LoginController from '../controller/loginController';
import RestaurantDisplayController from '../controller/restaurantDisplayController';
import rabbitClient from './client';
import SubscriptionPlanController from '../controller/subscriptionPlanController';

export default class MessageHandler {
    private registrationController: RegistrationController;
    private loginController: LoginController;
    private adminController: RestaurantDisplayController;
    private menuController: RestaurantMenuController;
    private subscriptionPlanController: SubscriptionPlanController;

    constructor(
        registrationController: RegistrationController,
        loginController: LoginController,
        adminController: RestaurantDisplayController,
        menuController: RestaurantMenuController,
        subscriptionPlanController: SubscriptionPlanController
    ) {
        this.registrationController = registrationController;
        this.loginController = loginController;
        this.adminController = adminController;
        this.menuController = menuController;
        this.subscriptionPlanController = subscriptionPlanController;
    }

    static async handle(
        operation: string,
        data: any,
        correlationId: string,
        replyTo: string,
        controllers: {
            registrationController: RegistrationController,
            loginController: LoginController,
            adminController: RestaurantDisplayController,
            menuController: RestaurantMenuController,
            subscriptionPlanController: SubscriptionPlanController
        }
    ) {
        const { registrationController, loginController, adminController, menuController, subscriptionPlanController } = controllers;
        let response = data;

        console.log('the operation is ', operation, data);

        switch (operation) {
            case 'Registration-check':
                console.log('reach on registercheck case');
                response = await registrationController.checkRestaurant(data);
                break;

            case 'Restaurant-register':
                console.log('reach on register case');
                response = await registrationController.register(data);
                break;

            case 'Restaurant-resendOtp':
                console.log('reach on restaurant otp resend case');
                response = await registrationController.restaurantResendOtp(data);
                break;

            case 'Restaurant-Documents-Submission':
                console.log('reach on Restaurant-Documents-Submission case');
                response = await registrationController.restaurantDocumentUpdate(data);
                break;

            case 'Restaurant-location':
                console.log('reach on Restaurant-location case');
                response = await registrationController.restaurantLocation(data);
                break;

            case 'Registration-login':
                console.log('reach on restaurant login case');
                response = await loginController.checkLoginRestaurant(data);
                break;

            case 'Update-Online-Status':
                console.log('reach on retaurant update-online-status case');
                response = await loginController.updateOnlineStatus(data);
                break;

            case 'Fetch-Online-Status':
                console.log('reach on retaurant Fetch-Online-Status case');
                response = await loginController.fetchOnlineStatus(data);
                break;

            case 'Get-All-Restaurants':
                console.log('reach on Get-All-Restaurants case');
                response = await adminController.getAllRestaurantsData(data);
                break;

            case 'Find-Id-By-The-Restaurant':
                console.log('reach on Find-Id-By-The-Restaurant case');
                response = await adminController.findRestaurantById(data);
                break;

            case 'Verify-Restaurant-Documents':
                console.log('reach on Verify-Restaurant-Documents case');
                response = await adminController.verifyRestaurntDocument(data);
                break;

            case 'Rejected-Restaurant-Documents':
                console.log('reach on Rejected-Restaurant-Documents case');
                response = await adminController.rejectedRestaurantDocuments(data);
                break;

            case 'Restaurant-Documents-Re-Submission':
                console.log('reach on Restaurant-Documents-Re-Submission case');
                response = await registrationController.resubmitRestaurantDocuments(data);
                break;

            case 'Restaurant-add-menu-item':
                console.log('reach on Restaurant-add-menu-item case');
                response = await menuController.addMenuItems(data);
                break;

            case 'Restaurant-edit-menu-item':
                console.log('reach on Get-Specific-Menu case');
                response = await menuController.editMenuItems(data);
                break;

            case 'Get-All-Variants':
                console.log('reach on Get-All-Variants case');
                response = await menuController.getAllVariants(data);
                break;

            case 'Get-All-Menus':
                console.log('reach on Get-All-Menus case');
                response = await menuController.getAllMenuData(data);
                break;

            case 'Get-Specific-Menu':
                console.log('reach on Get-Specific-Menu case');
                response = await menuController.getSpecificMenuData(data);
                break;

            case 'Delete-Menu':
                console.log('reach on Delete-Menu case');
                response = await menuController.softDeleteMenu(data);
                break;

            case 'Get-All-Restaurant-Data':
                console.log('reach on Get-All-Restaurant-Data case');
                response = await menuController.getAllRestaurantMenus(data);
                break;

            // case 'Get-All-Restaurant-Dishes':
            //     console.log('reach on Get-All-Restaurant-Dishes case');
            //     response = await menuController.getAllRestaurantDishes(data);
            //     break;

            case 'Sort-Menu-Items':
                console.log('reach on Sort-Menu-Items case');
                response = await menuController.sortAllMenus(data);
                break;

            case 'Add-New-Subscription':
                console.log('reach on Add-New-Subscription case');
                response = await subscriptionPlanController.addNewSubScriptionPlan(data);
                break;

            case 'Get-All-Subscription-Plan':
                console.log('reach on Get-All-Subscription-Plan case');
                response = await subscriptionPlanController.getAllSubScriptionPlan(data);
                break;

            case 'Edit-Subscription-Plan':
                console.log('reach on Edit-Subscription-Plan case');
                response = await subscriptionPlanController.editSubScriptionPlan(data);
                break;
            case 'Delete-SubScription-Plan':
                console.log('reach on Delete-SubScription-Plan case');
                response = await subscriptionPlanController.deleteSubScriptionPlan(data);
                break;

            // case 'Get-All-Subscription-Plan':
            //     console.log('reach on Get-All-Subscription-Plan case');
                // response = await subscriptionPlanController.getAllSubScriptionPlan(data);
                // break;

            default:
                response = 'request-key not-found';
                break;
        }

        await rabbitClient.produce(response, correlationId, replyTo);
    }
}