
import mongoose, { Document, Schema, ObjectId } from "mongoose";

export interface SubscriptionPlanInterface extends Document {
  _id: ObjectId;
  name: string;
  price: number; 
  period: string; 
  description: string;
  features: string[]; 
  popular: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SubscriptionPlanSchema = new Schema<SubscriptionPlanInterface>({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  period: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  features: {
    type: [String],
    default: []
  },
  popular: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

const subscriptionPlanModel = mongoose.model<SubscriptionPlanInterface>('SubscriptionPlan', SubscriptionPlanSchema);
export default subscriptionPlanModel;
