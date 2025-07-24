import { SubscriptionPlanDTO } from "./subscription-plan.dto";

export interface DeleteSubscriptionPlanDTO {
    id: string
}

export interface DeleteSubscriptionPlanResponseDTO {
    message?: string;
    response?: SubscriptionPlanDTO;
    error?: boolean;
}