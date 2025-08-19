import Payment, { PaymentInterface } from '../../models/payment.model';
import { ITransactionRepository } from '../interfaces/transaction.repository.interface';
import { PaymentDTO, VerifyPaymentDTO, FailedPaymentDTO } from '../../dto/subscription/payment.dto';
import { BaseRepository } from './base.repository';

export default class TransactionRepository extends BaseRepository<PaymentInterface> implements ITransactionRepository {
    constructor() {
        super(Payment);
    }

    async createPayment(data: PaymentDTO & { razorpayOrderId: string }): Promise<PaymentInterface> {
        try {
            const payment = new Payment({
                restaurantId: data.restaurantId,
                subscriptionPlanId: data.planId,
                amount: parseFloat(data.amount),
                currency: data.currency,
                razorpayOrderId: data.razorpayOrderId,
                status: 'created',
            });
            return await payment.save();
        } catch (error) {
            throw new Error(`Failed to create payment: ${(error as Error).message}`);
        }
    }

    async verifyPayment(data: VerifyPaymentDTO & { expireAt: string }): Promise<PaymentInterface | null> {
        try {
            const payment = await Payment.findOneAndUpdate(
                { razorpayOrderId: data.razorpay_order_id },
                {
                    razorpayPaymentId: data.razorpay_payment_id,
                    razorpaySignature: data.razorpay_signature,
                    status: 'paid',
                    expireAt: data.expireAt,
                    isActive: true,
                },
                { new: true }
            );
            return payment;
        } catch (error) {
            throw new Error(`Failed to verify payment: ${(error as Error).message}`);
        }
    }

    async updateFailedPayment(data: FailedPaymentDTO): Promise<PaymentInterface | null> {
        try {
            const payment = await Payment.findOneAndUpdate(
                { razorpayOrderId: data.razorpay_order_id },
                {
                    razorpayPaymentId: data.razorpay_payment_id,
                    status: 'failed',
                    errorCode: data.error_code,
                    errorDescription: data.error_description,
                    isActive: false,
                },
                { new: true }
            );
            return payment;
        } catch (error) {
            throw new Error(`Failed to update payment status to failed: ${(error as Error).message}`);
        }
    }

    async findPaymentById(paymentId: string): Promise<PaymentInterface | null> {
        try {
            return await Payment.findById(paymentId);
        } catch (error) {
            throw new Error(`Failed to find payment: ${(error as Error).message}`);
        }
    }

    async updatePaymentOrderId(data: { paymentId: string; razorpayOrderId: string }): Promise<PaymentInterface | null> {
        try {
            const payment = await Payment.findByIdAndUpdate(
                data.paymentId,
                {
                    razorpayOrderId: data.razorpayOrderId,
                    status: 'created',
                    updatedAt: new Date(),
                },
                { new: true }
            );
            return payment;
        } catch (error) {
            throw new Error(`Failed to update payment order ID: ${(error as Error).message}`);
        }
    }

    async findExistPlan(data: { id: string }): Promise<{ allowed: boolean; message?: string; expireAt?: Date }> {
        try {
            const activePlan = await Payment.findOne({
                restaurantId: data.id,
                isActive: true,
                status: 'paid',
            }).sort({ expireAt: -1 });

            if (!activePlan) {
                return { allowed: true, message: 'No active plan exists' };
            }

            const now = new Date();
            let expireAtDate: Date | null = null;
            try {
                expireAtDate = activePlan.expireAt ? new Date(activePlan.expireAt) : null;
            } catch {
                expireAtDate = null;
            }

            const isExpired = !expireAtDate || expireAtDate < now;

            if (isExpired) {
                return { allowed: true, message: 'Previous plan expired, can proceed' };
            } else {
                return {
                    allowed: false,
                    message: 'You already have an active plan. Please wait until it expires before subscribing to a new one.',
                    expireAt: activePlan.expireAt,
                };
            }
        } catch (error) {
            console.error('Error in findExistPlan:', error);
            throw new Error('Failed to check existing plan');
        }
    }

    async getTransactionHistory(restaurantId: string): Promise<PaymentInterface[]> {
        try {
            return await Payment.find({ restaurantId })
                .populate('subscriptionPlanId', 'name period price')
                .sort({ createdAt: -1 });
        } catch (error) {
            throw new Error(`Failed to fetch transaction history: ${(error as Error).message}`);
        }
    }

    async getTheTransactionDetails(transactionId: string): Promise<PaymentInterface | null> {
        try {
            return await Payment.findById(transactionId).populate('subscriptionPlanId', 'name period price');
        } catch (error) {
            throw new Error(`Failed to fetch transaction details: ${(error as Error).message}`);
        }
    }

    async getAllRestaurantPayments(data: any): Promise<PaymentInterface[]> {
        try {
            return await Payment.find()
                .populate('restaurantId', 'restaurantName')
                .populate('subscriptionPlanId', 'name')
                .sort({ createdAt: -1 });
        } catch (error) {
            throw new Error(`Failed to fetch all restaurant payments details: ${(error as Error).message}`);
        }
    }

    async getRestaurantChartData(query: any): Promise<{ restaurantName: string; orderVolume: number; revenue: number }[]> {
        try {
            const payments = await Payment.aggregate([
                { $match: query },
                {
                    $group: {
                        _id: '$restaurantId',
                        orderVolume: { $sum: 1 },
                        revenue: { $sum: '$amount' },
                    },
                },
                {
                    $lookup: {
                        from: 'restaurants',
                        localField: '_id',
                        foreignField: '_id',
                        as: 'restaurant',
                    },
                },
                { $unwind: '$restaurant' },
                {
                    $project: {
                        restaurantName: '$restaurant.restaurantName',
                        orderVolume: 1,
                        revenue: 1,
                        _id: 0,
                    },
                },
            ]);
            return payments;
        } catch (error) {
            throw new Error(`Failed to fetch restaurant chart data: ${(error as Error).message}`);
        }
    }
}