import { SubscriptionPlanControllerResponseDTO, SubscriptionPlanDTO } from '../../dto/subscription/subscription-plan.dto';
import { PaymentDTO, VerifyPaymentDTO, FailedPaymentDTO, PaymentResponseDTO, VerifyPaymentResponseDTO, FailedPaymentResponseDTO, RetryPaymentDTO, RetryPaymentResponseDTO, GetAllRestaurantPaymentsDTO } from '../../dto/subscription/payment.dto';
import { GetAllSubscriptionPlanResponseDTO, GetSubscriptionPlanExitDTO, GetSubscriptionPlanExitResponseDTO } from '../../dto/subscription/get-all-plan.dto';
import { EditSubscriptionPlanResponseDTO } from '../../dto/subscription/edit-subscription-plan.dto';
import { DeleteSubscriptionPlanDTO, DeleteSubscriptionPlanResponseDTO } from '../../dto/subscription/delete-subscription.plan.dto';
import { SubscriptionOrderResponseDTO, TransactionDetailsDTO } from '../../dto/subscription/restaurant-transaction.dto';
import { GetRestaurantDataByIdDTO } from '../../dto/restaurant/get-restaurant-by-id.dto';
import { GetRestaurantChartDataDTO, GetRestaurantChartDataRequestDTO } from '../../dto/restaurant/get-restaurant-chart.dto';

export interface ISubscriptionPlanController {
    addNewSubscriptionPlan(data: SubscriptionPlanDTO): Promise<SubscriptionPlanControllerResponseDTO>;
    getAllSubscriptionPlan(data: void): Promise<GetAllSubscriptionPlanResponseDTO>;
    editSubscriptionPlan(data: SubscriptionPlanDTO): Promise<EditSubscriptionPlanResponseDTO>;
    getAnySubscriptionPlanExist(data: GetSubscriptionPlanExitDTO): Promise<GetSubscriptionPlanExitResponseDTO>;
    deleteSubscriptionPlan(data: DeleteSubscriptionPlanDTO): Promise<DeleteSubscriptionPlanResponseDTO>;
    paymentSubscriptionPlan(data: PaymentDTO): Promise<PaymentResponseDTO>;
    verifyPaymentSubscriptionPlan(data: VerifyPaymentDTO): Promise<VerifyPaymentResponseDTO>;
    handleFailedPayment(data: FailedPaymentDTO): Promise<FailedPaymentResponseDTO>;
    retryPayment(data: RetryPaymentDTO): Promise<RetryPaymentResponseDTO>;
    getTheTransactionHistory(data: GetRestaurantDataByIdDTO): Promise<SubscriptionOrderResponseDTO[] | { error: boolean; message: string }>;
    getTheTransactionDetails(data: TransactionDetailsDTO): Promise<SubscriptionOrderResponseDTO | { error: boolean; message: string }>;
    getAllRestaurantPayments(data: void): Promise<GetAllRestaurantPaymentsDTO>;
    getRestaurantChartData(data: GetRestaurantChartDataRequestDTO): Promise<GetRestaurantChartDataDTO>;
}