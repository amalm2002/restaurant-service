import { IRestaurantDisplayService } from '../interfaces/restaurant-display.service.interface';
import { IAdminRepository } from '../../repositories/interfaces/admin.repository.interface';
import { INodemailerService } from '../interfaces/nodemailer.service.interface';
import { OtpSendingUtil } from '../../utilities/otp-sending.util';

export default class RestaurantDisplayService implements IRestaurantDisplayService {
    private adminRepository: IAdminRepository;
    private nodemailerService: INodemailerService;

    constructor(adminRepository: IAdminRepository, nodemailerService: INodemailerService) {
        this.adminRepository = adminRepository;
        this.nodemailerService = nodemailerService;
    }

    async getAllRestaurants(data: any) {
        try {
            const response = await this.adminRepository.getAllRestaurants(data);
            return { message: 'success', response };
        } catch (error) {
            return { message: (error as Error).message };
        }
    }

    async findRestaurantById(restaurantId: string) {
        try {
            const response = await this.adminRepository.findRestaurantById(restaurantId);
            return { message: 'success', response: response };
        } catch (error) {
            return { message: (error as Error).message };
        }
    }

    async verifyRestaurantDocuments(restaurantId: string) {
        try {
            const response = await this.adminRepository.verifyRestaurantDocuments(restaurantId);
            return response;
        } catch (error) {
            return { message: (error as Error).message };
        }
    }

    async rejectRestaurantDocuments(restaurantId: string, rejectionReason: string) {
        try {
            const response = await this.adminRepository.rejectRestaurantDocuments(restaurantId, rejectionReason);
            return response;
        } catch (error) {
            return { message: (error as Error).message };
        }
    }
}