import SubscriptionPlanRepository from "../repositeries/subscriptionPlanRepo";

export class SubscriptionPlanUseCase {
    private subscriptionPlanRepo: SubscriptionPlanRepository;

    constructor(subscriptionPlanRepo: SubscriptionPlanRepository) {
        this.subscriptionPlanRepo = subscriptionPlanRepo;
    }

    async addNewSubscriptionPlan(data: {
        name: string;
        price: number;
        period: string;
        description: string;
        features: string[];
        popular: boolean;
    }) {
        const plan = await this.subscriptionPlanRepo.addSubscriptionPlan(data);
        return plan;
    }

    async getAllSubScriptionPlan(data: any) {
        try {
            const plans = await this.subscriptionPlanRepo.getAllSubscriptionPlans();
            return {
                message: 'success',
                response: plans
            };
        } catch (error) {
            console.log('Error in useCase getAllSubScriptionPlan:', error);
            return {
                message: 'error',
                response: []
            };
        }
    }

    async editSubscriptionPlan(data: {
        id: string;
        name: string;
        price: number;
        period: string;
        description: string;
        features: string[];
        popular: boolean;
    }) {
        try {
            const { id, ...updateData } = data;
            const updatedPlan = await this.subscriptionPlanRepo.updateSubscriptionPlan(id, updateData);
            return {
                message: 'success',
                response: updatedPlan
            };
        } catch (error) {
            console.log('Error in useCase editSubscriptionPlan:', error);
            return {
                message: 'error',
                response: null
            };
        }
    }

    async deleteSubScriptionPlan(data: { id: string }) {
        try {
            const deletedPlan = await this.subscriptionPlanRepo.deleteSubscriptionPlan(data );
            return {
                message: deletedPlan ? 'success' : 'not found',
                response: deletedPlan
            };
        } catch (error) {
            console.log('Error in useCase deleteSubScriptionPlan:', error);
            return {
                message: 'error',
                response: null
            };
        }
    }


}
