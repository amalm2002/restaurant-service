
export interface MenuItemDTO {
    _id?: string;
    restaurantId: string;
    name: string;
    description: string;
    category: string;
    price: number;
    quantity: number;
    images: string[];
    hasVariants: boolean;
    variants?: VariantDTO[];
    timing: string;
    isActive?: boolean;
}

export interface VariantDTO {
    name: string;
    price: number;
    quantity: number;
}

export interface CartItemDTO {
    id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    image: string;
    restaurant: string;
    isVeg: boolean;
    maxAvailableQty: number;
}