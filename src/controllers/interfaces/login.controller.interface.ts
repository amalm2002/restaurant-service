import { LoginCheckRestaurantResponse, LoginDTO } from '../../dto/auth/login.dto';
import { GetRestaurantDataByIdControllerResponseDTO, GetRestaurantDataByIdDTO } from '../../dto/restaurant/get-restaurant-by-id.dto';
import { FetchOnlineStatusResponseDTO, UpdateOnlineStatusDTO, UpdateOnlineStatusResponseDTO } from '../../dto/restaurant/update-online-status.dto';

export interface ILoginController {
    checkLoginRestaurant(loginCredentials: LoginDTO): Promise<LoginCheckRestaurantResponse>;
    updateOnlineStatus(statusUpdate: UpdateOnlineStatusDTO): Promise<UpdateOnlineStatusResponseDTO>;
    fetchOnlineStatus(restaurantId: string): Promise<FetchOnlineStatusResponseDTO>;
    getRestaurantDataById(restaurantQuery: GetRestaurantDataByIdDTO): Promise<GetRestaurantDataByIdControllerResponseDTO>
}