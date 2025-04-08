import RegistrationUseCase from "../useCases/registration.use-case";
import LoginUseCase from '../useCases/login.Use-Case'
import { AuthService } from "../services/auth";
import RestaurantRepository from "../repositeries/restaurantRepo"

const registrationUseCase = new RegistrationUseCase()
const authService = new AuthService();
const restaurantRepo = new RestaurantRepository();

const loginUseCase = new LoginUseCase(restaurantRepo, authService);

export default class LoginController {
    checkLoginRestaurant = async (data: { email: string, mobile: number }) => {
        // console.log('data is show on the checkLoginRestauarnt :',data);

        try {
            const { email, mobile } = data
            const response = await loginUseCase.loginCheckRestaurant(email, mobile)       
            return response
        } catch (error) {
            return { error: (error as Error).message }
        }
    }

    updateOnlineStatus = async (data: { restaurant_id: string; isOnline: boolean }) => {
        try {
            const { restaurant_id, isOnline } = data;
            const response = await loginUseCase.updateOnlineStatus(restaurant_id, isOnline);
            // console.log('Online status update response:', response);
            return response;
        } catch (error) {
            return { error: (error as Error).message };
        }
    };
}