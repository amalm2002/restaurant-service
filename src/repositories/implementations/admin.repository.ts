
// import Restaurant, { RestaurantInterface } from '../../models/restaurant.model';
// import mongoose from 'mongoose';
// import { IAdminRepository } from '../interfaces/admin.repository.interface';

// export default class AdminRepository implements IAdminRepository {
//     async getAllRestaurants(data: any): Promise<RestaurantInterface[] | string> {
//         try {
//             const restaurantData: RestaurantInterface[] = await Restaurant.find({
//                 restaurantDocuments: { $exists: true },
//                 location: { $exists: true },
//             });
//             return restaurantData;
//         } catch (error) {
//             return (error as Error).message;
//         }
//     }

//     async findRestaurantById(restaurantId: string): Promise<RestaurantInterface | string | null> {
//         try {
//             const restaurantData = await Restaurant.findById(restaurantId);
//             return restaurantData;
//         } catch (error) {
//             return (error as Error).message;
//         }
//     }

//     async verifyRestaurantDocuments(restaurantId: string): Promise<RestaurantInterface | string | { message: string }> {
//         try {
//             if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
//                 return { message: 'Invalid restaurant ID' };
//             }

//             const restaurantData = await Restaurant.findByIdAndUpdate(restaurantId, { $set: { isVerified: true } }, { new: true })

//             if (!restaurantData) {
//                 return { message: 'Restaurant not found' };
//             }

//             return restaurantData;
//         } catch (error) {
//             return (error as Error).message;
//         }
//     }

//     async rejectRestaurantDocuments(restaurantId: string, rejectionReason: string): Promise<RestaurantInterface | string | { message: string }> {
//         try {
//             const updatedRestaurant = await Restaurant.findByIdAndUpdate(
//                 restaurantId,
//                 {
//                     rejectionReason: rejectionReason,
//                     isVerified: false,
//                 },
//                 { new: true }
//             );

//             if (!updatedRestaurant) {
//                 return { message: 'Restaurant not found' }
//                 throw new Error("Restaurant not found");
//             }

//             return updatedRestaurant;
//         } catch (error) {
//             return (error as Error).message;
//         }
//     }
// }





import Restaurant, { RestaurantInterface } from '../../models/restaurant.model';
import mongoose from 'mongoose';
import { IAdminRepository } from '../interfaces/admin.repository.interface';
import { BaseRepository } from './base.repository';

export default class AdminRepository extends BaseRepository<RestaurantInterface> implements IAdminRepository {
    constructor() {
        super(Restaurant);
    }

    async getAllRestaurants(data: any): Promise<RestaurantInterface[] | string> {
        try {
            const restaurantData: RestaurantInterface[] = await Restaurant.find({
                restaurantDocuments: { $exists: true },
                location: { $exists: true },
            });
            return restaurantData;
        } catch (error) {
            return (error as Error).message;
        }
    }

    async findRestaurantById(restaurantId: string): Promise<RestaurantInterface | string | null> {
        try {
            const restaurantData = await Restaurant.findById(restaurantId);
            return restaurantData;
        } catch (error) {
            return (error as Error).message;
        }
    }

    async verifyRestaurantDocuments(restaurantId: string): Promise<RestaurantInterface | string | { message: string }> {
        try {
            if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
                return { message: 'Invalid restaurant ID' };
            }

            const restaurantData = await Restaurant.findByIdAndUpdate(restaurantId, { $set: { isVerified: true } }, { new: true });

            if (!restaurantData) {
                return { message: 'Restaurant not found' };
            }

            return restaurantData;
        } catch (error) {
            return (error as Error).message;
        }
    }

    async rejectRestaurantDocuments(restaurantId: string, rejectionReason: string): Promise<RestaurantInterface | string | { message: string }> {
        try {
            const updatedRestaurant = await Restaurant.findByIdAndUpdate(
                restaurantId,
                {
                    rejectionReason: rejectionReason,
                    isVerified: false,
                },
                { new: true }
            );

            if (!updatedRestaurant) {
                return { message: 'Restaurant not found' };
                throw new Error("Restaurant not found");
            }

            return updatedRestaurant;
        } catch (error) {
            return (error as Error).message;
        }
    }
}


