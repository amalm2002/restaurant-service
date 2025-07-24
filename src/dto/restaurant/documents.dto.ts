import { RegistrationResponseDTO } from "./restaurant.dto";

export interface DocumentsDTO {
    restaurant_id: string;
    idProofUrl: string;
    fssaiLicenseUrl: string;
    businessCertificateUrl: string;
    bankAccountNumber: string;
    ifscCode: string;
}

export interface DocumentsUpdateResponseDTO {
    message?: string;
    restaurantResponse?: RegistrationResponseDTO;
    error?: string;
}

export interface ResubDocsDTO {
    restaurantId: string;
    idProof: string;
    fssaiLicense: string;
    businessCertificate: string;
    bankAccountNumber: string;
    ifscCode: string
}

export interface ResubDocsResponseDTO {
    message?: string;
    response?: RegistrationResponseDTO | string;
    error?: string;
}