import mongoose, { Schema, Document } from 'mongoose';
import { BaseSchemaInterface } from './interfaces/schema.interface';


export interface ReviewInterface extends BaseSchemaInterface {
    foodId: string;
    userId: string;
    orderId: string;
    rating: number;
    comment?: string;
    userName: string;
}


const reviewSchema: Schema = new Schema(
    {
        foodId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'MenuItem',
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        userName: {
            type: String
        },
        orderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order',
            required: true,
        },
        rating: {
            type: Number,
            min: 1,
            max: 5,
            required: true,
        },
        comment: {
            type: String,
            maxlength: 1000,
        },
    },
    { timestamps: true }
);


export default mongoose.model<ReviewInterface>('Review', reviewSchema);