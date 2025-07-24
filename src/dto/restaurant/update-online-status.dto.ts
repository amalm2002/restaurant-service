export interface UpdateOnlineStatusDTO {
    restaurant_id: string;
    isOnline: boolean;
}

export interface UpdateOnlineStatusResponseDTO {
    message?: string;
    restaurantId?: string;
    isOnline?: boolean;
    error?: string
}

export interface FetchOnlineStatusResponseDTO {
    isOnline?: boolean;
    error?:string;
}