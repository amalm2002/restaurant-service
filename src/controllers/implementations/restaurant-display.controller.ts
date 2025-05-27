import { IRestaurantDisplayController } from '../interfaces/restaurant-display.controller.interface';
import { IRestaurantDisplayService } from '../../services/interfaces/restaurant-display.service.interface';
import { OtpSendingUtil } from '../../utilities/otp-sending.util';
import { INodemailerService } from '../../services/interfaces/nodemailer.service.interface';
import { IOtpService } from '../../services/interfaces/otp.service.interface';

export default class RestaurantDisplayController implements IRestaurantDisplayController {
    private restaurantDisplayService: IRestaurantDisplayService;
    private nodemailerService: INodemailerService;
    private otpService: IOtpService;

    constructor(
        restaurantDisplayService: IRestaurantDisplayService,
        nodemailerService: INodemailerService,
        otpService: IOtpService
    ) {
        this.restaurantDisplayService = restaurantDisplayService;
        this.nodemailerService = nodemailerService;
        this.otpService = otpService;
    }

    async getAllRestaurantsData(data: any) {
        try {
            const result = await this.restaurantDisplayService.getAllRestaurants(data);
            return result;
        } catch (error) {
            return { error: (error as Error).message };
        }
    }

    async findRestaurantById(data: { restaurantId: string }) {
        try {
            const { restaurantId } = data;
            const result = await this.restaurantDisplayService.findRestaurantById(restaurantId);
            return result;
        } catch (error) {
            return { error: (error as Error).message };
        }
    }

    async verifyRestaurantDocument(data: { restaurantId: string }) {
        try {
            const { restaurantId } = data;
            const result = await this.restaurantDisplayService.verifyRestaurantDocuments(restaurantId);

            if (typeof result === 'object' && result !== null && 'email' in result && result.isVerified) {
                await OtpSendingUtil.sendVerifyMail(result.email as string,
                    this.nodemailerService,
                );
            }
            return { message: 'success', response: result };
        } catch (error) {
            return { error: (error as Error).message };
        }
    }

    async rejectedRestaurantDocuments(data: { restaurantId: string; rejectionReason: string }) {
        try {
            const { restaurantId, rejectionReason } = data;
            const result = await this.restaurantDisplayService.rejectRestaurantDocuments(restaurantId, rejectionReason);
            // const isRejected = !!(result && typeof result !== 'string' && 'rejectionReason' in result && result.rejectionReason);
            let isRejected = false;
            if (
                result &&
                typeof result !== 'string' &&
                'rejectionReason' in result &&
                'isVerified' in result &&
                !result.isVerified &&
                result.rejectionReason
            ) {
                isRejected = true;
                await OtpSendingUtil.sendRejectedDocumetsMail(result.email, result.rejectionReason,this.nodemailerService);
            }
            return { message: 'success', result, isRejected };
        } catch (error) {
            return { error: (error as Error).message };
        }
    }
}