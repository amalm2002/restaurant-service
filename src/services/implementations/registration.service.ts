import { IRegistrationService } from '../interfaces/registration.service.interface';
import { IRestaurantRepository } from '../../repositories/interfaces/restaurant.repository.interface';
import { IOtpService } from '../interfaces/otp.service.interface';
import { INodemailerService } from '../interfaces/nodemailer.service.interface';
import { RegistrationDTO, RegistrationCheckDTO } from '../../dto/restaurant/restaurant.dto';
import { DocumentsDTO, ResubDocsDTO } from '../../dto/restaurant/documents.dto';
import { LocationDTO } from '../../dto/restaurant/location.dto';
import { IAuthService } from '../interfaces/auth.service.interface';
import { RestaurantInterface } from '../../models/restaurant.model';

export default class RegistrationService implements IRegistrationService {
    private restaurantRepository: IRestaurantRepository;
    private otpService: IOtpService;
    private nodemailerService: INodemailerService;
    private authService: IAuthService;

    constructor(
        restaurantRepository: IRestaurantRepository,
        otpService: IOtpService,
        nodemailerService: INodemailerService,
        authService: IAuthService
    ) {
        this.restaurantRepository = restaurantRepository;
        this.otpService = otpService;
        this.nodemailerService = nodemailerService;
        this.authService = authService;
    }

    async register(data: RegistrationDTO) {
        try {
            const response = await this.restaurantRepository.saveRestaurant(data);
            if (typeof response !== 'string' && response.email) {
                return { message: 'Success', restaurant_id: response._id };
            }
            return response;
        } catch (error) {
            console.log('error on restaurant registration service side :', error);
            return { message: (error as Error).message };
        }
    }

    async checkRestaurant(data: RegistrationCheckDTO) {
        const { email, mobile } = data;
        try {
            const response = (await this.restaurantRepository.findRestaurant(email, mobile)) as RestaurantInterface;

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

    async restaurantResendOtp(data: RegistrationCheckDTO) {
        const { email, mobile } = data;
        try {
            const response = (await this.restaurantRepository.findRestaurant(email, mobile)) as RestaurantInterface;

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

            const otp = this.otpService.generateOTP();
            const otpToken = await this.authService.createToken(otp, '2d', 'Otp');
            await this.nodemailerService.sendMail(
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

    async restaurantDocumentUpdate(data: DocumentsDTO) {
        try {
            const response = await this.restaurantRepository.restaurantDocumentsUpdate(data);
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

    async restaurantLocation(data: LocationDTO) {
        try {
            const result = await this.restaurantRepository.restaurantLocationUpdate(data);
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

    async resubmitDocuments(data: ResubDocsDTO) {
        try {
            const response = await this.restaurantRepository.resubmitRestaurantDocuments(data);
            return { message: 'success', response: response };
        } catch (error) {
            console.log('error on resubmitDocuments service side:', error);
            return { message: (error as Error).message };
        }
    }
}