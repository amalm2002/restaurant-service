import { RegistrationResponseDTO } from "./restaurant.dto";

export interface GetAllRestaurantsResponseDTO {
    message?: string;
    response?: RegistrationResponseDTO[] | string;
    error?: string;
}

export interface GetAllRestaurantsSearchAndFilterDTO {
    search?: string;
    status?: string;
}