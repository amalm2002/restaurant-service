import RegistartionController from '../controller/registrationController';
import RestaurantMenuController from '../controller/restaurntMenuItemController';
import LoginController from '../controller/loginController';
import RestaurantDisplayController from '../controller/restaurantDisplayController';
import rabbitClient from './client'

const registartionController = new RegistartionController()
const loginController = new LoginController()
const adminController = new RestaurantDisplayController()
const menuController=new RestaurantMenuController()

export default class MessageHandler {
    static async handle(
        operation: string,
        data: any,
        correlationId: string,
        replyTo: string
    ) {
        let response = data

        console.log('the operation is ', operation, data);

        switch (operation) {
            case 'Registration-check':
                console.log('reach on registercheck case');
                response = await registartionController.checkRestaurant(data)
                break;

            case 'Restaurant-register':
                console.log('reach on register case');
                response = await registartionController.register(data)
                break;

            case 'Restaurant-resendOtp':
                console.log('reach on restaurant otp resend case');
                response = await registartionController.restaurantResendOtp(data)
                break;

            case 'Restaurant-Documents-Submission':
                console.log('reach on Restaurant-Documents-Submission case');
                response = await registartionController.restaurantDocumentUpdate(data)
                break;

            case 'Restaurant-location':
                console.log('reach on Restaurant-location case');
                response = await registartionController.restaurantLocation(data)
                break;

            case 'Registration-login':
                console.log('reach on restaurant login case');
                response = await loginController.checkLoginRestaurant(data)
                break;

            case 'Update-Online-Status':
                console.log('reach on restaurant login case');
                response = await loginController.updateOnlineStatus(data)
                break;

            case 'Get-All-Restaurants':
                console.log('reach on Get-All-Restaurants case');
                response = await adminController.getAllRestaurantsData(data)
                break;

            case 'Find-Id-By-The-Restaurant':
                console.log('reach on Find-Id-By-The-Restaurant case');
                response = await adminController.findRestaurantById(data)
                break;

            case 'Verify-Restaurant-Documents':
                console.log('reach on Verify-Restaurant-Documents case');
                response = await adminController.verifyRestaurntDocument(data)
                break;

            case 'Rejected-Restaurant-Documents':
                console.log('reach on Rejected-Restaurant-Documents case');
                response = await adminController.rejectedRestaurantDocuments(data)
                break;

            case 'Restaurant-Documents-Re-Submission':
                console.log('reach on Restaurant-Documents-Re-Submission case');
                response = await registartionController.resubmitRestaurantDocuments(data)
                break;

            case  'Restaurant-add-menu-item':
                console.log('reach on  Restaurant-add-menu-item case');
                response = await menuController.addMenuItems(data)
                break;

            case  'Get-All-Variants':
                console.log('reach on  Get-All-Variants case');
                response = await menuController.getAllVariants(data)
                break;

            default:
                response = 'request-key not-found'
                break;
        }

        await rabbitClient.produce(response, correlationId, replyTo)
    }
}