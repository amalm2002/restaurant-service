export interface DeleteFoodReviewDTO {
    userId: string;
    orderId: string;
    itemId: string
}

export interface DeleteFoodReviewResponseDTO {
    success: boolean;
    message: string;
}