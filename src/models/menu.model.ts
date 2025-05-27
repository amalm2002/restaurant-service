import mongoose, { Schema, Document, Types } from 'mongoose';
import { BaseSchemaInterface } from './interfaces/schema.interface';

export interface MenuItemInterface extends BaseSchemaInterface {
    restaurantId: Types.ObjectId;
    name: string;
    description: string;
    category: string;
    price: number;
    quantity: number;
    images: string[];
    hasVariants: boolean;
    variants?: {
        name: string;
        price: number;
        quantity: number;
    }[];
    timing: string;
    isActive: boolean;
}

const menuItemSchema: Schema = new Schema(
    {
        restaurantId: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true },
        name: { type: String, required: true },
        description: { type: String, required: true },
        category: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        images: [{ type: String }],
        hasVariants: { type: Boolean, default: false },
        variants: [
            {
                name: { type: String },
                price: { type: Number },
                quantity: { type: Number },
            },
        ],
        timing: { type: String, required: true },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

export default mongoose.model<MenuItemInterface>('MenuItem', menuItemSchema);