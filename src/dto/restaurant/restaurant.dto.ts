
export interface RegistrationDTO {
    restaurantName: string;
    email: string;
    mobile: number;
    isOnline?: boolean;
    otp?: string;
    otpToken?: string;
}

export interface RegistrationResponseDTO {
    _id: string;
    restaurantName: string;
    email: string;
    mobile: number;
    isOnline: boolean;
    isVerified: boolean;
    rejectionReason?: string;
    restaurantDocuments?: {
        idProofUrl: string;
        fssaiLicenseUrl: string;
        businessCertificateUrl: string;
        bankAccountNumber: string;
        ifscCode: string;
    };
    location?: {
        latitude: number;
        longitude: number;
    };
    message?: string;
}

export type RestaurantRegistrationResponseDTO =
    RegistrationResponseDTO
    | { message: string; }
    | {
        message: string;
        restaurant_id: string;
    }
    | { error?: string; }
    | string;


export interface RegistrationCheckDTO {
    email: string;
    mobile: number;
}

export interface RegistrationCheckResponseDTO {
    message?: string;
    restaurant?: RegistrationResponseDTO;
    otpToken?: string;
    error?: string
}