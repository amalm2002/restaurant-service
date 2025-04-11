import mongoose, { Document, Schema, ObjectId } from "mongoose";

export interface Variant {
    _id?: ObjectId;
    name: string;
    price: number;
}

export interface MenuItemInterface extends Document {
    _id: ObjectId;
    restaurantId: ObjectId;
    name: string;
    description: string;
    category: 'veg' | 'non-veg' | 'drinks';
    price: number;
    quantity: number;
    images: string[];
    hasVariants: boolean;
    variants: Variant[];
    timing?: 'daily' | 'afternoon' | 'evening';
    createdAt: Date;
    updatedAt: Date;
}


const VariantSchema = new Schema<Variant>({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}, { _id: true });

const MenuItemSchema = new Schema<MenuItemInterface>({
    restaurantId: {
        type: Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    category: {
        type: String,
        enum: ['veg', 'non-veg', 'drinks'],
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    images: {
        type: [String],
        default: []
    },
    hasVariants: {
        type: Boolean,
        default: false
    },
    variants: {
        type: [VariantSchema],
        default: []
    },
    timing: {
        type: String,
        enum: ['daily', 'afternoon', 'evening']
    }
}, { timestamps: true });

const menuItemModel = mongoose.model<MenuItemInterface>('MenuItem', MenuItemSchema);
export default menuItemModel;
