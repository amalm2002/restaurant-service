
import mongoose, { Schema, Document, Types } from 'mongoose';
import { BaseSchemaInterface } from './interfaces/schema.interface';

export interface PaymentInterface extends BaseSchemaInterface {
    restaurantId: Types.ObjectId;
    subscriptionPlanId: Types.ObjectId;
    amount: number;
    currency: string;
    razorpayOrderId: string;
    razorpayPaymentId?: string;
    razorpaySignature?: string;
    status: 'pending' | 'paid' | 'failed';
    expireAt?: Date;
    isActive: boolean;
    failureReason?: string;
}

const paymentSchema: Schema = new Schema(
    {
        restaurantId: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true },
        subscriptionPlanId: { type: Schema.Types.ObjectId, ref: 'SubscriptionPlan', required: true },
        amount: { type: Number, required: true },
        currency: { type: String, default: "INR" },
        razorpayOrderId: { type: String, required: true },
        razorpayPaymentId: { type: String },
        razorpaySignature: { type: String },
        status: { type: String, enum: ['created', 'paid', 'failed'], default: 'created' },
        expireAt: { type: Date },
        failureReason: { type: String },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

export default mongoose.model<PaymentInterface>('Payment', paymentSchema);