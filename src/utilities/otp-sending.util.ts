import { INodemailerService } from '../services/interfaces/nodemailer.service.interface';
import { IOtpService } from '../services/interfaces/otp.service.interface';
import { IAuthService } from '../services/interfaces/auth.service.interface';

export class OtpSendingUtil {
    static async sendOtp(
        email: string,
        nodemailerService: INodemailerService,
        otpService: IOtpService,
        authService: IAuthService
    ): Promise<string> {
        try {
            const otp = otpService.generateOTP();
            console.log('otp on restaurant :', otp);
            const otpToken = await authService.createToken(otp, '2d', 'Otp');
            await nodemailerService.sendMail(
                email,
                'Otp Verification',
                `Hello,\n\nThank you for registering with your Restaurant !, your OTP is ${otp}\n\nHave a nice day!!!`
            );
            console.log('otp, token', otp, otpToken);
            return otpToken;
        } catch (error) {
            console.log('sendOtp error:', error);
            throw new Error(`Failed to send OTP: ${(error as Error).message}`);
        }
    }

    static async sendVerifyMail(email: string, nodemailerService: INodemailerService): Promise<void> {
        try {
            await nodemailerService.sendMail(
                email,
                'Restaurant Document Verification Successful',
                `Hello,

We’re excited to let you know that your restaurant documents have been successfully verified!   
Your profile is now marked as verified on our platform. You can now access all the features available to verified restaurant accounts, including order management, promotions, and more.
If you have any questions or need assistance, feel free to reach out to our support team.

Thank you for being a part of our community!

Best regards,  
The Eatzaa Food Booking Team`
            );
        } catch (error) {
            console.log('sendVerifyMail error:', error);
            throw new Error(`Failed to send verification mail: ${(error as Error).message}`);
        }
    }

    static async sendRejectedDocumetsMail(
        email: string,
        rejectionReason: string,
        nodemailerService: INodemailerService
    ): Promise<void> {
        try {
            await nodemailerService.sendMail(
                email,
                'Restaurant Document Verification Rejected',
                `Hello,

Thank you for submitting your restaurant documents for verification.
Unfortunately, after reviewing your documents, we were unable to verify your account at this time.

🔴 **Reason for Rejection:**  
**${rejectionReason}**

Please review the reason above and make the necessary corrections. You may re-upload the correct documents and resubmit for verification.
If you have any questions or need help, our support team is here to assist you.

Thank you for your understanding.

Best regards,  
The Eatzaa Food Booking Team`
            );
        } catch (error) {
            console.log('sendRejectedDocumetsMail error:', error);
            throw new Error(`Failed to send rejection mail: ${(error as Error).message}`);
        }
    }
}