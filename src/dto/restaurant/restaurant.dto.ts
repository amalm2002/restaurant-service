export interface RegistrationDTO {
    restaurantName: string;
    email: string;
    mobile: number;
    isOnline?: boolean;
    otp?: string;
    otpToken?: string;
}

export interface RegistrationCheckDTO {
    email: string;
    mobile: number;
}