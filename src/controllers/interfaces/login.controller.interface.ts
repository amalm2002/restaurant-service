import { LoginDTO } from '../../dto/auth/login.dto';

export interface ILoginController {
    checkLoginRestaurant(data: LoginDTO): Promise<any>;
    updateOnlineStatus(data: { restaurant_id: string; isOnline: boolean }): Promise<any>;
    fetchOnlineStatus(restaurantId: string): Promise<any>;
    getRestaurantDataById(data:{restaurantId: string}): Promise<any>
}