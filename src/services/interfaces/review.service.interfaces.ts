import { ReviewDataDTO } from "../../dto/review/review.dto";

export interface IReviewService {
    addFoodreview(data: ReviewDataDTO): Promise<any>;
    deleteFoodReview(userId: string, orderId: string, itemId: string): Promise<any>;
    getUserReviewForFoodItem(userId: string, orderId: string, itemId: string): Promise<any>;
    getFoodReviews(data: { dishId: string }): Promise<any>
}