import { CartItemDTO } from "./menu-item.dto";

export interface UpdateMenuQuantityDTO {
    cartItems: CartItemDTO[]
}

export interface MenuQuantityResponseDTO {
    success: boolean;
    message: string;
}

export type UpdateMenuQuantityResponseDTO = MenuQuantityResponseDTO | { error: string }

export interface CancelOrderQuantityUpdationDTO {
    userId: string;
    restaurantId: string;
    items: Array<{
        foodId: string;
        quantity: number;
    }>
}

export interface CancelOrderQuantityUpdationResponseDTO {
    success: boolean;
    message: string;
    error?: string | undefined;
}


export interface CartItemDto {
    id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    restaurantId: string;
    restaurant: string;
    category: string;
    discount: number;
    timing: string;
    rating: number;
    hasVariants: boolean;
    maxAvailableQty: number;
    images: string[];
    variants: any[];
}

export interface LocationDto {
    latitude: number;
    longitude: number;
}

export interface DecrementStockDTO {
    cartItems: CartItemDto[];
    userId: string;
    subtotal: number;
    deliveryFee: number;
    tax: number;
    total: number;
    location: LocationDto;
    address: string;
    phoneNumber: string;
    paymentMethod: string;
    paymentId: string;
}

export interface DecrementStockResponseDTO {
    success: boolean;
    message?: string;
    error?: string;
}

export interface CheckStockAvailabilityResponseDTO {
    success?: boolean;
    message?: string;
    error?: string;
}