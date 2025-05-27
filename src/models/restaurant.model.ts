import mongoose, { Schema, Document } from 'mongoose';
import { BaseSchemaInterface } from './interfaces/schema.interface';

export interface RestaurantInterface extends BaseSchemaInterface {
    _id: string;
    restaurantName: string;
    email: string;
    mobile: number;
    isOnline: boolean;
    isVerified: boolean;
    rejectionReason?: string;
    restaurantDocuments: {
        idProofUrl: string;
        fssaiLicenseUrl: string;
        businessCertificateUrl: string;
        bankAccountNumber: string;
        ifscCode: string;
    };
    location: {
        latitude: number;
        longitude: number;
    };
    
}

const restaurantSchema: Schema = new Schema(
    {
        restaurantName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        mobile: { type: Number, required: true, unique: true },
        isOnline: { type: Boolean, default: false },
        isVerified: { type: Boolean, default: false },
        rejectionReason: { type: String },
        restaurantDocuments: {
            idProofUrl: { type: String },
            fssaiLicenseUrl: { type: String },
            businessCertificateUrl: { type: String },
            bankAccountNumber: { type: String },
            ifscCode: { type: String },
        },
        location: {
            latitude: { type: Number },
            longitude: { type: Number },
        },
    },
    { timestamps: true }
);

export default mongoose.model<RestaurantInterface>('Restaurant', restaurantSchema);