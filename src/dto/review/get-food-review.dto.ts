export interface GetFoodReviewDTO {
    dishId: string;
}

export interface GetFoodReviewResponseDTO {
    success: boolean;
    message?: string
    response?: any
}