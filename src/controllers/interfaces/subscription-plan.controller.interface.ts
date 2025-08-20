import { SubscriptionPlanControllerResponseDTO, SubscriptionPlanDTO } from '../../dto/subscription/subscription-plan.dto';
import { PaymentDTO, VerifyPaymentDTO, FailedPaymentDTO, PaymentResponseDTO, VerifyPaymentResponseDTO, FailedPaymentResponseDTO, RetryPaymentDTO, RetryPaymentResponseDTO, GetAllRestaurantPaymentsDTO } from '../../dto/subscription/payment.dto';
import { GetAllSubscriptionPlanResponseDTO, GetSubscriptionPlanExitDTO, GetSubscriptionPlanExitResponseDTO } from '../../dto/subscription/get-all-plan.dto';
import { EditSubscriptionPlanResponseDTO } from '../../dto/subscription/edit-subscription-plan.dto';
import { DeleteSubscriptionPlanDTO, DeleteSubscriptionPlanResponseDTO } from '../../dto/subscription/delete-subscription.plan.dto';
import { SubscriptionOrderResponseDTO, TransactionDetailsDTO } from '../../dto/subscription/restaurant-transaction.dto';
import { GetRestaurantDataByIdDTO } from '../../dto/restaurant/get-restaurant-by-id.dto';
import { GetRestaurantChartDataDTO, GetRestaurantChartDataRequestDTO } from '../../dto/restaurant/get-restaurant-chart.dto';

export interface ISubscriptionPlanController {
    addNewSubscriptionPlan(subscriptionPlanData: SubscriptionPlanDTO): Promise<SubscriptionPlanControllerResponseDTO>;
    getAllSubscriptionPlan(data: void): Promise<GetAllSubscriptionPlanResponseDTO>;
    editSubscriptionPlan(updatedSubscriptionPlanData: SubscriptionPlanDTO): Promise<EditSubscriptionPlanResponseDTO>;
    getAnySubscriptionPlanExist(subscriptionPlanExistQuery: GetSubscriptionPlanExitDTO): Promise<GetSubscriptionPlanExitResponseDTO>;
    deleteSubscriptionPlan(deleteSubscriptionPlanData: DeleteSubscriptionPlanDTO): Promise<DeleteSubscriptionPlanResponseDTO>;
    paymentSubscriptionPlan(paymentData: PaymentDTO): Promise<PaymentResponseDTO>;
    verifyPaymentSubscriptionPlan(verifyPaymentData: VerifyPaymentDTO): Promise<VerifyPaymentResponseDTO>;
    handleFailedPayment(failedPaymentData: FailedPaymentDTO): Promise<FailedPaymentResponseDTO>;
    retryPayment(retryPaymentData: RetryPaymentDTO): Promise<RetryPaymentResponseDTO>;
    getTheTransactionHistory(restaurantTransactionQuery: GetRestaurantDataByIdDTO): Promise<SubscriptionOrderResponseDTO[] | { error: boolean; message: string }>;
    getTheTransactionDetails(transactionDetailsQuery: TransactionDetailsDTO): Promise<SubscriptionOrderResponseDTO | { error: boolean; message: string }>;
    getAllRestaurantPayments(data: void): Promise<GetAllRestaurantPaymentsDTO>;
    getRestaurantChartData(chartRequest: GetRestaurantChartDataRequestDTO): Promise<GetRestaurantChartDataDTO>;
}