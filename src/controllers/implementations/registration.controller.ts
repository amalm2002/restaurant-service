import { IRegistrationController } from '../interfaces/registration.controller.interface';
import { IRegistrationService } from '../../services/interfaces/registration.service.interface';
import { IAuthService } from '../../services/interfaces/auth.service.interface';
import { RegistrationDTO, RegistrationCheckDTO } from '../../dto/restaurant/restaurant.dto';
import { DocumentsDTO, ResubDocsDTO } from '../../dto/restaurant/documents.dto';
import { LocationDTO } from '../../dto/restaurant/location.dto';
import { OtpSendingUtil } from '../../utilities/otp-sending.util';
import { INodemailerService } from '../../services/interfaces/nodemailer.service.interface';
import { IOtpService } from '../../services/interfaces/otp.service.interface';

export default class RegistrationController implements IRegistrationController {
    private registrationService: IRegistrationService;
    private authService: IAuthService;
    private nodemailerService: INodemailerService;
    private otpService: IOtpService;

    constructor(
        registrationService: IRegistrationService,
        authService: IAuthService,
        nodemailerService: INodemailerService,
        otpService: IOtpService
    ) {
        this.registrationService = registrationService;
        this.authService = authService;
        this.nodemailerService = nodemailerService;
        this.otpService = otpService;
    }

    async register(data: RegistrationDTO) {
        const { restaurantName, email, mobile, otp, otpToken } = data;

        if (!otp || !otpToken) {
            return { error: 'OTP and OTP Token are required.' };
        }

        const decodedToken = this.authService.verifyOption(otpToken);

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
            const response = await this.registrationService.register(restaurantData);
            return response;
        } catch (error) {
            return { error: (error as Error).message };
        }
    }

    async checkRestaurant(data: RegistrationCheckDTO) {
        try {
            const { email } = data;
            const response = await this.registrationService.checkRestaurant(data);
            console.log('respoinse :', response);

            if (response.message === 'restaurant not registered') {
                const token = await OtpSendingUtil.sendOtp(
                    email,
                    this.nodemailerService,
                    this.otpService,
                    this.authService
                );
                console.log('OTP Sent:', token);
                return { ...response, otpToken: token };
            }
            return response;
        } catch (error) {
            return { error: (error as Error).message };
        }
    }

    async restaurantResendOtp(data: RegistrationCheckDTO) {
        try {
            const { email } = data
            const response = await this.registrationService.restaurantResendOtp(data);
            const token = await OtpSendingUtil.sendOtp(
                email,
                this.nodemailerService,
                this.otpService,
                this.authService);
            console.log('RESEND OTP SEND :', token);
            return { ...response, otpToken: token };
        } catch (error) {
            return { error: (error as Error).message };
        }
    }

    async restaurantDocumentUpdate(data: DocumentsDTO) {
        try {
            const response = await this.registrationService.restaurantDocumentUpdate(data);
            return response;
        } catch (error) {
            return { error: (error as Error).message };
        }
    }

    async restaurantLocation(data: LocationDTO) {
        try {
            const response = await this.registrationService.restaurantLocation(data);
            return response;
        } catch (error) {
            return { error: (error as Error).message };
        }
    }

    async resubmitRestaurantDocuments(data: ResubDocsDTO) {
        try {
            const response = await this.registrationService.resubmitDocuments(data);
            return response;
        } catch (error) {
            return { error: (error as Error).message };
        }
    }
}