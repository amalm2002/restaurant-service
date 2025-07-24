import { LoginCheckRestaurantResponse, LoginDTO } from '../../dto/auth/login.dto';
import { GetRestaurantDataByIdDTO, GetRestaurantDataByIdResponseDTO } from '../../dto/restaurant/get-restaurant-by-id.dto';
import { FetchOnlineStatusResponseDTO, UpdateOnlineStatusDTO, UpdateOnlineStatusResponseDTO } from '../../dto/restaurant/update-online-status.dto';

export interface ILoginService {
    loginCheckRestaurant(data: LoginDTO): Promise<LoginCheckRestaurantResponse>;
    // updateOnlineStatus(restaurantId: string, isOnline: boolean): Promise<any>;
    updateOnlineStatus(data: UpdateOnlineStatusDTO): Promise<UpdateOnlineStatusResponseDTO>;
    fetchOnlineStatus(restaurantId: string): Promise<FetchOnlineStatusResponseDTO>;
    getRestaurantDataById(data: GetRestaurantDataByIdDTO): Promise<GetRestaurantDataByIdResponseDTO>;
}