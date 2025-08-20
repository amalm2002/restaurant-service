import { ILoginController } from '../interfaces/login.controller.interface';
import { ILoginService } from '../../services/interfaces/login.service.interface';
import { LoginCheckRestaurantResponse, LoginDTO } from '../../dto/auth/login.dto';
import { FetchOnlineStatusResponseDTO, UpdateOnlineStatusDTO, UpdateOnlineStatusResponseDTO } from '../../dto/restaurant/update-online-status.dto';
import { GetRestaurantDataByIdControllerResponseDTO, GetRestaurantDataByIdDTO, GetRestaurantDataByIdResponseDTO } from '../../dto/restaurant/get-restaurant-by-id.dto';

export default class LoginController implements ILoginController {

    constructor(
        private readonly _loginService: ILoginService
    ) { }

    async checkLoginRestaurant(loginCredentials: LoginDTO): Promise<LoginCheckRestaurantResponse> {
        try {
            const { email, mobile } = loginCredentials;
            const response = await this._loginService.loginCheckRestaurant({ email, mobile });
            return response;
        } catch (error) {
            return { error: (error as Error).message };
        }
    }

    async updateOnlineStatus(statusUpdate: UpdateOnlineStatusDTO): Promise<UpdateOnlineStatusResponseDTO> {
        try {
            // const { restaurant_id, isOnline } = data;
            const response = await this._loginService.updateOnlineStatus(statusUpdate);
            return response;
        } catch (error) {
            return { error: (error as Error).message };
        }
    }

    async fetchOnlineStatus(restaurantId: string): Promise<FetchOnlineStatusResponseDTO> {
        try {
            const response = await this._loginService.fetchOnlineStatus(restaurantId);
            return response;
        } catch (error) {
            return { error: (error as Error).message };
        }
    }

    async getRestaurantDataById(restaurantQuery: GetRestaurantDataByIdDTO): Promise<GetRestaurantDataByIdControllerResponseDTO> {
        try {
            // const restaurant_id = data.restaurantId;
            const response = await this._loginService.getRestaurantDataById(restaurantQuery);
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