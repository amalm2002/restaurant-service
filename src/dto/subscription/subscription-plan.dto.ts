export interface SubscriptionPlanDTO {
    id?: string;
    name: string;
    price: string;
    period: string;
    description: string;
    features: string[];
    popular: boolean;
}