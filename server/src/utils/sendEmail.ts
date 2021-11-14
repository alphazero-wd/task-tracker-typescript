import { createTransport, getTestMessageUrl } from "nodemailer";

export const sendEmail = async (to: string, html: string) => {
  try {
    const transporter = createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: "lbmfxdlsorpq7kui@ethereal.email",
        pass: "NWhxUr6Q6TNwAbpu8V",
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
