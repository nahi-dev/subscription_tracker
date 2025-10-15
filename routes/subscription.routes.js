import { Router } from "express";
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
subscriptionRouter.post("/", (req, res) => {
  res.send({
    body: { title: "Create a new subscription" },
  });
});
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
subscriptionRouter.get("/user/id", (req, res) => {
  res.send({
    body: { title: "Get all user subscription" },
  });
});
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
