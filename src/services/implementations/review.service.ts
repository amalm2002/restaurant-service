import { ReviewDataDTO, ReviewDataResponseDTO } from "../../dto/review/add-review.dto";
import { IReviewService } from "../interfaces/review.service.interfaces";
import { IReviewRepository } from "../../repositories/interfaces/review.repository.interfaces";
import { DeleteFoodReviewDTO, DeleteFoodReviewResponseDTO } from "../../dto/review/delete-review.dto";
import { GetFoodReviewDTO, GetFoodReviewResponseDTO } from "../../dto/review/get-food-review.dto";

export default class ReviewService implements IReviewService {
    private reviewRepository: IReviewRepository;

    constructor(reviewRepository: IReviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    async addFoodreview(data: ReviewDataDTO): Promise<ReviewDataResponseDTO> {
        try {
            const { itemId, rating, comment, orderId, userId, isEdit, userName } = data;

            if (rating < 1 || rating > 5) {
                return { success: false, message: 'Rating must be between 1 and 5' };
            }

            const review = await this.reviewRepository.addFoodReview(itemId, rating, comment, orderId, userId, isEdit, userName);

            return {
                success: true,
                message: isEdit ? 'Review updated successfully' : 'Review added successfully',
                data: { review },
            };
        } catch (error) {
            console.error('Error in addFoodreview:', error);
            return { success: false, message: (error as Error).message || 'Failed to process review' };
        }
    }

    async deleteFoodReview(data: DeleteFoodReviewDTO): Promise<DeleteFoodReviewResponseDTO> {
        try {
            const { userId, orderId, itemId } = data
            await this.reviewRepository.deleteFoodReview(userId, orderId, itemId);
            return {
                success: true,
                message: 'Review deleted successfully',
            };
        } catch (error) {
            console.error('Error in deleteFoodReview:', error);
            return { success: false, message: (error as Error).message || 'Failed to delete review' };
        }
    }

    async getUserReviewForFoodItem(data: DeleteFoodReviewDTO): Promise<ReviewDataResponseDTO> {
        try {
            const { userId, orderId, itemId } = data
            const review = await this.reviewRepository.getUserReviewForFoodItem(userId, orderId, itemId);

            if (!review) {
                return { success: false, message: 'Review not found' };
            }

            return {
                success: true,
                message: 'Review fetched successfully',
                data: { review },
            };
        } catch (error) {
            console.error('Error in getUserReviewForFoodItem:', error);
            return { success: false, message: (error as Error).message || 'Failed to fetch review' };
        }
    }

    async getFoodReviews(data: GetFoodReviewDTO): Promise<GetFoodReviewResponseDTO> {
        try {
            const reviewDatas = await this.reviewRepository.getFoodReview(data.dishId)
            if (!reviewDatas) {
                return { success: false, message: 'No Data found' }
            }
            return { success: true, response: reviewDatas }
        } catch (error) {
            console.error('Error in getFoodReview:', error);
            return { success: false, message: (error as Error).message || 'Failed to fetch review' };
        }
    }
}