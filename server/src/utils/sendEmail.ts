import { createTransport, getTestMessageUrl } from "nodemailer";

export const sendEmail = async (to: string, html: string) => {
  try {
    const transporter = createTransport({
      service: "gmail",
      auth: {
        user: "alphazero25811@gmail.com",
        pass: process.env.GOOGLE_ACCOUNT_PASSWORD!,
      },
    });
    const info = await transporter.sendMail({
      from: '"Alpha Zero", <alphazero28511@gmail.com>',
      to,
      subject: "Reset Password Verification",
      html,
    });
    console.log("Message sent: %s", info.messageId);

    console.log("Preview URL: %s", getTestMessageUrl(info));
  } catch (err) {
    console.log(err);
  }
};
