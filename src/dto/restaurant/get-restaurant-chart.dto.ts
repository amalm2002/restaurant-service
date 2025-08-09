export interface GetRestaurantChartDataDTO {
    message?: string;
    response?: { restaurantName: string; orderVolume: number; revenue: number }[];
    error?: boolean;
}