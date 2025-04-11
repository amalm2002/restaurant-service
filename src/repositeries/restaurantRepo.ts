import Restaurant,{ RestaurantInterface } from '../entities/restaurant'
import { Registration } from '../utilities/interface'
import mongoose from "mongoose";

export default class restaurantRepositery {

    saveRestaurant = async (RestaurantData: Registration): Promise<RestaurantInterface | string> => {
        try {
            const newRestaurant = new Restaurant({
                restaurantName: RestaurantData.restaurantName,
                email: RestaurantData.email,
                mobile: RestaurantData.mobile,
                isOnline: RestaurantData.isOnline,
            })

            const saveRestaurant: RestaurantInterface = await newRestaurant.save() as RestaurantInterface
            return saveRestaurant

        } catch (error) {
            return (error as Error).message
        }
    }

    findRestauarnt = async (email: string, mobile: number): Promise<RestaurantInterface | string> => {
        try {
            const restaurantData: RestaurantInterface = await Restaurant.findOne({ email: email, mobile: mobile }) as RestaurantInterface
            return restaurantData

        } catch (error) {
            return (error as Error).message
        }
    }

    updateOnlineStatus = async (restaurantId: string, isOnline: boolean): Promise<RestaurantInterface | string> => {
        try {
            const restaurant = await Restaurant.findByIdAndUpdate(
                restaurantId,
                { isOnline },
                { new: true }
            ) as RestaurantInterface;

            if (!restaurant) {
                return 'Restaurant not found';
            }

            console.log(`Updated restaurant ${restaurantId} online status to ${isOnline}`);
            return restaurant;
        } catch (error) {
            console.log('Error updating online status in repo:', error);
            return (error as Error).message;
        }
    };

    restaurantDocumentsUpdate = async (restaurantDoc: any) => {
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

            if (response) {
                return { message: "Success", restaurantResponse: response };
            } else {
                return { message: "Something went wrong" };
            }

        } catch (error) {
            console.log('Error update the restaurant documents in repo:', error);
            return (error as Error).message;
        }
    }

    restaurantLocationUpdate = async (restaurantLocation: any) => {
        try {
            const { latitude, longitude, restaurantId } = restaurantLocation;

            if (!restaurantId || restaurantId === 'null' || !mongoose.Types.ObjectId.isValid(restaurantId)) {
                return { success: false, message: "Invalid or missing restaurantId" };
            }

            const response = await Restaurant.findByIdAndUpdate(
                restaurantId,
                {
                    $set: {
                        location: {
                            latitude,
                            longitude
                        }
                    }
                },
                { new: true }
            );

            if (!response) {
                return { success: false, message: "Restaurant not found or update failed" };
            }

            return { success: true, data: response };

        } catch (error) {
            console.log('Error updating location in repository:', error);
            return {
                success: false,
                message: (error as Error).message
            };
        }
    };

    resubmitRestaurantDocuments = async (resubmitDocs: any) => {
        try {
            const response = await Restaurant.findByIdAndUpdate(resubmitDocs.restaurantId,
                {
                    $set: {
                        'restaurantDocuments.idProofUrl': resubmitDocs.idProof,
                        'restaurantDocuments.fssaiLicenseUrl': resubmitDocs.fssaiLicense,
                        'restaurantDocuments.businessCertificateUrl': resubmitDocs.businessCertificate,
                        'restaurantDocuments.bankAccountNumber': resubmitDocs.bankAccountNumber,
                        'restaurantDocuments.ifscCode': resubmitDocs.ifscCode,
                    },
                    $unset: {
                        rejectionReason: '',
                    },
                },
                { new: true }
            );

            return response;
        } catch (error) {
            console.log('Error update the restaurant ressubmit documents in repo:', error);
            return (error as Error).message;
        }
    }

}