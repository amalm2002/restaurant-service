export interface SortMenuDTO {
    sortValue: string;
    searchTerm: string;
    category: string;
}

export interface SortedMenuItemResponseDTO {
  _id: string;
  restaurantId: string;
  name: string;
  description: string;
  category: string;
  price: number;
  quantity: number;
  images: string[];
  hasVariants: boolean;
  variants: {
    name: string;
    price: number;
    quantity: number;
  }[];
  timing: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  restaurantName: string;
  isOnline: boolean;
  rating: number;
  adFlag: boolean;
}
