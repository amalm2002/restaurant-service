import { SubscriptionPlanDTO } from '../../dto/subscription/subscription-plan.dto';
import { PaymentDTO, VerifyPaymentDTO, FailedPaymentDTO } from '../../dto/subscription/payment.dto';

export interface ISubscriptionPlanController {
    addNewSubscriptionPlan(data: SubscriptionPlanDTO): Promise<any>;
    getAllSubscriptionPlan(data: any): Promise<any>;
    getAnySubscriptionPlanExist(data: { restaurantId: string }): Promise<any>;
    editSubscriptionPlan(data: SubscriptionPlanDTO): Promise<any>;
    deleteSubscriptionPlan(data: { id: string }): Promise<any>;
    paymentSubscriptionPlan(data: PaymentDTO): Promise<any>;
    verifyPaymentSubscriptionPlan(data: VerifyPaymentDTO): Promise<any>;
    handleFailedPayment(data: FailedPaymentDTO): Promise<any>;
    retryPayment(data: { paymentId: string }): Promise<any>;
    getTheTransactionHistory(data: { restaurantId: string }): Promise<any>;
    getTheTransactionDetails(data: { transactionId: string }): Promise<any>;
    getAllRestaurantPayments(data: any): Promise<any>;
}