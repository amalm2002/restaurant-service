import RegistrationUseCase from "../useCases/registration.use-case";
import { Registration } from "../utilities/interface";
import { sendOtp } from "../utilities/otpSending";
import { AuthService } from "../services/auth";


const registrationUseCase = new RegistrationUseCase()

export default class registartionController {

    register = async (data: Registration) => {
        const { restaurantName, email, mobile, otp, otpToken } = { ...data };

        if (!otp || !otpToken) {
            return { error: "OTP and OTP Token are required." };
        }
        const authService = new AuthService();
        const decodedToken = authService.verifyOption(otpToken);

        if (!decodedToken || "message" in decodedToken || !decodedToken.clientId) {
            return { error: "Invalid OTP Token" };
        }
        if (decodedToken.clientId !== otp) {
            return { error: "Invalid OTP. Please try again." };
        }
        const restaurantData = {
            restaurantName,
            email,
            mobile
        };
        try {
            const response = await registrationUseCase.register(restaurantData);
            return response;
        } catch (error) {
            return { error: (error as Error).message };
        }
    };

    checkRestaurant = async (data: { email: string, mobile: number }) => {
        const { email, mobile } = data

        try {

            const response = await registrationUseCase.checkRestaurant(email, mobile)

            if (response.message === 'restaurant not registered') {
                const token = await sendOtp(email)
                console.log('OTP Sent:', token)
                return { ...response, otpToken: token };
            }

            return response

        } catch (error) {
            return ({ error: (error as Error).message })
        }
    }

    restaurantResendOtp = async (data: any) => {
        const { email, mobile } = data
        try {
            const response = await registrationUseCase.checkRestaurant(email, mobile)
            const token = await sendOtp(email)
            console.log('RESEND OTP SEND :', token);
            return { ...response, otpToken: token }

        } catch (error) {
            return ({ error: (error as Error).message })
        }

    }

    restaurantDocumentUpdate = async (data: any) => {
        try {
            const { restaurant_id, idProofUrl, fssaiLicenseUrl, businessCertificateUrl, bankAccountNumber,
                ifscCode } = data

            const restaurantDoc = {
                restaurant_id,
                idProofUrl,
                fssaiLicenseUrl,
                businessCertificateUrl,
                bankAccountNumber,
                ifscCode
            }

            const response = await registrationUseCase.restaurantDocumentUpdate(restaurantDoc)
            return (response)

        } catch (error) {
            return ({ error: (error as Error).message })
        }
    }

    restaurantLocation = async (data: any) => {
        try {

            const { latitude, longitude, restaurantId } = data
            const locationData = {
                latitude,
                longitude,
                restaurantId
            }

            const response = await registrationUseCase.restaurantLocationUpdation(locationData)

            return (response)
        } catch (error) {
            return ({ error: (error as Error).message })
        }
    }

    resubmitRestaurantDocuments = async (data: any) => {
        try {
            const { restaurantId, idProof, fssaiLicense, businessCertificate, bankAccountNumber,
                ifscCode } = data

            const resubmitData = {
                restaurantId,
                idProof,
                fssaiLicense,
                businessCertificate,
                bankAccountNumber,
                ifscCode
            }

            const response = await registrationUseCase.resubmitDocuments(resubmitData)
            return response

        } catch (error) {
            return ({ error: (error as Error).message })
        }
    }

}
