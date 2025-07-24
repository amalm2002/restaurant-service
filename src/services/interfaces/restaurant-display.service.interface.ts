import { GetAllRestaurantsResponseDTO, GetAllRestaurantsSearchAndFilterDTO } from "../../dto/restaurant/get-all-restaurants.dto";
import { GetRestaurantDataByIdDTO, GetRestaurantDataByIdResDTO } from "../../dto/restaurant/get-restaurant-by-id.dto";
import { RejectRestaurantDocumentDTO } from "../../dto/restaurant/reject-document.dto";
import { RegistrationResponseDTO } from "../../dto/restaurant/restaurant.dto";
import { VerifyRestaurantDocumentDTO, VerifyRestaurantDocumentResponseDTO } from "../../dto/restaurant/verify-document.dto";

export interface IRestaurantDisplayService {
    getAllRestaurants(data: GetAllRestaurantsSearchAndFilterDTO): Promise<GetAllRestaurantsResponseDTO>;
    findRestaurantById(data: GetRestaurantDataByIdDTO): Promise<GetRestaurantDataByIdResDTO>;
    verifyRestaurantDocuments(data: VerifyRestaurantDocumentDTO): Promise<any>;
    rejectRestaurantDocuments(data: RejectRestaurantDocumentDTO): Promise<RegistrationResponseDTO | string | { message: string }>;
}