import restaurantRepositery from "../repositeries/restaurantRepo";
import { RestaurantInterface } from '../entities/restaurant'
import { AuthService } from "../services/auth";

// const restaurantRepo = new restaurantRepositery()

export default class loginUseCase {

    private restaurantRepo: restaurantRepositery;
    private auth: AuthService

    constructor(restaurantRepo: restaurantRepositery, authService: AuthService) {
        this.restaurantRepo = restaurantRepo
        this.auth = authService
    }

    private async handleLogin(restaurant: RestaurantInterface) {

        const token = await this.auth.createToken(restaurant._id.toString(), '15m')
        const refreshToken = await this.auth.createToken(restaurant._id.toString(), '7d')

        const isRejected = restaurant.rejectionReason ? true : false

        return {
            message: 'Success',
            restaurantName: restaurant.restaurantName,
            mobile: restaurant.mobile,
            token: token,
            _id: restaurant._id,
            isOnline: restaurant.isOnline,
            isVerified: restaurant.isVerified,
            refreshToken: refreshToken,
            isRejected:isRejected,
            restaurant:restaurant
        }
    }

    loginCheckRestaurant = async (email: string, mobile: number) => {
        try {
            const response = await this.restaurantRepo.findRestauarnt(email, mobile) as RestaurantInterface
            if (response === null) {
                return { message: 'No restaurant found' }
            } else {
                return this.handleLogin(response)
            }


        } catch (error) {
            console.log('error on restaurant login-use-case side :', error);

        }
    }

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
}