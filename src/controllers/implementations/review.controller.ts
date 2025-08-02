import { ReviewDataDTO } from "../../dto/review/review.dto";
import { IReviewController } from "../interfaces/review.controller.interfaces";
import { IReviewService } from "../../services/interfaces/review.service.interfaces";


export default class ReviewController implements IReviewController {
    private reviewService: IReviewService;

    constructor(reviewService: IReviewService) {
        this.reviewService = reviewService
    }

    async addFoodReview(data: ReviewDataDTO): Promise<any> {
        try {
            const response = await this.reviewService.addFoodreview(data)
            return response
        } catch (error) {
            console.log('Error in addNewSubscriptionPlan:', error);
            return { error: true, message: (error as Error).message };
        }
    }

    async deleteFoodReview(data: { userId: string; orderId: string; itemId: string }): Promise<any> {
        return await this.reviewService.deleteFoodReview(data.userId, data.orderId, data.itemId);
    }

    async getUserReviewForFoodItem(data: { userId: string; orderId: string; itemId: string }): Promise<any> {
        return await this.reviewService.getUserReviewForFoodItem(data.userId, data.orderId, data.itemId);
    }
}