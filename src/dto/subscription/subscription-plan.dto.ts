export interface SubscriptionPlanDTO {
    id?: string;
    name: string;
    price: string;
    period: string;
    description: string;
    features: string[];
    popular: boolean;
}

export interface SubscriptionPlanResponseDTO {
    id?: string;
    name: string;
    price: string;
    period: string;
    description: string;
    features: string[];
    popular: boolean;
}

export interface SubscriptionPlanControllerResponseDTO {
    data?: SubscriptionPlanDTO;
    message?: string;
    error?: boolean;
}