export interface SubscriptionOrderResponseDTO {
    restaurantId: any;
    subscriptionPlanId: any;
    amount: number;
    currency: string;
    razorpayOrderId: string;
    razorpayPaymentId?: string;
    razorpaySignature?: string;
    status: 'pending' | 'paid' | 'failed' | 'created';
    expireAt?: Date;
    isActive: boolean;
    failureReason?: string;
}


export interface TransactionDetailsDTO {
    transactionId: string;
}