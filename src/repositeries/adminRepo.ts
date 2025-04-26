import Restaurant, { RestaurantInterface } from '../entities/restaurant'
import mongoose from "mongoose";

export default class adminRepositery {

  getAllRestaurnt = async (data: any) => {
    try {
      const restaurantData: RestaurantInterface[] = await Restaurant.find({
        restaurantDocuments: { $exists: true },
        location: { $exists: true }
      });
      // console.log(restaurantData,'restttttttttt');
      
      return restaurantData;
    } catch (error) {
      return (error as Error).message;
    }
  };

  findRestaurantById = async (restaurantId: string) => {
    try {
      const restaurantData = await Restaurant.findById(restaurantId)
      return restaurantData
    } catch (error) {
      return (error as Error).message
    }
  }
  
  verifyRestaurantDocuments = async (restaurantId: string) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
        // throw new Error("Invalid restaurant ID");
        return { message: 'Invalid restaurant ID' }
      }

      const restaurantData = await Restaurant.findByIdAndUpdate(restaurantId, { $set: { isVerified: true } }, { new: true })

      return restaurantData
    } catch (error) {
      return (error as Error).message
    }
  }

  rejectRestaurantDocuments = async (restaurantId: string, rejectionReason: string) => {
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
        return { message: 'Restaurant not found' }
        throw new Error("Restaurant not found");
      }

      return updatedRestaurant;
    } catch (error) {
      return (error as Error).message
    }
  }
}