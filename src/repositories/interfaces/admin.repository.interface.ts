
import { RestaurantInterface } from '../../models/restaurant.model';

export interface IAdminRepository {
    getAllRestaurants(data: any): Promise<RestaurantInterface[] | string>;
    findRestaurantById(restaurantId: string): Promise<RestaurantInterface | string | null>;
    verifyRestaurantDocuments(restaurantId: string): Promise<RestaurantInterface | string | { message: string }>;
    rejectRestaurantDocuments(restaurantId: string, rejectionReason: string): Promise<RestaurantInterface | string | { message: string }>;
}