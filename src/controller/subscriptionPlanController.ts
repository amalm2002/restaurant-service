import { SubscriptionPlanUseCase } from '../useCases/subscriptionPlan.Use-Case';

export default class SubscriptionPlanController {
    private subscriptionPlanUseCase: SubscriptionPlanUseCase;

    constructor(subscriptionPlanUseCase: SubscriptionPlanUseCase) {
        this.subscriptionPlanUseCase = subscriptionPlanUseCase;
    }

    addNewSubScriptionPlan = async (data: {
        id: string;
        name: string;
        price: string;
        period: string;
        description: string;
        features: string[];
        popular: boolean;
    }) => {
        const { name, price, period, description, features, popular } = data;


        const cleanedPrice = price.replace(/[^0-9.]/g, '');
        const priceNumber = Number(cleanedPrice);

        if (!name || !period || !description || !features || isNaN(priceNumber)) {
            throw new Error('Missing or invalid required fields');
        }

        const plan = await this.subscriptionPlanUseCase.addNewSubscriptionPlan({
            name,
            price: priceNumber,
            period,
            description,
            features,
            popular,
        });

        return {
            message: 'Subscription Plan Created Successfully',
            data: plan,
        };
    };

    getAllSubScriptionPlan = async (data: any) => {
        try {
            const response = await this.subscriptionPlanUseCase.getAllSubScriptionPlan(data);
            return response;
        } catch (error) {
            console.log('Error in getAllSubScriptionPlan:', error);
            return {
                message: 'error',
                response: [],
            };
        }
    };

    editSubScriptionPlan = async (data: {
        id: string;
        name: string;
        price: string;
        period: string;
        description: string;
        features: string[];
        popular: boolean;
    }) => {
        const { id, name, price, period, description, features, popular } = data;


        const cleanedPrice = price.replace(/[^0-9.]/g, '');
        const priceNumber = Number(cleanedPrice);
        const editinData = {
            id,
            name,
            price: priceNumber,
            period,
            description,
            features,
            popular
        }
        return await this.subscriptionPlanUseCase.editSubscriptionPlan(editinData);
    }

    deleteSubScriptionPlan = async (data: { id: string }) => {
        return await this.subscriptionPlanUseCase.deleteSubScriptionPlan(data);
    }


}