import { LoginUseCase } from '../useCases/login.Use-Case';

export default class LoginController {
    private loginUseCase: LoginUseCase;

    constructor(loginUseCase: LoginUseCase) {
        this.loginUseCase = loginUseCase;
    }

    checkLoginRestaurant = async (data: { email: string, mobile: number }) => {
        try {
            const { email, mobile } = data;
            const response = await this.loginUseCase.loginCheckRestaurant(email, mobile);
            return response;
        } catch (error) {
            return { error: (error as Error).message };
        }
    };

    updateOnlineStatus = async (data: { restaurant_id: string; isOnline: boolean }) => {
        try {
            const { restaurant_id, isOnline } = data;
            const response = await this.loginUseCase.updateOnlineStatus(restaurant_id, isOnline);
            return response;
        } catch (error) {
            return { error: (error as Error).message };
        }
    };

    fetchOnlineStatus=async (restaurantId:string) => {
        try {
            const response=await this.loginUseCase.fetchOnlineStatus(restaurantId)
            return response
            
        } catch (error) {
           return {error:(error as Error).message}   
        }
    }
}