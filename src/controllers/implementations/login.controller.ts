import { ILoginController } from '../interfaces/login.controller.interface';
import { ILoginService } from '../../services/interfaces/login.service.interface';
import { LoginDTO } from '../../dto/auth/login.dto';

export default class LoginController implements ILoginController {
    private loginService: ILoginService;

    constructor(loginService: ILoginService) {
        this.loginService = loginService;
    }

    async checkLoginRestaurant(data: LoginDTO) {
        try {
            const { email, mobile } = data;
            const response = await this.loginService.loginCheckRestaurant({ email, mobile });
            return response;
        } catch (error) {
            return { error: (error as Error).message };
        }
    }

    async updateOnlineStatus(data: { restaurant_id: string; isOnline: boolean }) {
        try {
            const { restaurant_id, isOnline } = data;
            const response = await this.loginService.updateOnlineStatus(restaurant_id, isOnline);
            return response;
        } catch (error) {
            return { error: (error as Error).message };
        }
    }

    async fetchOnlineStatus(restaurantId: string) {
        try {
            const response = await this.loginService.fetchOnlineStatus(restaurantId);
            return response;
        } catch (error) {
            return { error: (error as Error).message };
        }
    }

    async getRestaurantDataById(data: { restaurantId: string }): Promise<any> {
        try {
            const restaurant_id = data.restaurantId;
            const response = await this.loginService.getRestaurantDataById(restaurant_id);

            if (!response || response.error) {
                return {
                    success: false,
                    message: response?.error || 'Restaurant not found',
                };
            }

            return {
                success: true,
                data: response,
            };
        } catch (error) {
            return {
                success: false,
                message: (error as Error).message,
            };
        }
    }
}