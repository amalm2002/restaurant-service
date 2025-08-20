import { ReviewDataDTO, ReviewDataResponseDTO } from "../../dto/review/add-review.dto";
import { DeleteFoodReviewDTO, DeleteFoodReviewResponseDTO } from "../../dto/review/delete-review.dto";
import { GetFoodReviewDTO, GetFoodReviewResponseDTO } from "../../dto/review/get-food-review.dto";

export interface IReviewController {
    addFoodReview(reviewData: ReviewDataDTO): Promise<ReviewDataResponseDTO>;
    deleteFoodReview(deleteReviewData: DeleteFoodReviewDTO): Promise<DeleteFoodReviewResponseDTO>;
    getUserReviewForFoodItem(userReviewData: DeleteFoodReviewDTO): Promise<ReviewDataResponseDTO>;
    getFoodReviews(getReviewQuery: GetFoodReviewDTO): Promise<GetFoodReviewResponseDTO>
}