
import { RestaurantInterface } from '../../models/restaurant.model';
import { RegistrationDTO } from '../../dto/restaurant/restaurant.dto';
import { DocumentsDTO, ResubDocsDTO } from '../../dto/restaurant/documents.dto';
import { LocationDTO } from '../../dto/restaurant/location.dto';


export interface IRestaurantRepository {
    saveRestaurant(restaurantData: RegistrationDTO): Promise<RestaurantInterface | string>;
    findRestaurant(email: string, mobile: number): Promise<RestaurantInterface | string>;
    updateOnlineStatus(restaurantId: string, isOnline: boolean): Promise<RestaurantInterface | string>;
    fetchOnlineStatus(restaurantId: string): Promise<{ isOnline: boolean } | string>;
    restaurantDocumentsUpdate(restaurantDoc: DocumentsDTO): Promise<any>;
    restaurantLocationUpdate(locationData: LocationDTO): Promise<any>;
    resubmitRestaurantDocuments(resubmitDocs: ResubDocsDTO): Promise<RestaurantInterface | string>;
    getRestaurantDataById(restaurantId: string): Promise<any>;
}