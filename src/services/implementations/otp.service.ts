
import { IOtpService } from '../interfaces/otp.service.interface';

export default class OtpService implements IOtpService {
    generateOTP(): string {
        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        return otp;
    }
}