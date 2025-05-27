import { ISubscriptionPlanController } from '../interfaces/subscription-plan.controller.interface';
import { ISubscriptionService } from '../../services/interfaces/subscription-plan.service.interface';
import { SubscriptionPlanDTO } from '../../dto/subscription/subscription-plan.dto';
import { PaymentDTO, VerifyPaymentDTO, FailedPaymentDTO } from '../../dto/subscription/payment.dto';

export default class SubscriptionPlanController implements ISubscriptionPlanController {
    private subscriptionService: ISubscriptionService;

    constructor(subscriptionService: ISubscriptionService) {
        this.subscriptionService = subscriptionService;
    }

    async addNewSubscriptionPlan(data: SubscriptionPlanDTO) {
        try {
            const response = await this.subscriptionService.addNewSubscriptionPlan(data);
            return {
                message: 'Subscription Plan Created Successfully',
                data: response,
            };
        } catch (error) {
            console.log('Error in addNewSubscriptionPlan:', error);
            return { error: true, message: (error as Error).message };
        }
    }

    async getAllSubscriptionPlan(data: any) {
        try {
            const response = await this.subscriptionService.getAllSubscriptionPlan(data);
            return response;
        } catch (error) {
            console.log('Error in getAllSubscriptionPlan:', error);
            return {
                message: 'error',
                response: [],
            };
        }
    }


    async editSubscriptionPlan(data: SubscriptionPlanDTO) {
        try {
            const response = await this.subscriptionService.editSubscriptionPlan(data);
            return response;
        } catch (error) {
            console.log('Error in editSubscriptionPlan:', error);
            return { error: true, message: (error as Error).message };
        }
    }

    async deleteSubscriptionPlan(data: { id: string }) {
        try {
            const response = await this.subscriptionService.deleteSubscriptionPlan(data);
            return response;
        } catch (error) {
            console.log('Error in deleteSubscriptionPlan:', error);
            return { error: true, message: (error as Error).message };
        }
    }



    async getAnySubscriptionPlanExist(data: { restaurantId: string | { id: string } }) {
        try {
            const restaurantId = typeof data.restaurantId === 'string' ? data.restaurantId : data.restaurantId.id;
            if (!restaurantId || typeof restaurantId !== 'string') {
                throw new Error('Invalid restaurantId provided');
            }
            const response = await this.subscriptionService.getAnySubscriptionPlanExist({ restaurantId });
            return response;
        } catch (error) {
            console.log('Error in getAnySubscriptionPlanExist:', error);
            throw error;
        }
    }

    async paymentSubscriptionPlan(data: PaymentDTO) {
        try {           
            const response = await this.subscriptionService.paymentForSubscriptionPlan(data);
            return response;
        } catch (error) {
            console.log('Error in paymentSubscriptionPlan:', error);
            return { error: true, message: (error as Error).message };
        }
    }

    async verifyPaymentSubscriptionPlan(data: VerifyPaymentDTO) {
        try {
            const response = await this.subscriptionService.verifyPaymentSubscriptionPlan(data);
            return response;
        } catch (error) {
            console.log('Error in verifyPaymentSubscriptionPlan:', error);
            return { error: true, message: (error as Error).message };
        }
    }

    async handleFailedPayment(data: FailedPaymentDTO) {
        try {
            const response = await this.subscriptionService.handleFailedPayment(data);
            return response;
        } catch (error) {
            console.log('Error in handleFailedPayment:', error);
            return { error: true, message: (error as Error).message };
        }
    }

    async retryPayment(data: { paymentId: string }) {
        try {          
            const response = await this.subscriptionService.retryPayment(data);
            return response;
        } catch (error) {
            console.log('Error in retryPayment:', error);
            return { error: true, message: (error as Error).message };
        }
    }




    async getTheTransactionHistory(data: { restaurantId: string }) {
        try {
            const response = await this.subscriptionService.getTheTransactionHistory(data);
            return response;
        } catch (error) {
            console.log('Error in getTheTransactionHistory:', error);
            return { error: true, message: (error as Error).message };
        }
    }

    async getTheTransactionDetails(data: { transactionId: string }) {
        try {
            const response = await this.subscriptionService.getTheTransactionDetails(data);
            return response;
        } catch (error) {
            console.log('Error in getTheTransactionDetails:', error);
            return { error: true, message: (error as Error).message };
        }
    }

    async getAllRestaurantPayments(data: any) {
        try {
            const response = await this.subscriptionService.getAllRestaurantPayments(data);
            return response;
        } catch (error) {
            console.log('Error in getAllRestaurantPayments:', error);
            return { error: true, message: (error as Error).message };
        }
    }
}