import { SubscriptionPlanDTO } from "./subscription-plan.dto";

export interface EditSubscriptionPlanResponseDTO {
    message?: string;
    response?: SubscriptionPlanDTO;
    error?: boolean;
}