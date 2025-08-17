import { ReviewDataDTO, ReviewDataResponseDTO } from "../../dto/review/add-review.dto";
import { DeleteFoodReviewDTO, DeleteFoodReviewResponseDTO } from "../../dto/review/delete-review.dto";
import { GetFoodReviewDTO, GetFoodReviewResponseDTO } from "../../dto/review/get-food-review.dto";

export interface IReviewService {
    addFoodreview(data: ReviewDataDTO): Promise<ReviewDataResponseDTO>;
    deleteFoodReview(data:DeleteFoodReviewDTO): Promise<DeleteFoodReviewResponseDTO>;
    getUserReviewForFoodItem(data:DeleteFoodReviewDTO): Promise<ReviewDataResponseDTO>;
    getFoodReviews(data: GetFoodReviewDTO): Promise<GetFoodReviewResponseDTO>
}