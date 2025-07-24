import { RegistrationDTO, RegistrationCheckDTO, RestaurantRegistrationResponseDTO, RegistrationCheckResponseDTO } from '../../dto/restaurant/restaurant.dto';
import { DocumentsDTO, DocumentsUpdateResponseDTO, ResubDocsDTO, ResubDocsResponseDTO } from '../../dto/restaurant/documents.dto';
import { LocationDTO, LocationUpdateResponseDTO } from '../../dto/restaurant/location.dto';

export interface IRegistrationController {
    register(data: RegistrationDTO): Promise<RestaurantRegistrationResponseDTO>;
    checkRestaurant(data: RegistrationCheckDTO): Promise<RegistrationCheckResponseDTO>;
    restaurantResendOtp(data: RegistrationCheckDTO): Promise<RegistrationCheckResponseDTO>;
    restaurantDocumentUpdate(data: DocumentsDTO): Promise<DocumentsUpdateResponseDTO>;
    restaurantLocation(data: LocationDTO): Promise<LocationUpdateResponseDTO>;
    resubmitRestaurantDocuments(data: ResubDocsDTO): Promise<ResubDocsResponseDTO>;
}