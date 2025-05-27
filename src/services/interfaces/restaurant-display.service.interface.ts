export interface IRestaurantDisplayService {
    getAllRestaurants(data: any): Promise<any>;
    findRestaurantById(restaurantId: string): Promise<any>;
    verifyRestaurantDocuments(restaurantId: string): Promise<any>;
    rejectRestaurantDocuments(restaurantId: string, rejectionReason: string): Promise<any>;
}