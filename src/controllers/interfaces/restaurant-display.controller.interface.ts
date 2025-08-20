import { GetAllRestaurantsResponseDTO, GetAllRestaurantsSearchAndFilterDTO } from "../../dto/restaurant/get-all-restaurants.dto";
import { GetRestaurantDataByIdDTO, GetRestaurantDataByIdResDTO } from "../../dto/restaurant/get-restaurant-by-id.dto";
import { RejectRestaurantDocumentDTO } from "../../dto/restaurant/reject-document.dto";
import { VerifyRestaurantDocumentDTO } from "../../dto/restaurant/verify-document.dto";

export interface IRestaurantDisplayController {
    getAllRestaurantsData(searchAndFilter: GetAllRestaurantsSearchAndFilterDTO): Promise<GetAllRestaurantsResponseDTO>;
    findRestaurantById(restaurantQuery: GetRestaurantDataByIdDTO): Promise<GetRestaurantDataByIdResDTO>;
    verifyRestaurantDocument(verificationRequest: VerifyRestaurantDocumentDTO): Promise<any>;
    rejectedRestaurantDocuments(rejectionRequest: RejectRestaurantDocumentDTO): Promise<any>;
}