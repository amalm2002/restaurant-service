import { RegistrationDTO, RegistrationCheckDTO } from '../../dto/restaurant/restaurant.dto';
import { DocumentsDTO, ResubDocsDTO } from '../../dto/restaurant/documents.dto';
import { LocationDTO } from '../../dto/restaurant/location.dto';

export interface IRegistrationController {
    register(data: RegistrationDTO): Promise<any>;
    checkRestaurant(data: RegistrationCheckDTO): Promise<any>;
    restaurantResendOtp(data: RegistrationCheckDTO): Promise<any>;
    restaurantDocumentUpdate(data: DocumentsDTO): Promise<any>;
    restaurantLocation(data: LocationDTO): Promise<any>;
    resubmitRestaurantDocuments(data: ResubDocsDTO): Promise<any>;
}