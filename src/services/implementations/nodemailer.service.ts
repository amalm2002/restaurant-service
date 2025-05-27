
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { INodemailerService } from '../interfaces/nodemailer.service.interface';

dotenv.config();

export default class NodemailerService implements INodemailerService {
    async sendMail(email: string, subject: string, text: string) {
        try {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.NODEMAILER_EMAIL,
                    pass: process.env.NODEMAILER_PASS,
                },
            });

            const mailOptions = {
                from: process.env.NODEMAILER_EMAIL,
                to: email,
                subject: subject,
                text: text,
            };

            await transporter.sendMail(mailOptions);
        } catch (error) {
            console.log('Sendmail function', error);
            throw new Error((error as Error).message);
        }
    }
}