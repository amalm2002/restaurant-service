import { PaymentInterface } from '../../models/payment.model';
import { PaymentDTO, VerifyPaymentDTO, FailedPaymentDTO } from '../../dto/subscription/payment.dto';

export interface ITransactionRepository {
    createPayment(data: PaymentDTO & { razorpayOrderId: string }): Promise<PaymentInterface>;
    verifyPayment(data: VerifyPaymentDTO & { expireAt: string }): Promise<PaymentInterface | null>;
    updateFailedPayment(data: FailedPaymentDTO): Promise<PaymentInterface | null>;
    findPaymentById(paymentId: string): Promise<PaymentInterface | null>;
    updatePaymentOrderId(data: { paymentId: string; razorpayOrderId: string }): Promise<PaymentInterface | null>;
    findExistPlan(data: { id: string }): Promise<{ allowed: boolean; message?: string; expireAt?: Date }>;
    getTransactionHistory(restaurantId: string): Promise<PaymentInterface[]>;
    getTheTransactionDetails(transactionId: string): Promise<PaymentInterface | null>;
    getAllRestaurantPayments(data: any): Promise<PaymentInterface[]>;
}