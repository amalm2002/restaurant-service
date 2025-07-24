import { GetAllRestaurantsResponseDTO, GetAllRestaurantsSearchAndFilterDTO } from "../../dto/restaurant/get-all-restaurants.dto";
import { GetRestaurantDataByIdDTO, GetRestaurantDataByIdResDTO } from "../../dto/restaurant/get-restaurant-by-id.dto";
import { RejectRestaurantDocumentDTO } from "../../dto/restaurant/reject-document.dto";
import { VerifyRestaurantDocumentDTO } from "../../dto/restaurant/verify-document.dto";

export interface IRestaurantDisplayController {
    getAllRestaurantsData(data: GetAllRestaurantsSearchAndFilterDTO): Promise<GetAllRestaurantsResponseDTO>;
    findRestaurantById(data: GetRestaurantDataByIdDTO): Promise<GetRestaurantDataByIdResDTO>;
    verifyRestaurantDocument(data: VerifyRestaurantDocumentDTO): Promise<any>;
    rejectedRestaurantDocuments(data: RejectRestaurantDocumentDTO): Promise<any>;
}