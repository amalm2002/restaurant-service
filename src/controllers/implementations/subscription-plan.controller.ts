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

    async addNewSubscriptionPlan(subscriptionPlanData: SubscriptionPlanDTO): Promise<SubscriptionPlanControllerResponseDTO> {
        try {
            const response = await this._subscriptionService.addNewSubscriptionPlan(subscriptionPlanData);
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

    async editSubscriptionPlan(updatedSubscriptionPlanData: SubscriptionPlanDTO): Promise<EditSubscriptionPlanResponseDTO> {
        try {
            const response = await this._subscriptionService.editSubscriptionPlan(updatedSubscriptionPlanData);
            return response;
        } catch (error) {
            console.log('Error in editSubscriptionPlan:', error);
            return { error: true, message: (error as Error).message };
        }
    }

    async deleteSubscriptionPlan(deleteSubscriptionPlanData: DeleteSubscriptionPlanDTO): Promise<DeleteSubscriptionPlanResponseDTO> {
        try {
            const response = await this._subscriptionService.deleteSubscriptionPlan(deleteSubscriptionPlanData);
            return response;
        } catch (error) {
            console.log('Error in deleteSubscriptionPlan:', error);
            return { error: true, message: (error as Error).message };
        }
    }

    async getAnySubscriptionPlanExist(subscriptionPlanExistQuery: GetSubscriptionPlanExitDTO): Promise<GetSubscriptionPlanExitResponseDTO> {
        try {
            const restaurantId = typeof subscriptionPlanExistQuery.restaurantId === 'string' ?
                subscriptionPlanExistQuery.restaurantId : subscriptionPlanExistQuery.restaurantId.id;
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

    async paymentSubscriptionPlan(paymentData: PaymentDTO): Promise<PaymentResponseDTO> {
        try {
            const response = await this._subscriptionService.paymentForSubscriptionPlan(paymentData);
            return response;
        } catch (error) {
            console.log('Error in paymentSubscriptionPlan:', error);
            return { error: true, message: (error as Error).message };
        }
    }

    async verifyPaymentSubscriptionPlan(verifyPaymentData: VerifyPaymentDTO): Promise<VerifyPaymentResponseDTO> {
        try {
            const response = await this._subscriptionService.verifyPaymentSubscriptionPlan(verifyPaymentData);
            return response;
        } catch (error) {
            console.log('Error in verifyPaymentSubscriptionPlan:', error);
            return { error: true, message: (error as Error).message };
        }
    }

    async handleFailedPayment(failedPaymentData: FailedPaymentDTO): Promise<FailedPaymentResponseDTO> {
        try {
            const response = await this._subscriptionService.handleFailedPayment(failedPaymentData);
            return response;
        } catch (error) {
            console.log('Error in handleFailedPayment:', error);
            return { error: true, message: (error as Error).message };
        }
    }

    async retryPayment(retryPaymentData: RetryPaymentDTO): Promise<RetryPaymentResponseDTO> {
        try {
            const response = await this._subscriptionService.retryPayment(retryPaymentData);
            return response;
        } catch (error) {
            console.log('Error in retryPayment:', error);
            return { error: true, message: (error as Error).message };
        }
    }

    async getTheTransactionHistory(restaurantTransactionQuery: GetRestaurantDataByIdDTO): Promise<SubscriptionOrderResponseDTO[] | { error: boolean; message: string }> {
        try {
            const response = await this._subscriptionService.getTheTransactionHistory(restaurantTransactionQuery);
            return response;
        } catch (error) {
            console.log('Error in getTheTransactionHistory:', error);
            return { error: true, message: (error as Error).message };
        }
    }

    async getTheTransactionDetails(transactionDetailsQuery: TransactionDetailsDTO): Promise<SubscriptionOrderResponseDTO | { error: boolean; message: string }> {
        try {
            const response = await this._subscriptionService.getTheTransactionDetails(transactionDetailsQuery);
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

    async getRestaurantChartData(chartRequest: GetRestaurantChartDataRequestDTO): Promise<GetRestaurantChartDataDTO> {
        try {
            const response = await this._subscriptionService.getRestaurantChartData(chartRequest);
            return response;
        } catch (error) {
            console.log('Error in getRestaurantChartData:', error);
            return { error: true, message: (error as Error).message };
        }
    }
}