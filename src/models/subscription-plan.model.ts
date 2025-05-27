import mongoose, { Schema, Document } from 'mongoose';
import { BaseSchemaInterface } from './interfaces/schema.interface';

export interface SubscriptionPlanInterface extends BaseSchemaInterface {
    name: string;
    price: string;
    period: string;
    description: string;
    features: string[];
    popular: boolean;
}

const subscriptionPlanSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        price: { type: String, required: true },
        period: { type: String, required: true },
        description: { type: String, required: true },
        features: [{ type: String, required: true }],
        popular: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export default mongoose.model<SubscriptionPlanInterface>('SubscriptionPlan', subscriptionPlanSchema);