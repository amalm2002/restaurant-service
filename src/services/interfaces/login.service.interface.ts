import { LoginDTO } from '../../dto/auth/login.dto';

export interface ILoginService {
    loginCheckRestaurant(data: LoginDTO): Promise<any>;
    updateOnlineStatus(restaurantId: string, isOnline: boolean): Promise<any>;
    fetchOnlineStatus(restaurantId: string): Promise<any>;
    getRestaurantDataById(restaurantId: string): Promise<any>;
}