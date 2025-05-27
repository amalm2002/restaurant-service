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