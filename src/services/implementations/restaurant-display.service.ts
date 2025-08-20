import { IRestaurantDisplayService } from '../interfaces/restaurant-display.service.interface';
import { IAdminRepository } from '../../repositories/interfaces/admin.repository.interface';
import { INodemailerService } from '../interfaces/nodemailer.service.interface';
import { OtpSendingUtil } from '../../utilities/otp-sending.util';
import { GetAllRestaurantsResponseDTO, GetAllRestaurantsSearchAndFilterDTO } from '../../dto/restaurant/get-all-restaurants.dto';
import { GetRestaurantDataByIdDTO, GetRestaurantDataByIdResDTO } from '../../dto/restaurant/get-restaurant-by-id.dto';
import { VerifyRestaurantDocumentDTO } from '../../dto/restaurant/verify-document.dto';
import { RejectRestaurantDocumentDTO } from '../../dto/restaurant/reject-document.dto';
import { RegistrationResponseDTO } from '../../dto/restaurant/restaurant.dto';

export default class RestaurantDisplayService implements IRestaurantDisplayService {

    constructor(
        private readonly _adminRepository: IAdminRepository,
        private readonly _nodemailerService: INodemailerService
    ) { }

    async getAllRestaurants(searchAndFilter: GetAllRestaurantsSearchAndFilterDTO): Promise<GetAllRestaurantsResponseDTO> {
        try {
            const response = await this._adminRepository.getAllRestaurants(searchAndFilter);
            return { message: 'success', response };
        } catch (error) {
            return { message: (error as Error).message };
        }
    }

    async findRestaurantById(restaurantQuery: GetRestaurantDataByIdDTO): Promise<GetRestaurantDataByIdResDTO> {
        try {
            const { restaurantId } = restaurantQuery
            const response = await this._adminRepository.findRestaurantById(restaurantId);
            return { message: 'success', response: response };
        } catch (error) {
            return { message: (error as Error).message };
        }
    }

    async verifyRestaurantDocuments(verificationRequest: VerifyRestaurantDocumentDTO): Promise<any> {
        try {
            const { restaurantId } = verificationRequest
            const response = await this._adminRepository.verifyRestaurantDocuments(restaurantId);
            return response;
        } catch (error) {
            return { message: (error as Error).message };
        }
    }

    async rejectRestaurantDocuments(rejectionRequest: RejectRestaurantDocumentDTO): Promise<RegistrationResponseDTO | string | { message: string }> {
        try {
            const { restaurantId, rejectionReason } = rejectionRequest
            const response = await this._adminRepository.rejectRestaurantDocuments(restaurantId, rejectionReason);
            return response;
        } catch (error) {
            return { message: (error as Error).message };
        }
    }
}