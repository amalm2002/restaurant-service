export interface GetRestaurantChartDataDTO {
    message?: string;
    response?: { restaurantName: string; orderVolume: number; revenue: number }[];
    error?: boolean;
}

export interface GetRestaurantChartDataRequestDTO {
    startDate?: string;
    endDate?: string
}