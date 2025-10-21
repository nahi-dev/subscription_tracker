export const generateEmailTemplate = ({
  userName,
  subscriptionName,
  renewalDate,
  planName,
  price,
  paymentMethod,
  accountSettingsLink,
  supportLink,
  daysLeft,
}) => `
  <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
      <tr>
        <td style="background-color: #4a90e2; color: #fff; text-align: center; padding: 20px;">
          <h2 style="margin: 0;">Subscription Reminder</h2>
        </td>
      </tr>

      <tr>
        <td style="padding: 20px;">
          <p style="font-size: 16px;">Hi <strong>${
            userName || "there"
          }</strong>,</p>
          <p style="font-size: 15px;">
            This is a friendly reminder that your <strong>${subscriptionName}</strong> subscription will renew in 
            <strong>${daysLeft}</strong> day${daysLeft > 1 ? "s" : ""}.
          </p>
        </td>
      </tr>

      <tr>
        <td style="padding: 0 20px;">
          <table width="100%" cellpadding="10" cellspacing="0" style="background-color: #f7f9fc; border-radius: 8px;">
            <tr>
              <td><strong>Plan</strong></td>
              <td>${planName}</td>
            </tr>
            <tr>
              <td><strong>Renewal Date</strong></td>
              <td>${renewalDate}</td>
            </tr>
            <tr>
              <td><strong>Price</strong></td>
              <td>${price}</td>
            </tr>
            <tr>
              <td><strong>Payment Method</strong></td>
              <td>${paymentMethod}</td>
            </tr>
          </table>
        </td>
      </tr>

      <tr>
        <td style="padding: 20px; text-align: center;">
          <a href="${accountSettingsLink}" style="background-color: #4a90e2; color: #fff; padding: 12px 20px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
            Manage Subscription
          </a>
        </td>
      </tr>

      <tr>
        <td style="padding: 15px 20px; font-size: 14px; text-align: center; color: #555;">
          <p>If you need assistance, please <a href="${supportLink}" style="color: #4a90e2;">contact our support team</a>.</p>
          <p style="margin-top: 10px;">Thank you for staying with us,<br/><strong>The ${subscriptionName} Team</strong></p>
        </td>
      </tr>

      <tr>
        <td style="background-color: #f2f2f2; text-align: center; padding: 10px; font-size: 12px; color: #777;">
          &copy; ${new Date().getFullYear()} ${subscriptionName}. All rights reserved.
        </td>
      </tr>
    </table>
  </div>
`;

// Email templates for reminders
export const emailTemplate = [
  {
    label: "7 days before reminder",
    generateSubject: (data) =>
      `📆 Reminder: Your ${data.subscriptionName} Subscription Renews in 7 days`,
    generateBody: (data) => generateEmailTemplate({ ...data, daysLeft: 7 }),
  },
  {
    label: "5 days before reminder",
    generateSubject: (data) =>
      `${data.subscriptionName} Renews in 5 days - Stay Subscribed!`,
    generateBody: (data) => generateEmailTemplate({ ...data, daysLeft: 5 }),
  },
  {
    label: "2 days before reminder",
    generateSubject: (data) =>
      `2 Days Left! ${data.subscriptionName} Subscription Renewal`,
    generateBody: (data) => generateEmailTemplate({ ...data, daysLeft: 2 }),
  },
  {
    label: "1 day before reminder",
    generateSubject: (data) =>
      `⏰ Last Chance: Your ${data.subscriptionName} Subscription Renews Tomorrow!`,
    generateBody: (data) => generateEmailTemplate({ ...data, daysLeft: 1 }),
  },
  {
    label: "Final day reminder",
    generateSubject: (data) =>
      `${data.subscriptionName} Renews Today - You're All Set!`,
    generateBody: (data) => generateEmailTemplate({ ...data, daysLeft: 0 }),
  },
];
