import { LoginCheckRestaurantResponse, LoginDTO } from '../../dto/auth/login.dto';
import { GetRestaurantDataByIdDTO, GetRestaurantDataByIdResponseDTO } from '../../dto/restaurant/get-restaurant-by-id.dto';
import { FetchOnlineStatusResponseDTO, UpdateOnlineStatusDTO, UpdateOnlineStatusResponseDTO } from '../../dto/restaurant/update-online-status.dto';

export interface ILoginService {
    loginCheckRestaurant(loginCredentials: LoginDTO): Promise<LoginCheckRestaurantResponse>;
    // updateOnlineStatus(restaurantId: string, isOnline: boolean): Promise<any>;
    updateOnlineStatus(statusUpdate: UpdateOnlineStatusDTO): Promise<UpdateOnlineStatusResponseDTO>;
    fetchOnlineStatus(restaurantId: string): Promise<FetchOnlineStatusResponseDTO>;
    getRestaurantDataById(restaurantQuery: GetRestaurantDataByIdDTO): Promise<GetRestaurantDataByIdResponseDTO>;
}