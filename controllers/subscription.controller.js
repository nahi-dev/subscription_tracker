import { workflowClient } from "../config/upstash.js";
import Subscription from "../models/subscription.model.js";
import { SERVER_URL } from "../config/env.js";

export const createSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id,
    });

    const workflowResponse = await workflowClient.trigger({
      url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
      body: { subscriptionId: subscription._id },
    });
    // Store workflowRunId in database
    await Subscription.findByIdAndUpdate(subscription._id, {
      workflowRunId: workflowResponse.workflowRunId,
    });

    res.status(201).json({
      success: true,
      data: subscription,
      workflow: {
        workflowRunId: workflowResponse.workflowRunId,
      },
    });
  } catch (error) {
    console.error("Error creating subscription:", error);
    next(error);
  }
};
export const getUserSubscriptions = async (req, res, next) => {
  try {
    // Check if the user is the same as the one in the token
    if (req.user._id.toString() !== req.params.id) {
      return res.status(403).json({
        success: false,
        message:
          "Forbidden: You are not allowed to access this user's subscriptions",
      });
    }

    const subscriptions = await Subscription.find({ user: req.params.id });

    res.status(200).json({
      success: true,
      data: subscriptions,
      count: subscriptions.length,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllSubscriptions = async (req, res, next) => {
  try {
    const subscriptions = await Subscription.find().populate(
      "user",
      "name email"
    );

    if (!subscriptions || subscriptions.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No subscriptions found",
      });
    }

    res.status(200).json({
      success: true,
      data: subscriptions,
      count: subscriptions.length,
    });
  } catch (error) {
    next(error);
  }
};

export const getSubscriptionDetails = async (req, res, next) => {
  try {
    const subscription = await Subscription.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: "Subscription not found",
      });
    }

    res.status(200).json({
      success: true,
      data: subscription,
    });
  } catch (error) {
    next(error);
  }
};

// Additional useful controller methods
export const updateSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate("user", "name email");

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: "Subscription not found",
      });
    }

    res.status(200).json({
      success: true,
      data: subscription,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findByIdAndDelete(req.params.id);

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: "Subscription not found",
      });
    }

    // Note: You might want to cancel the workflow here
    // await cancelReminderWorkflow(subscription._id.toString());

    res.status(200).json({
      success: true,
      message: "Subscription deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export default {
  createSubscription,
  getUserSubscriptions,
  getAllSubscriptions,
  getSubscriptionDetails,
  updateSubscription,
  deleteSubscription,
};
