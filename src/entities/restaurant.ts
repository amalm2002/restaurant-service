import mongoose, { Document, Schema, ObjectId } from "mongoose";

export interface RestaurantInterface extends Document {
    _id: ObjectId;
    restaurantName: string;
    email: string;
    mobile: number;
    isOnline: boolean;
    isVerified: boolean;
    rejectionReason:string;
    restaurantDocuments: RestaurntDoc;
    location: Location

}

interface RestaurntDoc {
    idProofUrl: string;
    fssaiLicenseUrl: string;
    businessCertificateUrl: string;
    bankAccountNumber: string;
    ifscCode: string
}

interface Location {
    longitude: number;
    latitude: number;
}

const RestaurantSchema: Schema = new Schema({
    restaurantName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: Number,
        required: true,
        unique: true
    },
    isOnline: {
        type: Boolean,
        default: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    rejectionReason:{
        type:String
    },
    location: {
        longitude: {
            type: Number,
           
        },
        latitude: {
            type: Number,
          
        }
    },
    restaurantDocuments: {
        idProofUrl: {
            type: String
        },
        fssaiLicenseUrl: {
            type: String
        },
        businessCertificateUrl: {
            type: String
        },
        bankAccountNumber: {
            type: String
        },
        ifscCode: {
            type: String
        }
    }
})

const restaurantModel = mongoose.model<RestaurantInterface>('Restaurant', RestaurantSchema)
export default restaurantModel