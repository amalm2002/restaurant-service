import { ReviewDataDTO, ReviewDataResponseDTO } from "../../dto/review/add-review.dto";
import { IReviewController } from "../interfaces/review.controller.interfaces";
import { IReviewService } from "../../services/interfaces/review.service.interfaces";
import { DeleteFoodReviewDTO, DeleteFoodReviewResponseDTO } from "../../dto/review/delete-review.dto";
import { GetFoodReviewDTO, GetFoodReviewResponseDTO } from "../../dto/review/get-food-review.dto";


export default class ReviewController implements IReviewController {

    constructor(
        private readonly _reviewService: IReviewService
    ) { }

    async addFoodReview(reviewData: ReviewDataDTO): Promise<ReviewDataResponseDTO> {
        try {
            const response = await this._reviewService.addFoodreview(reviewData)
            return response
        } catch (error) {
            console.log('Error in addNewSubscriptionPlan:', error);
            return { error: true, message: (error as Error).message };
        }
    }

    async deleteFoodReview(deleteReviewData: DeleteFoodReviewDTO): Promise<DeleteFoodReviewResponseDTO> {
        return await this._reviewService.deleteFoodReview(deleteReviewData);
    }

    async getUserReviewForFoodItem(userReviewData: DeleteFoodReviewDTO): Promise<ReviewDataResponseDTO> {
        return await this._reviewService.getUserReviewForFoodItem(userReviewData);
    }

    async getFoodReviews(getReviewQuery: GetFoodReviewDTO): Promise<GetFoodReviewResponseDTO> {
        return await this._reviewService.getFoodReviews(getReviewQuery)
    }
}