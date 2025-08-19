import { ISubscriptionPlanController } from '../interfaces/subscription-plan.controller.interface';
import { ISubscriptionService } from '../../services/interfaces/subscription-plan.service.interface';
import { SubscriptionPlanControllerResponseDTO, SubscriptionPlanDTO } from '../../dto/subscription/subscription-plan.dto';
import { GetAllSubscriptionPlanResponseDTO, GetSubscriptionPlanExitDTO, GetSubscriptionPlanExitResponseDTO } from '../../dto/subscription/get-all-plan.dto';
import { EditSubscriptionPlanResponseDTO } from '../../dto/subscription/edit-subscription-plan.dto';
import { DeleteSubscriptionPlanDTO, DeleteSubscriptionPlanResponseDTO } from '../../dto/subscription/delete-subscription.plan.dto';
import { GetRestaurantDataByIdDTO } from '../../dto/restaurant/get-restaurant-by-id.dto';
import { SubscriptionOrderResponseDTO, TransactionDetailsDTO } from '../../dto/subscription/restaurant-transaction.dto';
import { GetRestaurantChartDataDTO, GetRestaurantChartDataRequestDTO } from '../../dto/restaurant/get-restaurant-chart.dto';
import {
    PaymentDTO,
    VerifyPaymentDTO,
    FailedPaymentDTO,
    PaymentResponseDTO,
    VerifyPaymentResponseDTO,
    FailedPaymentResponseDTO,
    RetryPaymentDTO,
    RetryPaymentResponseDTO,
    GetAllRestaurantPaymentsDTO
} from '../../dto/subscription/payment.dto';

export default class SubscriptionPlanController implements ISubscriptionPlanController {

    constructor(
        private readonly _subscriptionService: ISubscriptionService
    ) { }

    async addNewSubscriptionPlan(data: SubscriptionPlanDTO): Promise<SubscriptionPlanControllerResponseDTO> {
        try {
            const response = await this._subscriptionService.addNewSubscriptionPlan(data);
            return {
                message: 'Subscription Plan Created Successfully',
                data: response,
            };
        } catch (error) {
            console.log('Error in addNewSubscriptionPlan:', error);
            return { error: true, message: (error as Error).message };
        }
    }

    async getAllSubscriptionPlan(data: void): Promise<GetAllSubscriptionPlanResponseDTO> {
        try {
            const response = await this._subscriptionService.getAllSubscriptionPlan(data);
            return response;
        } catch (error) {
            console.log('Error in getAllSubscriptionPlan:', error);
            return {
                message: 'error',
                response: [],
            };
        }
    }

    async editSubscriptionPlan(data: SubscriptionPlanDTO): Promise<EditSubscriptionPlanResponseDTO> {
        try {
            const response = await this._subscriptionService.editSubscriptionPlan(data);
            return response;
        } catch (error) {
            console.log('Error in editSubscriptionPlan:', error);
            return { error: true, message: (error as Error).message };
        }
    }

    async deleteSubscriptionPlan(data: DeleteSubscriptionPlanDTO): Promise<DeleteSubscriptionPlanResponseDTO> {
        try {
            const response = await this._subscriptionService.deleteSubscriptionPlan(data);
            return response;
        } catch (error) {
            console.log('Error in deleteSubscriptionPlan:', error);
            return { error: true, message: (error as Error).message };
        }
    }

    async getAnySubscriptionPlanExist(data: GetSubscriptionPlanExitDTO): Promise<GetSubscriptionPlanExitResponseDTO> {
        try {
            const restaurantId = typeof data.restaurantId === 'string' ? data.restaurantId : data.restaurantId.id;
            if (!restaurantId || typeof restaurantId !== 'string') {
                throw new Error('Invalid restaurantId provided');
            }
            const response = await this._subscriptionService.getAnySubscriptionPlanExist({ restaurantId });
            return response;
        } catch (error) {
            console.log('Error in getAnySubscriptionPlanExist:', error);
            throw error;
        }
    }

    async paymentSubscriptionPlan(data: PaymentDTO): Promise<PaymentResponseDTO> {
        try {
            const response = await this._subscriptionService.paymentForSubscriptionPlan(data);
            return response;
        } catch (error) {
            console.log('Error in paymentSubscriptionPlan:', error);
            return { error: true, message: (error as Error).message };
        }
    }

    async verifyPaymentSubscriptionPlan(data: VerifyPaymentDTO): Promise<VerifyPaymentResponseDTO> {
        try {
            const response = await this._subscriptionService.verifyPaymentSubscriptionPlan(data);
            return response;
        } catch (error) {
            console.log('Error in verifyPaymentSubscriptionPlan:', error);
            return { error: true, message: (error as Error).message };
        }
    }

    async handleFailedPayment(data: FailedPaymentDTO): Promise<FailedPaymentResponseDTO> {
        try {
            const response = await this._subscriptionService.handleFailedPayment(data);
            return response;
        } catch (error) {
            console.log('Error in handleFailedPayment:', error);
            return { error: true, message: (error as Error).message };
        }
    }

    async retryPayment(data: RetryPaymentDTO): Promise<RetryPaymentResponseDTO> {
        try {
            const response = await this._subscriptionService.retryPayment(data);
            return response;
        } catch (error) {
            console.log('Error in retryPayment:', error);
            return { error: true, message: (error as Error).message };
        }
    }

    async getTheTransactionHistory(data: GetRestaurantDataByIdDTO): Promise<SubscriptionOrderResponseDTO[] | { error: boolean; message: string }> {
        try {
            const response = await this._subscriptionService.getTheTransactionHistory(data);
            return response;
        } catch (error) {
            console.log('Error in getTheTransactionHistory:', error);
            return { error: true, message: (error as Error).message };
        }
    }

    async getTheTransactionDetails(data: TransactionDetailsDTO): Promise<SubscriptionOrderResponseDTO | { error: boolean; message: string }> {
        try {
            const response = await this._subscriptionService.getTheTransactionDetails(data);
            return response;
        } catch (error) {
            console.log('Error in getTheTransactionDetails:', error);
            return { error: true, message: (error as Error).message };
        }
    }

    async getAllRestaurantPayments(data: void): Promise<GetAllRestaurantPaymentsDTO> {
        try {
            const response = await this._subscriptionService.getAllRestaurantPayments(data);
            return response;
        } catch (error) {
            console.log('Error in getAllRestaurantPayments:', error);
            return { error: true, message: (error as Error).message };
        }
    }

    async getRestaurantChartData(data: GetRestaurantChartDataRequestDTO): Promise<GetRestaurantChartDataDTO> {
        try {
            const response = await this._subscriptionService.getRestaurantChartData(data);
            return response;
        } catch (error) {
            console.log('Error in getRestaurantChartData:', error);
            return { error: true, message: (error as Error).message };
        }
    }
}