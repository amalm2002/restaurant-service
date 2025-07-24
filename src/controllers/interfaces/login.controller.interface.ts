import { LoginCheckRestaurantResponse, LoginDTO } from '../../dto/auth/login.dto';
import { GetRestaurantDataByIdControllerResponseDTO, GetRestaurantDataByIdDTO } from '../../dto/restaurant/get-restaurant-by-id.dto';
import { FetchOnlineStatusResponseDTO, UpdateOnlineStatusDTO, UpdateOnlineStatusResponseDTO } from '../../dto/restaurant/update-online-status.dto';

export interface ILoginController {
    checkLoginRestaurant(data: LoginDTO): Promise<LoginCheckRestaurantResponse>;
    updateOnlineStatus(data: UpdateOnlineStatusDTO): Promise<UpdateOnlineStatusResponseDTO>;
    fetchOnlineStatus(restaurantId: string): Promise<FetchOnlineStatusResponseDTO>;
    getRestaurantDataById(data: GetRestaurantDataByIdDTO): Promise<GetRestaurantDataByIdControllerResponseDTO>
}