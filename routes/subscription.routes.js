import { Router } from "express";
import { authorize } from "../middleware/auth.middleware.js";
import {
  createSubscription,
  getUserSubscriptions,
} from "../controllers/subscription.controller.js";
const subscriptionRouter = Router();
subscriptionRouter.get("/", (req, res) => {
  res.send({
    body: { title: "Get all subscriptions" },
  });
});
subscriptionRouter.get("/:id", (req, res) => {
  res.send({
    body: { title: "Get subscription details" },
  });
});
subscriptionRouter.post("/", authorize, createSubscription);
subscriptionRouter.put("/:id", (req, res) => {
  res.send({
    body: { title: "Update subscription details" },
  });
});
subscriptionRouter.delete("/:id", (req, res) => {
  res.send({
    body: { title: "Delete subscription" },
  });
});
subscriptionRouter.get("/user/:id", authorize, getUserSubscriptions);
subscriptionRouter.put("/:id/cancel", (req, res) => {
  res.send({
    body: { title: "Cancel subscription" },
  });
});
subscriptionRouter.get("/upcoming-renewals", (req, res) => {
  res.send({
    body: { title: "Get all upcoming renewals" },
  });
});
export default subscriptionRouter;
