
import subscriptionPlanModel, { SubscriptionPlanInterface } from '../entities/subscriptionPlan';

export default class SubscriptionPlanRepository {

    addSubscriptionPlan = async (data: {
        name: string;
        price: number;
        period: string;
        description: string;
        features: string[];
        popular: boolean;
    }): Promise<SubscriptionPlanInterface> => {
        try {
            const newPlan = await subscriptionPlanModel.create(data);
            return newPlan;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    };

    getAllSubscriptionPlans = async (): Promise<SubscriptionPlanInterface[]> => {
        try {
            const plans = await subscriptionPlanModel.find();
            return plans;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    };

    updateSubscriptionPlan = async (
        id: string,
        data: {
            name: string;
            price: number;
            period: string;
            description: string;
            features: string[];
            popular: boolean;
        }
    ): Promise<SubscriptionPlanInterface | null> => {
        try {

            const updatedPlan = await subscriptionPlanModel.findByIdAndUpdate(
                id,
                { $set: data },
                { new: true }
            );
            return updatedPlan;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    };

    deleteSubscriptionPlan = async (data: { id: string }): Promise<SubscriptionPlanInterface | null> => {
        try {
            const subscriptionPlanId = data.id
            // console.log({ subscriptionPlanId }, 'idddddddddddddd');
            const deletedPlan = await subscriptionPlanModel.findByIdAndDelete( subscriptionPlanId );
            return deletedPlan;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    };

}
