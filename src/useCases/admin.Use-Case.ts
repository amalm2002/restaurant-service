import AdminRepository from "../repositeries/adminRepo";

export default class AdminUseCase {
    private adminRepo: AdminRepository;

    constructor(adminRepo: AdminRepository) {
        this.adminRepo = adminRepo;
    }

    getAllRestaurantDatas = async (data: any) => {
        try {
            const response = await this.adminRepo.getAllRestaurnt(data);
            return { message: 'success', response: response };
        } catch (error) {
            return { message: (error as Error).message };
        }
    };

    findRestaurantUsingId = async (restaurantId: string) => {
        try {
            const response = await this.adminRepo.findRestaurantById(restaurantId);
            return { message: 'success', response: response };
        } catch (error) {
            return { message: (error as Error).message };
        }
    };

    verifyRestaurantDocuments = async (restaurantId: string) => {
        try {
            const response = await this.adminRepo.verifyRestaurantDocuments(restaurantId);
            return response;
        } catch (error) {
            return { message: (error as Error).message };
        }
    };

    rejectedRestaurantDocuments = async (restaurantId: string, rejectionReason: string) => {
        try {
            const response = await this.adminRepo.rejectRestaurantDocuments(restaurantId, rejectionReason);
            return response;
        } catch (error) {
            return { message: (error as Error).message };
        }
    };
}