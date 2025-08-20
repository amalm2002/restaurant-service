import { IRegistrationService } from '../interfaces/registration.service.interface';
import { IRestaurantRepository } from '../../repositories/interfaces/restaurant.repository.interface';
import { IOtpService } from '../interfaces/otp.service.interface';
import { INodemailerService } from '../interfaces/nodemailer.service.interface';
import { RegistrationDTO, RegistrationCheckDTO, RegistrationResponseDTO, RestaurantRegistrationResponseDTO, RegistrationCheckResponseDTO } from '../../dto/restaurant/restaurant.dto';
import { DocumentsDTO, DocumentsUpdateResponseDTO, ResubDocsDTO, ResubDocsResponseDTO } from '../../dto/restaurant/documents.dto';
import { LocationDTO, LocationUpdateResponseDTO } from '../../dto/restaurant/location.dto';
import { IAuthService } from '../interfaces/auth.service.interface';
import { RestaurantInterface } from '../../models/restaurant.model';

export default class RegistrationService implements IRegistrationService {

    constructor(
        private readonly _restaurantRepository: IRestaurantRepository,
        private readonly _otpService: IOtpService,
        private readonly _nodemailerService: INodemailerService,
        private readonly _authService: IAuthService,
    ) { }

    async register(registrationDetails: RegistrationDTO): Promise<RestaurantRegistrationResponseDTO> {
        try {
            const response = await this._restaurantRepository.saveRestaurant(registrationDetails);
            if (typeof response !== 'string' && response.email) {
                return { message: 'Success', restaurant_id: response._id };
            }
            return response;
        } catch (error) {
            console.log('error on restaurant registration service side :', error);
            return { message: (error as Error).message };
        }
    }

    async checkRestaurant(checkRequest: RegistrationCheckDTO): Promise<RegistrationCheckResponseDTO> {
        const { email, mobile } = checkRequest;
        try {
            const response = (await this._restaurantRepository.findRestaurant(email, mobile)) as RestaurantInterface;

            if (response) {
                const documents = Object.values(response.restaurantDocuments).every(value => !value);
                const location = Object.values(response.location).every(value => !value);

                if (documents) {
                    return {
                        message: 'Document is missing please upload',
                        restaurant: response
                    };
                } else if (location) {
                    return {
                        message: 'Please select your location',
                        restaurant: response
                    };
                } else {
                    return {
                        message: 'Restaurant already registered',
                        restaurant: response
                    };
                }
            }
            return { message: 'restaurant not registered' };
        } catch (error) {
            console.log('error on checkRestaurant service side:', error);
            return { message: (error as Error).message };
        }
    }

    async restaurantResendOtp(resendOtpRequest: RegistrationCheckDTO): Promise<RegistrationCheckResponseDTO> {
        const { email, mobile } = resendOtpRequest;
        try {
            const response = (await this._restaurantRepository.findRestaurant(email, mobile)) as RestaurantInterface;

            if (response) {
                const documents = Object.values(response.restaurantDocuments || {}).every(
                    (value) => !value
                );
                const location = Object.values(response.location || {}).every((value) => !value);

                if (documents) {
                    return {
                        message: 'Document is missing please upload',
                        restaurant: response,
                    };
                } else if (location) {
                    return {
                        message: 'Please select your location',
                        restaurant: response,
                    };
                } else {
                    return {
                        message: 'Restaurant already registered',
                        restaurant: response,
                    };
                }
            }

            const otp = this._otpService.generateOTP();
            const otpToken = await this._authService.createToken(otp, '2d', 'Otp');
            await this._nodemailerService.sendMail(
                email,
                'Otp Verification',
                `Hello,\n\nThank you for registering with your Restaurant !, your OTP is ${otp}\n\nHave a nice day!!!`
            );
            console.log('RESEND OTP SENT:', otpToken);
            return { message: 'OTP resent', otpToken };
        } catch (error) {
            console.log('error on restaurantResendOtp service side:', error);
            return { message: (error as Error).message };
        }
    }

    async restaurantDocumentUpdate(documentUpdate: DocumentsDTO): Promise<DocumentsUpdateResponseDTO> {
        try {
            const response = await this._restaurantRepository.restaurantDocumentsUpdate(documentUpdate);
            if (response) {
                return { message: 'Success', restaurantResponse: response };
            } else {
                return { message: 'Something went wrong' };
            }
        } catch (error) {
            console.log('error on restaurantDocumentUpdate service side:', error);
            return { message: (error as Error).message };
        }
    }

    async restaurantLocation(locationUpdate: LocationDTO): Promise<LocationUpdateResponseDTO> {
        try {
            const result = await this._restaurantRepository.restaurantLocationUpdate(locationUpdate);
            if (!result.success) {
                return {
                    success: false,
                    message: result.message || 'Restaurant not found or update failed',
                };
            }
            return {
                success: true,
                message: 'Location updated successfully',
                data: result.data,
            };
        } catch (error) {
            console.log('error on restaurantLocation service side:', error);
            return {
                success: false,
                message: (error as Error).message,
            };
        }
    }

    async resubmitDocuments(resubmissionRequest: ResubDocsDTO): Promise<ResubDocsResponseDTO> {
        try {
            const response = await this._restaurantRepository.resubmitRestaurantDocuments(resubmissionRequest);
            return { message: 'success', response: response };
        } catch (error) {
            console.log('error on resubmitDocuments service side:', error);
            return { message: (error as Error).message };
        }
    }
}