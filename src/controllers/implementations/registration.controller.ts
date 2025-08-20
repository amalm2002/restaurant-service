import { IRegistrationController } from '../interfaces/registration.controller.interface';
import { IRegistrationService } from '../../services/interfaces/registration.service.interface';
import { IAuthService } from '../../services/interfaces/auth.service.interface';
import { LocationDTO, LocationUpdateResponseDTO } from '../../dto/restaurant/location.dto';
import { OtpSendingUtil } from '../../utilities/otp-sending.util';
import { INodemailerService } from '../../services/interfaces/nodemailer.service.interface';
import { IOtpService } from '../../services/interfaces/otp.service.interface';
import {
    RegistrationDTO,
    RegistrationCheckDTO,
    RestaurantRegistrationResponseDTO,
    RegistrationCheckResponseDTO
} from '../../dto/restaurant/restaurant.dto';
import {
    DocumentsDTO,
    DocumentsUpdateResponseDTO,
    ResubDocsDTO,
    ResubDocsResponseDTO
} from '../../dto/restaurant/documents.dto';

export default class RegistrationController implements IRegistrationController {


    constructor(
        private readonly _registrationService: IRegistrationService,
        private readonly _authService: IAuthService,
        private readonly _nodemailerService: INodemailerService,
        private readonly _otpService: IOtpService
    ) { }

    async register(registrationDetails: RegistrationDTO): Promise<RestaurantRegistrationResponseDTO> {
        const { restaurantName, email, mobile, otp, otpToken } = registrationDetails;

        if (!otp || !otpToken) {
            return { error: 'OTP and OTP Token are required.' };
        }

        const decodedToken = this._authService.verifyOption(otpToken);

        if (!decodedToken || 'message' in decodedToken || !decodedToken.clientId) {
            return { error: 'Invalid OTP Token' };
        }
        if (decodedToken.clientId !== otp) {
            return { error: 'Invalid OTP. Please try again.' };
        }

        const restaurantData: RegistrationDTO = {
            restaurantName,
            email,
            mobile,
        };

        try {
            const response = await this._registrationService.register(restaurantData);
            return response;
        } catch (error) {
            return { error: (error as Error).message };
        }
    }

    async checkRestaurant(checkRequest: RegistrationCheckDTO): Promise<RegistrationCheckResponseDTO> {
        try {
            const { email } = checkRequest;
            const response = await this._registrationService.checkRestaurant(checkRequest);
            if (response.message === 'restaurant not registered') {
                const token = await OtpSendingUtil.sendOtp(
                    email,
                    this._nodemailerService,
                    this._otpService,
                    this._authService
                );
                console.log('OTP Sent:', token);
                return { ...response, otpToken: token };
            }
            return response;
        } catch (error) {
            return { error: (error as Error).message };
        }
    }

    async restaurantResendOtp(resendOtpRequest: RegistrationCheckDTO): Promise<RegistrationCheckResponseDTO> {
        try {
            const { email } = resendOtpRequest
            const response = await this._registrationService.restaurantResendOtp(resendOtpRequest);
            const token = await OtpSendingUtil.sendOtp(
                email,
                this._nodemailerService,
                this._otpService,
                this._authService);
            console.log('RESEND OTP SEND :', token);
            return { ...response, otpToken: token };
        } catch (error) {
            return { error: (error as Error).message };
        }
    }

    async restaurantDocumentUpdate(documentUpdate: DocumentsDTO): Promise<DocumentsUpdateResponseDTO> {
        try {
            const response = await this._registrationService.restaurantDocumentUpdate(documentUpdate);
            return response;
        } catch (error) {
            return { error: (error as Error).message };
        }
    }

    async restaurantLocation(locationUpdate: LocationDTO): Promise<LocationUpdateResponseDTO> {
        try {
            const response = await this._registrationService.restaurantLocation(locationUpdate);
            return response;
        } catch (error) {
            return { error: (error as Error).message };
        }
    }

    async resubmitRestaurantDocuments(resubmissionRequest: ResubDocsDTO): Promise<ResubDocsResponseDTO> {
        try {
            const response = await this._registrationService.resubmitDocuments(resubmissionRequest);
            return response;
        } catch (error) {
            return { error: (error as Error).message };
        }
    }
}