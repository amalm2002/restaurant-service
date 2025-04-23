import RestaurantRepository from "../repositeries/restaurantRepo";
import { RestaurantInterface } from '../entities/restaurant';
import { AuthService } from "../services/auth";

export class LoginUseCase {
    private restaurantRepo: RestaurantRepository;
    private auth: AuthService;

    constructor(restaurantRepo: RestaurantRepository, authService: AuthService) {
        this.restaurantRepo = restaurantRepo;
        this.auth = authService;
    }

    private async handleLogin(restaurant: RestaurantInterface) {
        const role = 'Restaurant';
        const token = await this.auth.createToken(restaurant._id.toString(), '15m', 'Restaurant');
        const refreshToken = await this.auth.createToken(restaurant._id.toString(), '7d', 'Restaurant');

        const isRejected = restaurant.rejectionReason ? true : false;

        return {
            message: 'Success',
            restaurantName: restaurant.restaurantName,
            mobile: restaurant.mobile,
            token: token,
            _id: restaurant._id,
            isOnline: restaurant.isOnline,
            isVerified: restaurant.isVerified,
            refreshToken: refreshToken,
            isRejected: isRejected,
            restaurant: restaurant,
            role: role
        };
    }

    loginCheckRestaurant = async (email: string, mobile: number) => {
        try {
            const response = await this.restaurantRepo.findRestauarnt(email, mobile) as RestaurantInterface;

            // if (response === null) {
            //     return { message: 'No restaurant found' };
            // } else {
            //     return this.handleLogin(response);
            // }

            if (!response) {
                return { message: 'No restaurant found' };
            }
            
            const docEntries = Object.entries(response.restaurantDocuments || {});
            const locEntries = Object.entries(response.location || {});
    
            const incompleteDoc = docEntries.find(([key, value]) => value === undefined || value === null);
            const incompleteLoc = locEntries.find(([key, value]) => value === undefined || value === null);
    
            if (incompleteDoc||incompleteLoc) {
                return { message: `Restaurant registration is pending ` };
            }
    
           
            return this.handleLogin(response);

        } catch (error) {
            console.log('error on restaurant login-use-case side :', error);
            throw error;
        }
    };

    updateOnlineStatus = async (restaurantId: string, isOnline: boolean) => {
        try {
            const restaurant = await this.restaurantRepo.updateOnlineStatus(restaurantId, isOnline);
            if (typeof restaurant === 'string') {
                return { message: 'Failed to update online status', error: restaurant };
            }
            if (!restaurant) {
                return { message: 'Restaurant not found' };
            }
            return {
                message: 'Online status updated successfully',
                restaurantId: restaurant._id,
                isOnline: restaurant.isOnline,
            };
        } catch (error) {
            console.log('error on updateOnlineStatus use-case side:', error);
            throw error;
        }
    };

    fetchOnlineStatus=async (restaurantId:string) => {
        try {
            const response =await this.restaurantRepo.fetchOnlineStatus(restaurantId)
            return response
        } catch (error) {
            console.log('error on fetch online status on login use-case side');
            throw error
        }
    }
}

export default LoginUseCase;