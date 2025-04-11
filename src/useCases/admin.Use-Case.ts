import adminRepositery from "../repositeries/adminRepo";
import { RestaurantInterface } from "../entities/restaurant";
import { Registration } from "../utilities/interface";


const adminRepo = new adminRepositery()

export default class adminUseCase {
  
  getAllRestaurantDatas = async (data: any) => {
    try {
      const response = await adminRepo.getAllRestaurnt(data);            
      return { message: 'success', response: response };
    } catch (error) {
      return { message: (error as Error).message };
    }
  };

  findRestaurantUsingId = async (restaurantId: string) => {
    try {
      const response = await adminRepo.findRestaurantById(restaurantId)
      return { message: 'success', response: response }
    } catch (error) {
      return { message: (error as Error).message }
    }

  }

  verifyRestaurantDocuments = async (restaurantId: string) => {
    try {
      const response = await adminRepo.verifyRestaurantDocuments(restaurantId)
      // return {message:'success',response:response}
      return response
    } catch (error) {
      return { message: (error as Error).message }
    }
  }

  rejectedRestaurantDocuments = async (restaurantId: string, rejectionReason: string) => {
    try {
      const response = await adminRepo.rejectRestaurantDocuments(restaurantId, rejectionReason)
      return response
    } catch (error) {
      return { message: (error as Error).message }
    }
  }
}