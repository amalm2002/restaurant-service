import { RegistrationResponseDTO } from "./restaurant.dto";

export interface VerifyRestaurantDocumentDTO {
    restaurantId: string;
}

export interface VerifyRestaurantDocumentResponseDTO {
    message?: string;
    response?: string | RegistrationResponseDTO | { message: string };
    error?: boolean;
}