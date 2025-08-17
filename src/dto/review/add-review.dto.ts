export interface ReviewDataDTO {
    itemId: string;
    rating: number;
    comment: string;
    orderId: string;
    userId: string;
    userName: string;
    isEdit: false
}

export interface ReviewDataResponseDTO {
    success?: boolean;
    message: string;
    data?: any;
    error?: boolean;
}
