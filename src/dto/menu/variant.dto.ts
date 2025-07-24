
export interface VariantDTO {
    name: string;
    price: number;
    quantity: number;
    error: string;
}

export type VariantResponseDTO = VariantDTO | { error?: string }