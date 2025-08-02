import mongoose from "mongoose";
import ReviewModel, { ReviewInterface } from "../../models/review.model";
import { IReviewRepository } from "../interfaces/review.repository.interfaces";
import { BaseRepository } from "./base.repository";

export default class ReviewRepository extends BaseRepository<ReviewInterface> implements IReviewRepository {
    constructor() {
        super(ReviewModel);
    }

    async addFoodReview(
        itemId: string,
        rating: number,
        comment: string,
        orderId: string,
        userId: string,
        isEdit: boolean,
        userName: string
    ): Promise<ReviewInterface> {

        if (!mongoose.Types.ObjectId.isValid(itemId) ||
            !mongoose.Types.ObjectId.isValid(orderId) ||
            !mongoose.Types.ObjectId.isValid(userId)) {
            throw new Error('Invalid itemId, orderId, or userId');
        }

        const existingReview = await this.model.findOne({
            userId,
            orderId,
            foodId: itemId,
        }).exec();

        if (isEdit) {
            if (!existingReview) {
                throw new Error('No review found to edit');
            }

            const updateData = {
                rating,
                comment: comment || existingReview.comment,
            };

            const updateResult = await this.updateById(existingReview._id.toString(), updateData);
            if (!updateResult.success || !updateResult.data) {
                throw new Error(updateResult.message || 'Failed to update review');
            }

            return updateResult.data;
        } else {
            if (existingReview) {
                throw new Error('A review for this item and order already exists');
            }

            const newReviewData: Partial<ReviewInterface> = {
                foodId: itemId,
                userName,
                userId,
                orderId,
                rating,
                comment: comment || undefined,
            };

            return await this.create(newReviewData);
        }
    }

    async deleteFoodReview(userId: string, orderId: string, itemId: string): Promise<void> {
        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(orderId) || !mongoose.Types.ObjectId.isValid(itemId)) {
            throw new Error('Invalid userId, orderId, or itemId');
        }

        const review = await this.model.findOne({
            userId,
            orderId,
            foodId: itemId,
        }).exec();

        if (!review) {
            throw new Error('Review not found');
        }

        await this.model.deleteOne({ _id: review._id }).exec();
    }

    async getUserReviewForFoodItem(userId: string, orderId: string, itemId: string): Promise<ReviewInterface | null> {
        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(orderId) || !mongoose.Types.ObjectId.isValid(itemId)) {
            throw new Error('Invalid userId, orderId, or itemId');
        }

        return await this.model.findOne({
            userId,
            orderId,
            foodId: itemId,
        }).exec();
    }

    async getFoodReview(dishId: string): Promise<ReviewInterface[] | []> {
        return await ReviewModel.find({ foodId: dishId })
    }
}