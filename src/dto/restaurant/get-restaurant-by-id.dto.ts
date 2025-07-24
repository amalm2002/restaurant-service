export interface GetRestaurantDataByIdDTO {
    restaurantId: string;
}


export interface GetRestaurantDataByIdResponseDTO {
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
    error?: string;
}


export interface GetRestaurantDataByIdControllerResponseDTO {
    success: boolean;
    message?: string;
    data?: GetRestaurantDataByIdResponseDTO;
}

export interface GetRestaurantDataByIdResDTO {
    message?: string;
    response?: GetRestaurantDataByIdResponseDTO | string;
    error?: string;
}