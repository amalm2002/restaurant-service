
import AdminUseCase from "../useCases/admin.Use-Case";
import { sendRejectedDocumetsMail, sendVerifyMail } from "../utilities/otpSending";

const adminUseCase = new AdminUseCase()

export default class restaurantDisplayController {
    getAllRestaurantsData = async (data: any) => {
        try {
            const result = await adminUseCase.getAllRestaurantDatas(data);
            return result;
        } catch (error) {
            return ({ error: (error as Error).message })
        }
    }

    findRestaurantById = async (data: { restaurantId: string }) => {
        try {
            const { restaurantId } = data
            const result = await adminUseCase.findRestaurantUsingId(restaurantId)
            return result
        } catch (error) {
            return ({ error: (error as Error).message })
        }
    }

    verifyRestaurntDocument = async (data: { restaurantId: string }) => {
        try {
            const { restaurantId } = data
            const result = await adminUseCase.verifyRestaurantDocuments(restaurantId)

            if (typeof result === 'object' && result !== null && 'email' in result && result.isVerified) {
                await sendVerifyMail(result.email as string);
            }

            return { message: 'success', response: result }
        } catch (error) {
            return ({ error: (error as Error).message })
        }
    }

    rejectedRestaurantDocuments = async (data: { restaurantId: string, rejectionReason: string }) => {
        try {
            const { restaurantId, rejectionReason } = data
            const result = await adminUseCase.rejectedRestaurantDocuments(restaurantId, rejectionReason)
            let isRejected = false
            if (result &&
                typeof result !== 'string' &&
                'rejectionReason' in result &&
                'isVerified' in result &&
                !result.isVerified &&
                result.rejectionReason) {

                isRejected = true
                await sendRejectedDocumetsMail(result.email, result.rejectionReason);
            }

            return { message: 'success', result, isRejected }

        } catch (error) {
            return ({ error: (error as Error).message })
        }
    }

}