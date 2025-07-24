import { ISubscriptionService } from '../interfaces/subscription-plan.service.interface';
import { ISubscriptionPlanRepository } from '../../repositories/interfaces/subscription-plan.repository.interface';
import { ITransactionRepository } from '../../repositories/interfaces/transaction.repository.interface';
import { SubscriptionPlanDTO, SubscriptionPlanResponseDTO } from '../../dto/subscription/subscription-plan.dto';
import { PaymentDTO, VerifyPaymentDTO, FailedPaymentDTO, PaymentResponseDTO, VerifyPaymentResponseDTO, FailedPaymentResponseDTO, RetryPaymentResponseDTO, RetryPaymentDTO, GetAllRestaurantPaymentsDTO } from '../../dto/subscription/payment.dto';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import SubscriptionPlan from '../../models/subscription-plan.model';
import { GetAllSubscriptionPlanResponseDTO, GetSubscriptionPlanExitDTO, GetSubscriptionPlanExitResponseDTO } from '../../dto/subscription/get-all-plan.dto';
import { EditSubscriptionPlanResponseDTO } from '../../dto/subscription/edit-subscription-plan.dto';
import { DeleteSubscriptionPlanDTO, DeleteSubscriptionPlanResponseDTO } from '../../dto/subscription/delete-subscription.plan.dto';
import { GetRestaurantDataByIdDTO } from '../../dto/restaurant/get-restaurant-by-id.dto';
import { SubscriptionOrderResponseDTO, TransactionDetailsDTO } from '../../dto/subscription/restaurant-transaction.dto';


interface RazorpayOrder {
    id: string;
    amount: number | string;
    currency: string;
    status: string;
    receipt: string | undefined;
}

export default class SubscriptionService implements ISubscriptionService {
    private subscriptionPlanRepository: ISubscriptionPlanRepository;
    private transactionRepository: ITransactionRepository;
    private razorpay: Razorpay;

