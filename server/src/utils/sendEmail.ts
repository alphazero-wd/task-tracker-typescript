import { createTransport } from 'nodemailer';

export const sendEmail = async (to: string, html: string) => {
  try {
    const transporter = createTransport({
      service: 'gmail',
      auth: {
        user: 'alphazero25811@gmail.com',
        pass: process.env.GOOGLE_ACCOUNT_PASSWORD!,
      },
    });
    await transporter.sendMail({
      from: '"Alpha Zero", <alphazero28511@gmail.com>',
      to,
      subject: 'Reset Password Verification',
      html,
    });
  } catch (err) {
    console.log(err);
  }
};
