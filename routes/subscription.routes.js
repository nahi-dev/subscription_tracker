import { Router } from "express";
import { authorize } from "../middleware/auth.middleware.js";
import {
  createSubscription,
  getUserSubscriptions,
  getAllSubscriptions,
  getSubscriptionDetails,
} from "../controllers/subscription.controller.js";
import { get } from "mongoose";
const subscriptionRouter = Router();
// Get all subscriptions
subscriptionRouter.get("/", getAllSubscriptions);
// Get subscription details
subscriptionRouter.get("/:id", getSubscriptionDetails);
// Create a new subscription
subscriptionRouter.post("/", authorize, createSubscription);
// update subscription details
subscriptionRouter.put("/:id", (req, res) => {
  res.send({
    body: { title: "Update subscription details" },
  });
});
// Delete a subscription
subscriptionRouter.delete("/:id", (req, res) => {
  res.send({
    body: { title: "Delete subscription" },
  });
});
// Get all subscriptions for a specific user
subscriptionRouter.get("/user/:id", authorize, getUserSubscriptions);
subscriptionRouter.put("/:id/cancel", (req, res) => {
  res.send({
    body: { title: "Cancel subscription" },
  });
});
// Get all upcoming renewals
subscriptionRouter.get("/upcoming-renewals", (req, res) => {
  res.send({
    body: { title: "Get all upcoming renewals" },
  });
});
export default subscriptionRouter;
