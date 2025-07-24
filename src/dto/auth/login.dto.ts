
export interface LoginDTO {
    email: string;
    mobile: number;
}

export interface HandleLoginFuctionDTO {
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

export interface HandleLoginFuctionReturnDataDTO {
    message: string;
    restaurantName: string;
    mobile: number;
    token: string;
    _id: string;
    isOnline: boolean;
    isVerified: boolean;
    refreshToken: string;
    isRejected: boolean;
    restaurant: any;
    role: string;
}

export type LoginCheckRestaurantResponse =
    | HandleLoginFuctionReturnDataDTO
    | { message: string; }
    | { error?: string }