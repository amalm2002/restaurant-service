import { IRestaurantDisplayController } from '../interfaces/restaurant-display.controller.interface';
import { IRestaurantDisplayService } from '../../services/interfaces/restaurant-display.service.interface';
import { OtpSendingUtil } from '../../utilities/otp-sending.util';
import { INodemailerService } from '../../services/interfaces/nodemailer.service.interface';
import { IOtpService } from '../../services/interfaces/otp.service.interface';
import { GetAllRestaurantsResponseDTO, GetAllRestaurantsSearchAndFilterDTO } from '../../dto/restaurant/get-all-restaurants.dto';
import { GetRestaurantDataByIdDTO, GetRestaurantDataByIdResDTO } from '../../dto/restaurant/get-restaurant-by-id.dto';
import { VerifyRestaurantDocumentDTO } from '../../dto/restaurant/verify-document.dto';
import { RejectRestaurantDocumentDTO } from '../../dto/restaurant/reject-document.dto';

export default class RestaurantDisplayController implements IRestaurantDisplayController {

    constructor(
        private readonly _restaurantDisplayService: IRestaurantDisplayService,
        private readonly _nodemailerService: INodemailerService,
        private readonly _otpService: IOtpService
    ) { }

    async getAllRestaurantsData(searchAndFilter: GetAllRestaurantsSearchAndFilterDTO): Promise<GetAllRestaurantsResponseDTO> {
        try {
            const result = await this._restaurantDisplayService.getAllRestaurants(searchAndFilter);
            return result;
        } catch (error) {
            return { error: (error as Error).message };
        }
    }

    async findRestaurantById(restaurantQuery: GetRestaurantDataByIdDTO): Promise<GetRestaurantDataByIdResDTO> {
        try {
            // const { restaurantId } = data;
            const result = await this._restaurantDisplayService.findRestaurantById(restaurantQuery);
            return result;
        } catch (error) {
            return { error: (error as Error).message };
        }
    }

    async verifyRestaurantDocument(verificationRequest: VerifyRestaurantDocumentDTO): Promise<any> {
        try {
            // const { restaurantId } = data;
            const result = await this._restaurantDisplayService.verifyRestaurantDocuments(verificationRequest);

            if (typeof result === 'object' && result !== null && 'email' in result && result.isVerified) {
                await OtpSendingUtil.sendVerifyMail(result.email as string,
                    this._nodemailerService,
                );
            }
            return { message: 'success', response: result };
        } catch (error) {
            return { error: (error as Error).message };
        }
    }

    async rejectedRestaurantDocuments(rejectionRequest: RejectRestaurantDocumentDTO): Promise<any> {
        try {
            // const { restaurantId, rejectionReason } = data;
            const result = await this._restaurantDisplayService.rejectRestaurantDocuments(rejectionRequest);
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
                await OtpSendingUtil.sendRejectedDocumetsMail(result.email, result.rejectionReason, this._nodemailerService);
            }
            return { message: 'success', result, isRejected };
        } catch (error) {
            return { error: (error as Error).message };
        }
    }
}