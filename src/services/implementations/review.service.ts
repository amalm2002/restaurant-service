// services/review.service.ts
import { ReviewDataDTO } from "../../dto/review/review.dto";
import { IReviewService } from "../interfaces/review.service.interfaces";
import { IReviewRepository } from "../../repositories/interfaces/review.repository.interfaces";

export default class ReviewService implements IReviewService {
    private reviewRepository: IReviewRepository;

    constructor(reviewRepository: IReviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    async addFoodreview(data: ReviewDataDTO): Promise<any> {
        try {
            const { itemId, rating, comment, orderId, userId, isEdit } = data;

            if (rating < 1 || rating > 5) {
                return { success: false, message: 'Rating must be between 1 and 5' };
            }

            const review = await this.reviewRepository.addFoodReview(itemId, rating, comment, orderId, userId, isEdit);

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

    async deleteFoodReview(userId: string, orderId: string, itemId: string): Promise<any> {
        try {
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

    async getUserReviewForFoodItem(userId: string, orderId: string, itemId: string): Promise<any> {
        try {
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
}