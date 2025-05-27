import { SubscriptionPlanInterface } from '../../models/subscription-plan.model';
import { SubscriptionPlanDTO } from '../../dto/subscription/subscription-plan.dto';

export interface ISubscriptionPlanRepository {
    addSubscriptionPlan(data: SubscriptionPlanDTO): Promise<SubscriptionPlanInterface>;
    getAllSubscriptionPlans(): Promise<SubscriptionPlanInterface[]>;
    updateSubscriptionPlan(id: string, data: SubscriptionPlanDTO): Promise<SubscriptionPlanInterface | null>;
    deleteSubscriptionPlan(data: { id: string }): Promise<SubscriptionPlanInterface | null>;
}