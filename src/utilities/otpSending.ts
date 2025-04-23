import { AuthService } from "../services/auth";
import generateOTP from "../services/generateOtp";
import { sendMail } from "../services/nodeMailer";

const auth = new AuthService();

export const sendOtp = async (email: string) => {
    try {
        const otp = generateOTP();
        console.log('otp on restaurant :', otp);

        const token = await auth.createToken(otp, '2d','Otp');
        const subject = "Otp Verification";
        const text = `Hello,\n\nThank you for registering with your Restaurant !, your OTP is ${otp}\n\nHave a nice day!!!`;
        await sendMail(email, subject, text);
        console.log("otp, token", otp, token);
        return token
    } catch (error) {
        console.log("sendOtp fun", error);
    }
}

export const sendVerifyMail = async (email: string) => {
    try {
        const subject = "Restaurant Document Verification Successful";
        const text = `Hello,

        We’re excited to let you know that your restaurant documents have been successfully verified!   
        Your profile is now marked as verified on our platform. You can now access all the features available to verified restaurant accounts, including order management, promotions, and more.
        If you have any questions or need assistance, feel free to reach out to our support team.
        
        Thank you for being a part of our community!
        
        Best regards,  
        The Eatzaa Food Booking Team`;
        await sendMail(email, subject, text)
    } catch (error) {
        console.log("sendVerifyMail fun", error);
    }
}

export const sendRejectedDocumetsMail = async (email: string, rejectionReason: string) => {
    try {

        const subject = "Restaurant Document Verification Rejected";
        const text = `Hello,

          Thank you for submitting your restaurant documents for verification.
           Unfortunately, after reviewing your documents, we were unable to verify your account at this time.

         🔴 **Reason for Rejection:**  
          **${rejectionReason}**

          Please review the reason above and make the necessary corrections. You may re-upload the correct documents and resubmit for verification.
          If you have any questions or need help, our support team is here to assist you.

          Thank you for your understanding.

          Best regards,  
          The Eatzaa Food Booking Team`;
          
        await sendMail(email, subject, text)

    } catch (error) {
        console.log("sendRejectedDocumetsMail fun", error);
    }
}