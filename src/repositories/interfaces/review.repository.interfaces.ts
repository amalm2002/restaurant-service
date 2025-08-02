import { ReviewInterface } from "../../models/review.model";

export interface IReviewRepository {
    addFoodReview(itemId: string, rating: number, comment: string, orderId: string, userId: string, isEdit: boolean, userName: string): Promise<ReviewInterface>;
    deleteFoodReview(userId: string, orderId: string, itemId: string): Promise<void>;
    getUserReviewForFoodItem(userId: string, orderId: string, itemId: string): Promise<ReviewInterface | null>;
    getFoodReview(dishId: string): Promise<ReviewInterface[] | []>
}