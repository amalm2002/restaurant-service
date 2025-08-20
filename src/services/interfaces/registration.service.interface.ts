import { RegistrationDTO, RegistrationCheckDTO, RestaurantRegistrationResponseDTO, RegistrationCheckResponseDTO } from '../../dto/restaurant/restaurant.dto';
import { DocumentsDTO, DocumentsUpdateResponseDTO, ResubDocsDTO, ResubDocsResponseDTO } from '../../dto/restaurant/documents.dto';
import { LocationDTO, LocationUpdateResponseDTO } from '../../dto/restaurant/location.dto';

export interface IRegistrationService {
    register(registrationDetails: RegistrationDTO): Promise<RestaurantRegistrationResponseDTO>;
    checkRestaurant(checkRequest: RegistrationCheckDTO): Promise<RegistrationCheckResponseDTO>;
    restaurantResendOtp(resendOtpRequest: RegistrationCheckDTO): Promise<RegistrationCheckResponseDTO>;
    restaurantDocumentUpdate(documentUpdate: DocumentsDTO): Promise<DocumentsUpdateResponseDTO>;
    restaurantLocation(locationUpdate: LocationDTO): Promise<LocationUpdateResponseDTO>;
    resubmitDocuments(resubmissionRequest: ResubDocsDTO): Promise<ResubDocsResponseDTO>;
}