    constructor(
        subscriptionPlanRepository: ISubscriptionPlanRepository,
        transactionRepository: ITransactionRepository
    ) {
        this.subscriptionPlanRepository = subscriptionPlanRepository;
        this.transactionRepository = transactionRepository;
        this.razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID || process.env.VITE_RAZORPAY_KEY_ID || '',
            key_secret: process.env.RAZORPAY_SECRET_ID || process.env.VITE_RAZORPAY_SECRET_ID || '',
        });
    }

    async addNewSubscriptionPlan(data: SubscriptionPlanDTO): Promise<SubscriptionPlanResponseDTO> {
        const { name, price, period, description, features, popular } = data;

        const cleanedPrice = price.toString().replace(/[^0-9.]/g, '');
        const priceNumber = Number(cleanedPrice);

        if (!name || !period || !description || !features || isNaN(priceNumber)) {
            throw new Error('Missing or invalid required fields');
        }
        const plan = await this.subscriptionPlanRepository.addSubscriptionPlan({
            name,
            price: priceNumber.toString(),
            period,
            description,
            features,
            popular,
        });
        return plan;
    }

    async getAllSubscriptionPlan(data: void): Promise<GetAllSubscriptionPlanResponseDTO> {
        try {
            const plans = await this.subscriptionPlanRepository.getAllSubscriptionPlans();
            return {
                message: 'success',
                response: plans,
            };
        } catch (error) {
            console.log('Error in getAllSubscriptionPlan:', error);
            return {
                message: 'error',
                response: [],
            };
        }
    }

    async editSubscriptionPlan(data: SubscriptionPlanDTO): Promise<EditSubscriptionPlanResponseDTO> {
        const { id, name, price, period, description, features, popular } = data;

        if (!id) {
            throw new Error('Subscription plan ID is required');
        }

        const cleanedPrice = price.toString().replace(/[^0-9.]/g, '');
        const priceNumber = Number(cleanedPrice);

        const updatedPlan = await this.subscriptionPlanRepository.updateSubscriptionPlan(id, {
            name,
            price: priceNumber.toString(),
            period,
            description,
            features,
            popular,
        });

        return {
            message: 'success',
            response: updatedPlan,
        };
    }

    async deleteSubscriptionPlan(data: DeleteSubscriptionPlanDTO): Promise<DeleteSubscriptionPlanResponseDTO> {
        try {
            const deletedPlan = await this.subscriptionPlanRepository.deleteSubscriptionPlan(data);
            return {
                message: deletedPlan ? 'success' : 'not found',
                response: deletedPlan,
            };
        } catch (error) {
            console.log('Error in deleteSubscriptionPlan:', error);
            throw new Error((error as Error).message);
        }
    }

    async getAnySubscriptionPlanExist(data: GetSubscriptionPlanExitDTO): Promise<GetSubscriptionPlanExitResponseDTO> {
        try {
            if (!data.restaurantId || typeof data.restaurantId !== 'string') {
                throw new Error('Invalid restaurantId provided');
            }
            return await this.transactionRepository.findExistPlan({ id: data.restaurantId });
        } catch (error) {
            console.log('Error in getAnySubscriptionPlanExist:', error);
            throw new Error((error as Error).message);
        }
    }

    async paymentForSubscriptionPlan(data: PaymentDTO): Promise<PaymentResponseDTO> {
        try {
            const { amount, planId, restaurantId, isRetry = false } = data;
            const razorpayKey = process.env.RAZORPAY_KEY_ID || process.env.VITE_RAZORPAY_KEY_ID;
            if (!razorpayKey) {
                throw new Error('Razorpay key ID is missing');
            }
            if (!process.env.RAZORPAY_SECRET_ID && !process.env.VITE_RAZORPAY_SECRET_ID) {
                throw new Error('Razorpay secret is missing');
            }

            const planExist = await this.transactionRepository.findExistPlan({ id: restaurantId });
            console.log('plan existed :', planExist);

            if (!planExist.allowed) {
                return planExist;
            }

            const amountInPaisa = parseInt(amount) * 100;
            if (isNaN(amountInPaisa) || amountInPaisa <= 0) {
                throw new Error('Invalid amount provided');
            }

            const payload = {
                amount: amountInPaisa,
                currency: 'INR',
                receipt: `receipt_${new Date().getTime()}`,
                payment_capture: true,
            };

            const rawOrder = await this.razorpay.orders.create(payload);

            if (!rawOrder || !rawOrder.id) {
                throw new Error('Failed to create Razorpay order: No order ID returned');
            }

            const order: RazorpayOrder = {
                id: rawOrder.id,
                amount: typeof rawOrder.amount === 'string' ? parseInt(rawOrder.amount) : rawOrder.amount,
                currency: rawOrder.currency,
                status: rawOrder.status,
                receipt: rawOrder.receipt,
            };

            if (!isRetry) {
                await this.transactionRepository.createPayment({
                    restaurantId,
                    planId,
                    amount,
                    razorpayOrderId: order.id,
                });
            }
            return {
                orderId: order.id,
                razorpayKey,
            };
        } catch (error) {
            console.error('Error in paymentForSubscriptionPlan:', {
                message: (error as Error).message,
                stack: (error as Error).stack,
            });
            throw error;
        }
    }

    async verifyPaymentSubscriptionPlan(data: VerifyPaymentDTO): Promise<VerifyPaymentResponseDTO> {
        try {
            const { razorpay_order_id, razorpay_payment_id, razorpay_signature, planId, restaurantId } = data;
            const razorData = razorpay_order_id + '|' + razorpay_payment_id;
            const expectedSignature = crypto
                .createHmac('sha256', process.env.RAZORPAY_SECRET_ID || process.env.VITE_RAZORPAY_SECRET_ID || '')
                .update(razorData.toString())
                .digest('hex');
            if (expectedSignature !== razorpay_signature) {
                throw new Error('Payment verification failed!');
            }
            const subscriptionPlan = await SubscriptionPlan.findById(planId);
            if (!subscriptionPlan) {
                throw new Error('Subscription plan not found');
            }

            const period = subscriptionPlan.period;
            let expireDate = new Date();
            const words = period.toLowerCase().split(' ');
            const number = parseInt(words[0]);
            const unit = words[1];

            if (unit.includes('month')) {
                expireDate.setMonth(expireDate.getMonth() + number);
            } else if (unit.includes('year')) {
                expireDate.setFullYear(expireDate.getFullYear() + number);
            }

            const expireDateString = expireDate.toISOString();

            const payment = await this.transactionRepository.verifyPayment({
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature,
                expireAt: expireDateString,
                planId,
                restaurantId
            });

            if (!payment) {
                throw new Error('Payment record not found');
            }

            return {
                message: 'Payment verified and subscription activated!',
                expireAt: expireDateString,
            };
        } catch (error) {
            console.log('Error in verifyPaymentSubscriptionPlan:', (error as Error).message);
            throw error;
        }
    }

    async handleFailedPayment(data: FailedPaymentDTO): Promise<FailedPaymentResponseDTO> {
        try {
            const { razorpay_order_id, razorpay_payment_id, error_code, error_description, restaurantId, planId } = data;
            const payment = await this.transactionRepository.updateFailedPayment({
                razorpay_order_id,
                razorpay_payment_id,
                error_code,
                error_description,
                planId,
                restaurantId
            });

            if (!payment) {
                throw new Error('Payment record not found');
            }

            return {
                message: 'Failed payment recorded successfully',
            };
        } catch (error) {
            console.error('Error in handleFailedPayment:', (error as Error).message);
            throw error;
        }
    }

    async retryPayment(data: RetryPaymentDTO): Promise<RetryPaymentResponseDTO> {
        try {
            const payment = await this.transactionRepository.findPaymentById(data.paymentId);
            if (!payment) {
                throw new Error('Payment record not found');
            }
            if (payment.status !== 'failed') {
                throw new Error('Only failed payments can be retried');
            }

            const { subscriptionPlanId, restaurantId, amount } = payment;
            const planId = subscriptionPlanId.toString();

            const restaurantIdString = restaurantId ? restaurantId.toString() : null;

            if (!restaurantIdString) {
                throw new Error('Invalid restaurantId in payment record');
            }

            const orderData: any = await this.paymentForSubscriptionPlan({
                amount: (amount / 100).toString(),
                planId,
                restaurantId: restaurantIdString,
                isRetry: true,
            });

            await this.transactionRepository.updatePaymentOrderId({
                paymentId: data.paymentId,
                razorpayOrderId: orderData.orderId,
            });

            return {
                orderId: orderData.orderId,
                razorpayKey: orderData.razorpayKey,
            };
        } catch (error) {
            console.error('Error in retryPayment:', {
                message: (error as Error).message,
                stack: (error as Error).stack,
            });
            throw error;
        }
    }

    async getTheTransactionHistory(data: GetRestaurantDataByIdDTO): Promise<SubscriptionOrderResponseDTO[]> {
        try {
            const { restaurantId } = data
            const response = await this.transactionRepository.getTransactionHistory(restaurantId);
            return response;
        } catch (error) {
            console.log('Error in getTheTransactionHistory:', error);
            throw new Error((error as Error).message);
        }
    }

    async getTheTransactionDetails(data: TransactionDetailsDTO): Promise<SubscriptionOrderResponseDTO> {
        try {
            const transaction = await this.transactionRepository.getTheTransactionDetails(data.transactionId);
            return transaction;
        } catch (error) {
            console.log('Error in getTheTransactionDetails:', error);
            throw new Error((error as Error).message);
        }
    }

    async getAllRestaurantPayments(data: void): Promise<GetAllRestaurantPaymentsDTO> {
        try {
            const payments = await this.transactionRepository.getAllRestaurantPayments(data);
            return {
                message: 'success',
                response: payments,
            };
        } catch (error) {
            console.log('Error in getAllRestaurantPayments:', error);
            throw new Error((error as Error).message);
        }
    }
}