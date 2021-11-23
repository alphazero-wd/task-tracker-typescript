import { createTransport } from "nodemailer";

export const sendEmail = async (to: string, html: string) => {
  try {
    const transporter = createTransport({
      service: "gmail",
      auth: {
        user: "alphazero25811@gmail.com",
        pass: process.env.GOOGLE_ACCOUNT_PASSWORD!,
      },
    });
    await transporter.sendMail({
      from: '"To Do", <support@todo-alphazero.com>',
      to,
      subject: "Reset Password Verification",
      html,
    });
  } catch (err) {
    console.log(err);
  }
};
