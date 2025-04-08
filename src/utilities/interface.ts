import mongodb from 'mongodb'

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