import { PaymentInterface } from "../../models/payment.model";

export interface PaymentDTO {
    restaurantId: string;
    subscriptionPlanId?: string;
    amount: string;
    currency?: string;
    isRetry?: boolean;
    planId: string;
}

export interface VerifyPaymentDTO {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
    restaurantId: string;
    planId: string;
}

export interface FailedPaymentDTO {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    error_code: string;
    error_description: string;
    restaurantId: string;
    planId: string;
}

export interface RetryPaymentDTO {
    paymentId: string;
}


export interface PaymentResponseDTO {
    allowed?: boolean;
    message?: string;
    orderId?: string;
    razorpayKey?: string;
    error?: boolean;
}

export interface VerifyPaymentResponseDTO {
    message: string;
    expireAt?: string;
    error?: boolean;
}

export interface FailedPaymentResponseDTO {
    message: string;
    error?: boolean;
}

export interface RetryPaymentResponseDTO {
    orderId?: string;
    razorpayKey?: string;
    error?: boolean;
    message?: string
}

export interface GetAllRestaurantPaymentsDTO {
    message: string;
    response?: PaymentInterface[]
    error?: boolean;
}