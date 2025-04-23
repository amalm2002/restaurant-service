import { RestaurantInterface } from "../entities/restaurant";
import { Registration } from "../utilities/interface";
import RestaurantRepository from "../repositeries/restaurantRepo";

export default class RegistrationUseCase {
    private restaurantRepo: RestaurantRepository;

    constructor(restaurantRepo: RestaurantRepository) {
        this.restaurantRepo = restaurantRepo;
    }

    register = async (Registration: Registration) => {
        try {
            const { restaurantName, email, mobile } = Registration;

            const newRestaurant = {
                restaurantName,
                email,
                mobile
            };

            const response = await this.restaurantRepo.saveRestaurant(newRestaurant);

            if (typeof response !== 'string' && response.email) {
                return { message: 'Success', restaurant_id: response._id };
            }

            return response;
        } catch (error) {
            console.log('error on restaurant registration useCase side :', error);
            return { message: (error as Error).message };
        }
    };

    checkRestaurant = async (email: string, mobile: number) => {
        try {
            const response = await this.restaurantRepo.findRestauarnt(email, mobile) as RestaurantInterface;

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
            return { message: (error as Error).message };
        }
    };

    restaurantDocumentUpdate = async (restaurantDoc: any) => {
        try {
            const response = await this.restaurantRepo.restaurantDocumentsUpdate(restaurantDoc);
            if (response) {
                return { message: 'Success', restaurntResponse: response };
            } else {
                return { message: 'Something went wrong' };
            }
        } catch (error) {
            return { message: (error as Error).message };
        }
    };

    restaurantLocationUpdation = async (locationData: any) => {
        try {
            const result = await this.restaurantRepo.restaurantLocationUpdate(locationData);

            if (!result.success) {
                return {
                    success: false,
                    message: result.message || 'Restaurant not found or update failed'
                };
            }

            return {
                success: true,
                message: 'Location updated successfully',
                data: result.data
            };
        } catch (error) {
            return {
                success: false,
                message: (error as Error).message
            };
        }
    };

    resubmitDocuments = async (resubmitDocs: any) => {
        try {
            const response = await this.restaurantRepo.resubmitRestaurantDocuments(resubmitDocs);
            return { message: 'success', response: response };
        } catch (error) {
            return { message: (error as Error).message };
        }
    };
}