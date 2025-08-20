import { SubscriptionPlanDTO, SubscriptionPlanResponseDTO } from '../../dto/subscription/subscription-plan.dto';
import { PaymentDTO, VerifyPaymentDTO, FailedPaymentDTO, PaymentResponseDTO, VerifyPaymentResponseDTO, FailedPaymentResponseDTO, RetryPaymentDTO, RetryPaymentResponseDTO, GetAllRestaurantPaymentsDTO } from '../../dto/subscription/payment.dto';
import { GetAllSubscriptionPlanResponseDTO, GetSubscriptionPlanExitDTO, GetSubscriptionPlanExitResponseDTO } from '../../dto/subscription/get-all-plan.dto';
import { EditSubscriptionPlanResponseDTO } from '../../dto/subscription/edit-subscription-plan.dto';
import { DeleteSubscriptionPlanDTO, DeleteSubscriptionPlanResponseDTO } from '../../dto/subscription/delete-subscription.plan.dto';
import { GetRestaurantDataByIdDTO } from '../../dto/restaurant/get-restaurant-by-id.dto';
import { SubscriptionOrderResponseDTO, TransactionDetailsDTO } from '../../dto/subscription/restaurant-transaction.dto';
import { GetRestaurantChartDataDTO, GetRestaurantChartDataRequestDTO } from '../../dto/restaurant/get-restaurant-chart.dto';

export interface ISubscriptionService {
    addNewSubscriptionPlan(subscriptionPlanData: SubscriptionPlanDTO): Promise<SubscriptionPlanResponseDTO>;
    getAllSubscriptionPlan(data: void): Promise<GetAllSubscriptionPlanResponseDTO>;
    editSubscriptionPlan(updatedSubscriptionPlanData: SubscriptionPlanDTO): Promise<EditSubscriptionPlanResponseDTO>;
    getAnySubscriptionPlanExist(subscriptionPlanExistQuery: GetSubscriptionPlanExitDTO): Promise<GetSubscriptionPlanExitResponseDTO>;
    deleteSubscriptionPlan(deleteSubscriptionPlanData: DeleteSubscriptionPlanDTO): Promise<DeleteSubscriptionPlanResponseDTO>;
    paymentForSubscriptionPlan(paymentData: PaymentDTO): Promise<PaymentResponseDTO>;
    verifyPaymentSubscriptionPlan(verifyPaymentData: VerifyPaymentDTO): Promise<VerifyPaymentResponseDTO>;
    handleFailedPayment(failedPaymentData: FailedPaymentDTO): Promise<FailedPaymentResponseDTO>;
    retryPayment(retryPaymentData: RetryPaymentDTO): Promise<RetryPaymentResponseDTO>;
    getTheTransactionHistory(restaurantTransactionQuery: GetRestaurantDataByIdDTO): Promise<SubscriptionOrderResponseDTO[]>;
    getTheTransactionDetails(transactionDetailsQuery: TransactionDetailsDTO): Promise<SubscriptionOrderResponseDTO>;
    getAllRestaurantPayments(data: void): Promise<GetAllRestaurantPaymentsDTO>;
    getRestaurantChartData(chartRequest: GetRestaurantChartDataRequestDTO): Promise<GetRestaurantChartDataDTO>;
}