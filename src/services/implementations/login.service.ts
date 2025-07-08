import { ILoginService } from '../interfaces/login.service.interface';
import { IRestaurantRepository } from '../../repositories/interfaces/restaurant.repository.interface';
import { IAuthService } from '../interfaces/auth.service.interface';
import { LoginDTO } from '../../dto/auth/login.dto';
import { RestaurantInterface } from '../../models/restaurant.model';

export default class LoginService implements ILoginService {
    private restaurantRepository: IRestaurantRepository;
    private authService: IAuthService;

    constructor(restaurantRepository: IRestaurantRepository, authService: IAuthService) {
        this.restaurantRepository = restaurantRepository;
        this.authService = authService;
    }

    private async handleLogin(restaurant: RestaurantInterface) {
        const role = 'Restaurant';
        const token = await this.authService.createToken(restaurant._id.toString(), '15m', 'Restaurant');
        const refreshToken = await this.authService.createToken(restaurant._id.toString(), '7d', 'Restaurant');

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

    async loginCheckRestaurant(data: LoginDTO): Promise<any> {
        try {
            const { email, mobile } = data;
            const response = (await this.restaurantRepository.findRestaurant(email, mobile)) as RestaurantInterface;

            if (!response) {
                return { message: 'No restaurant found' };
            }

            const docEntries = Object.entries(response.restaurantDocuments || {});
            const locEntries = Object.entries(response.location || {});

            const incompleteDoc = docEntries.find(([key, value]) => value === undefined || value === null);
            const incompleteLoc = locEntries.find(([key, value]) => value === undefined || value === null);

            if (incompleteDoc || incompleteLoc) {
                return { message: `Restaurant registration is pending ` };
            }

            return this.handleLogin(response);
        } catch (error) {
            console.log('error on restaurant login-service side :', error);
            throw error;
        }
    }

    async updateOnlineStatus(restaurantId: string, isOnline: boolean): Promise<any> {
        try {
            const restaurant = await this.restaurantRepository.updateOnlineStatus(restaurantId, isOnline);
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
            console.log('error on updateOnlineStatus service side:', error);
            throw error;
        }
    }

    async fetchOnlineStatus(restaurantId: string): Promise<any> {
        try {
            const response = await this.restaurantRepository.fetchOnlineStatus(restaurantId);
            return response;
        } catch (error) {
            console.log('error on fetch online status on login service side');
            throw error;
        }
    }

    async getRestaurantDataById(restaurantId: string): Promise<any> {
        try {
            const response =await this.restaurantRepository.getRestaurantDataById(restaurantId)
            return response
        } catch (error) {
             console.log('error on get the restaurnt data by id');
            throw error;
        }
    }
}