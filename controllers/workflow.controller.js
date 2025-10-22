import { createRequire } from "module";
import Subscription from "../models/subscription.model.js";
import dayjs from "dayjs";
import { sendReminderEmail } from "../utils/send-email.js";

const require = createRequire(import.meta.url);
const { serve } = require("@upstash/workflow/express");

const REMINDERS = [7, 5, 2, 1]; // days before renewal

export const sendReminders = serve(async (context) => {
  const { subscriptionId } = context.requestPayload;

  const subscription = await fetchSubscription(context, subscriptionId);
  if (!subscription || subscription.status !== "active") return;

  const renewalDate = dayjs(subscription.renewalDate);
  if (renewalDate.isBefore(dayjs())) {
    console.log(
      `Renewal date has passed for subscription ${subscriptionId}. Stopping reminders.`
    );
    return;
  }

  for (const daysBefore of REMINDERS) {
    const reminderDate = renewalDate.subtract(daysBefore, "day");

    if (reminderDate.isAfter(dayjs())) {
      await sleepUntilReminder(
        context,
        `Reminder ${daysBefore} days before`,
        reminderDate
      );
    }
    if (dayjs().isSame(reminderDate, "day")) {
      await triggerReminder(
        context,
        `${daysBefore} days before reminder`,
        subscription
      );
    }
    await triggerReminder(
      context,
      subscription,
      `${daysBefore} days before reminder`
    );
  }
});

const fetchSubscription = async (context, subscriptionId) => {
  return await context.run("get subscription", async () => {
    return Subscription.findById(subscriptionId).populate("user", "name email");
  });
};

const sleepUntilReminder = async (context, label, date) => {
  console.log(`Sleeping until ${label} at ${date}`);
  await context.sleepUntil(label, date.toDate());
};

const triggerReminder = async (context, subscription, label) => {
  return await context.run(label, async () => {
    console.log(`Triggering ${label} reminder`);

    // send email, sms , notificationt etc
    await sendReminderEmail({
      to: subscription.user.email,
      type: label,
      subscription,
    });
  });
};

// import { createRequire } from "module";
// import Subscription from "../models/subscription.model.js";
// import dayjs from "dayjs";
// import { sendReminderEmail } from "../utils/send-email.js";
// import { workflowClientInstance } from "../config/upstash.js";
// import { QSTASH_URL } from "../config/env.js";

// const require = createRequire(import.meta.url);
// const { serve } = require("@upstash/workflow/express");

// const REMINDERS = [7, 5, 2, 1]; // days before renewal

// // Function to start the workflow when a subscription is created
// export const startReminderWorkflow = async (subscriptionId) => {
//   try {
//     const workflow = await workflowClientInstance.start({
//       url: `${baseUrl}/workflow/subscriptions/reminder`,
//       body: { subscriptionId },
//     });
//     console.log(`Started reminder workflow for subscription ${subscriptionId}`);
//     return workflow;
//   } catch (error) {
//     console.error("Failed to start workflow:", error);
//     throw error;
//   }
// };

// export const sendReminders = serve(async (context) => {
//   const { subscriptionId } = context.requestPayload;

//   try {
//     const subscription = await fetchSubscription(context, subscriptionId);

//     // Validate subscription
//     if (!subscription) {
//       console.log(`Subscription ${subscriptionId} not found`);
//       return { success: false, error: "Subscription not found" };
//     }

//     if (subscription.status !== "active") {
//       console.log(`Subscription ${subscriptionId} is not active`);
//       return { success: false, error: "Subscription not active" };
//     }

//     const renewalDate = dayjs(subscription.renewalDate);
//     const today = dayjs();

//     // Check if renewal date is in the past
//     if (renewalDate.isBefore(today)) {
//       console.log(`Renewal date has passed for subscription ${subscriptionId}`);
//       return { success: false, error: "Renewal date has passed" };
//     }

//     // Process reminders
//     for (const daysBefore of REMINDERS) {
//       const reminderDate = renewalDate.subtract(daysBefore, "day");

//       // Only schedule future reminders
//       if (reminderDate.isAfter(today)) {
//         await sleepUntilReminder(
//           context,
//           `Reminder ${daysBefore} days before`,
//           reminderDate
//         );

//         // Revalidate subscription before sending reminder
//         const currentSubscription = await fetchSubscription(
//           context,
//           subscriptionId
//         );
//         if (!currentSubscription || currentSubscription.status !== "active") {
//           console.log(
//             `Subscription ${subscriptionId} no longer active, stopping reminders`
//           );
//           return { success: false, error: "Subscription cancelled" };
//         }
//         // 2 days before reminder

//         await triggerReminder(
//           context,
//           `${daysBefore} days before reminder`,
//           subscription
//         );
//       } else {
//         console.log(`Skipping ${daysBefore}-day reminder as date has passed`);
//       }
//     }

//     console.log(`Completed all reminders for subscription ${subscriptionId}`);
//     return { success: true, message: "All reminders processed" };
//   } catch (error) {
//     console.error(`Workflow failed for subscription ${subscriptionId}:`, error);
//     throw error; // This will mark the workflow as failed
//   }
// });

// const fetchSubscription = async (context, subscriptionId) => {
//   return await context.run("get subscription", async () => {
//     return Subscription.findById(subscriptionId).populate("user", "name email");
//   });
// };

// const sleepUntilReminder = async (context, label, date) => {
//   console.log(`Sleeping until ${label} at ${date}`);
//   await context.sleepUntil(label, date.toDate());
// };

// const triggerReminder = async (context, subscription, daysBefore) => {
//   return await context.run(`Send ${daysBefore}-day reminder`, async () => {
//     console.log(
//       `Triggering ${daysBefore}-day reminder for ${subscription.user.email}`
//     );

//     try {
//       await sendReminderEmail({
//         to: subscription.user.email,
//         type: `${daysBefore} days before reminder`,
//         subscriptionName: subscription.name,
//         renewalDate: subscription.renewalDate,
//         price: subscription.price,
//         paymentMethod: subscription.paymentMethod,
//       });

//       console.log(
//         `Successfully sent ${daysBefore}-day reminder to ${subscription.user.email}`
//       );
//     } catch (error) {
//       console.error(`Failed to send ${daysBefore}-day reminder:`, error);
//       // You might want to implement retry logic here
//       throw error; // This will retry the step based on workflow configuration
//     }
//   });
// };
