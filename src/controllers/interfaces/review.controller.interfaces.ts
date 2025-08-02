import { ReviewDataDTO } from "../../dto/review/review.dto";

export interface IReviewController {
    addFoodReview(data: ReviewDataDTO): Promise<any>;
    deleteFoodReview(data: { userId: string; orderId: string; itemId: string }): Promise<any>;
    getUserReviewForFoodItem(data: { userId: string; orderId: string; itemId: string }): Promise<any>;
}