import { RegistrationCheckDTO } from "./restaurant.dto";

export interface LocationDTO {
    restaurantId: string;
    latitude: number;
    longitude: number;
}

export interface LocationUpdateResponseDTO {
    success?: boolean;
    message?: string;
    data?: RegistrationCheckDTO;
    error?: string;
}