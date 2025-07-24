import Restaurant, { RestaurantInterface } from '../../models/restaurant.model';
import mongoose from 'mongoose';
import { IRestaurantRepository } from '../interfaces/restaurant.repository.interface';
import { RegistrationDTO } from '../../dto/restaurant/restaurant.dto';
import { DocumentsDTO, ResubDocsDTO } from '../../dto/restaurant/documents.dto';
import { LocationDTO } from '../../dto/restaurant/location.dto';
import { BaseRepository } from './base.repository';

export default class RestaurantRepository extends BaseRepository<RestaurantInterface> implements IRestaurantRepository {
    constructor() {
        super(Restaurant);
    }

    async saveRestaurant(restaurantData: RegistrationDTO): Promise<RestaurantInterface | string> {
        try {
            const newRestaurant = new Restaurant({
                restaurantName: restaurantData.restaurantName,
                email: restaurantData.email,
                mobile: restaurantData.mobile,
                isOnline: restaurantData.isOnline || false,
            });

            const savedRestaurant: RestaurantInterface = await newRestaurant.save();
            return savedRestaurant;
        } catch (error) {
            return (error as Error).message;
        }
    }

    async findRestaurant(email: string, mobile: number): Promise<RestaurantInterface | string> {
        try {
            const restaurantData: RestaurantInterface = await Restaurant.findOne({ email, mobile }) as RestaurantInterface;
            return restaurantData;
        } catch (error) {
            return (error as Error).message;
        }
    }

    async updateOnlineStatus(restaurantId: string, isOnline: boolean): Promise<RestaurantInterface | string> {
        try {
            const restaurant = await Restaurant.findByIdAndUpdate(
                restaurantId,
                { isOnline },
                { new: true }
            );

            if (!restaurant) {
                return 'Restaurant not found';
            }

            return restaurant;
        } catch (error) {
            return (error as Error).message;
        }
    }

    async fetchOnlineStatus(restaurantId: string): Promise<{ isOnline: boolean } | string> {
        try {
            const restaurant = await Restaurant.findById(restaurantId, 'isOnline');
            if (!restaurant) {
                return 'Restaurant not found';
            }
            return { isOnline: restaurant.isOnline };
        } catch (error) {
            return (error as Error).message;
        }
    }

    async restaurantDocumentsUpdate(restaurantDoc: DocumentsDTO): Promise<any> {
        try {
            const response = await Restaurant.findByIdAndUpdate(
                restaurantDoc.restaurant_id,
                {
                    $set: {
                        "restaurantDocuments.idProofUrl": restaurantDoc.idProofUrl,
                        "restaurantDocuments.fssaiLicenseUrl": restaurantDoc.fssaiLicenseUrl,
                        "restaurantDocuments.businessCertificateUrl": restaurantDoc.businessCertificateUrl,
                        "restaurantDocuments.bankAccountNumber": restaurantDoc.bankAccountNumber,
                        "restaurantDocuments.ifscCode": restaurantDoc.ifscCode,
                    }
                },
                { new: true }
            );

            console.log('repos rsponse :', response);

            if (response) {
                return { message: "Success", restaurantResponse: response };
            } else {
                return { message: "Something went wrong" };
            }
        } catch (error) {
            return (error as Error).message;
        }
    }

    async restaurantLocationUpdate(locationData: LocationDTO): Promise<any> {
        try {
            const { latitude, longitude, restaurantId } = locationData;

            if (!restaurantId || !mongoose.Types.ObjectId.isValid(restaurantId)) {
                return { success: false, message: 'Invalid or missing restaurantId' };
            }

            const response = await Restaurant.findByIdAndUpdate(
                restaurantId,
                {
                    $set: {
                        location: {
                            latitude,
                            longitude,
                        },
                    },
                },
                { new: true }
            );

            if (!response) {
                return { success: false, message: 'Restaurant not found or update failed' };
            }

            return { success: true, data: response };
        } catch (error) {
            return {
                success: false,
                message: (error as Error).message,
            };
        }
    }

    async resubmitRestaurantDocuments(resubmitDocs: ResubDocsDTO): Promise<RestaurantInterface | string> {
        try {
            const response = await Restaurant.findByIdAndUpdate(
                resubmitDocs.restaurantId,
                {
                    $set: {
                        "restaurantDocuments.idProofUrl": resubmitDocs.idProof,
                        "restaurantDocuments.fssaiLicenseUrl": resubmitDocs.fssaiLicense,
                        "restaurantDocuments.businessCertificateUrl": resubmitDocs.businessCertificate,
                        "restaurantDocuments.bankAccountNumber": resubmitDocs.bankAccountNumber,
                        "restaurantDocuments.ifscCode": resubmitDocs.ifscCode,
                    },
                    $unset: {
                        rejectionReason: '',
                    }
                },
                { new: true }
            );

            if (!response) {
                return 'Restaurant not found';
            }

            return response;
        } catch (error) {
            return (error as Error).message;
        }
    }

    async getRestaurantDataById(restaurantId: string): Promise<any> {
        try {
            const result = await Restaurant.findById(restaurantId);
            return result;
        } catch (error) {
            return (error as Error).message;
        }
    }
}