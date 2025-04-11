import mongodb,{ObjectId} from 'mongodb'

export interface Message {
    message: string
}

export interface restaurantData {
    restaurantName: string,
    email: string,
    mobile: number,
    isOnline:boolean,
    restaurant_id: string
}

export interface Registration {
    restaurantName: string;
    email: string;
    mobile: number;
    isOnline?:boolean;
    otp?:string
    otpToken?:string
    
}


export interface VariantInput {
    name: string;
    price: number;
  }
  
  export interface AddMenuItemDTO {
    restaurantId: string | ObjectId;
    name: string;
    description?: string;
    category: 'veg' | 'non-veg' | 'drinks';
    price: number;
    quantity: number;
    images: string[]; 
    hasVariants: boolean;
    variants?: VariantInput[];
    timing?: 'daily' | 'afternoon' | 'evening';
  }