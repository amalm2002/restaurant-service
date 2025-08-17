import { ReviewDataDTO, ReviewDataResponseDTO } from "../../dto/review/add-review.dto";
import { IReviewController } from "../interfaces/review.controller.interfaces";
import { IReviewService } from "../../services/interfaces/review.service.interfaces";
import { DeleteFoodReviewDTO, DeleteFoodReviewResponseDTO } from "../../dto/review/delete-review.dto";
import { GetFoodReviewDTO, GetFoodReviewResponseDTO } from "../../dto/review/get-food-review.dto";


export default class ReviewController implements IReviewController {
    private reviewService: IReviewService;

    constructor(reviewService: IReviewService) {
        this.reviewService = reviewService
    }

    async addFoodReview(data: ReviewDataDTO): Promise<ReviewDataResponseDTO> {
        try {
            const response = await this.reviewService.addFoodreview(data)
            return response
        } catch (error) {
            console.log('Error in addNewSubscriptionPlan:', error);
            return { error: true, message: (error as Error).message };
        }
    }

    async deleteFoodReview(data: DeleteFoodReviewDTO): Promise<DeleteFoodReviewResponseDTO> {
        return await this.reviewService.deleteFoodReview(data);
    }

    async getUserReviewForFoodItem(data: DeleteFoodReviewDTO): Promise<ReviewDataResponseDTO> {
        return await this.reviewService.getUserReviewForFoodItem(data);
    }

    async getFoodReviews(data: GetFoodReviewDTO): Promise<GetFoodReviewResponseDTO> {
        return await this.reviewService.getFoodReviews(data)
    }
}