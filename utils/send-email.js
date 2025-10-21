import { emailTemplate } from "./email-template.js";
import { accountEmail } from "../config/nodemailer.js";
export const sendReminderEmail = async ({ to, type, subscription }) => {
  if (!to || !type) throw new Error("Missing required parameters");
  const template = emailTemplate.find((t) => t.label === type);
  if (!template) throw new Error("Envalide email type");

  const mailInfo = {
    userName: subscription.user.name,
    subscriptionName: subscription.name,
    renewalDate: dayjs(subscription.renewalDate).format("MMM D, YYY"),
    planName: subscription.name,
    price: `${subscription.currency} ${subscription.price} (${subscription.frequency})`,
    paymentMethod: subscription.paymentMethod,
  };
  const message = template.generateBody(mailInfo);
  const subject = template.generateSubject(mailInfo);
  const mailOptions = {
    from: accountEmail,
    to: to,
    subject: subject,
    html: message,
  };
  transporter.sendemail(mailOptions, (error, info) => {
    if (error) return console.log(error, "Error sending emal");
    console.log("Email sent: ` + info.response ");
  });
};
