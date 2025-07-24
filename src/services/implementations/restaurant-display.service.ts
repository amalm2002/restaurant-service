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
    private adminRepository: IAdminRepository;
    private nodemailerService: INodemailerService;

    constructor(adminRepository: IAdminRepository, nodemailerService: INodemailerService) {
        this.adminRepository = adminRepository;
        this.nodemailerService = nodemailerService;
    }

    async getAllRestaurants(data: GetAllRestaurantsSearchAndFilterDTO): Promise<GetAllRestaurantsResponseDTO> {
        try {
            const response = await this.adminRepository.getAllRestaurants(data);
            return { message: 'success', response };
        } catch (error) {
            return { message: (error as Error).message };
        }
    }

    async findRestaurantById(data: GetRestaurantDataByIdDTO): Promise<GetRestaurantDataByIdResDTO> {
        try {
            const { restaurantId } = data
            const response = await this.adminRepository.findRestaurantById(restaurantId);
            return { message: 'success', response: response };
        } catch (error) {
            return { message: (error as Error).message };
        }
    }

    async verifyRestaurantDocuments(data: VerifyRestaurantDocumentDTO): Promise<any> {
        try {
            const { restaurantId } = data
            const response = await this.adminRepository.verifyRestaurantDocuments(restaurantId);
            return response;
        } catch (error) {
            return { message: (error as Error).message };
        }
    }

    async rejectRestaurantDocuments(data: RejectRestaurantDocumentDTO): Promise<RegistrationResponseDTO | string | { message: string }> {
        try {
            const { restaurantId, rejectionReason } = data
            const response = await this.adminRepository.rejectRestaurantDocuments(restaurantId, rejectionReason);
            return response;
        } catch (error) {
            return { message: (error as Error).message };
        }
    }
}