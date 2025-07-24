import { SubscriptionPlanDTO } from "./subscription-plan.dto";

export interface GetAllSubscriptionPlanResponseDTO {
    message?: string;
    response?: SubscriptionPlanDTO[];
}

export interface GetSubscriptionPlanExitDTO {
    restaurantId?: string | { id?: string }
}

export interface GetSubscriptionPlanExitResponseDTO {
    allowed?: boolean;
    message?: string;
    expireAt?: Date
}