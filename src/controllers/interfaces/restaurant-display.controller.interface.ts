export interface IRestaurantDisplayController {
    getAllRestaurantsData(data: any): Promise<any>;
    findRestaurantById(data: { restaurantId: string }): Promise<any>;
    verifyRestaurantDocument(data: { restaurantId: string }): Promise<any>;
    rejectedRestaurantDocuments(data: { restaurantId: string; rejectionReason: string }): Promise<any>;
}