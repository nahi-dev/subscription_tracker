// routes/workflow.route.js
import { Router } from "express";
import {
  sendReminders,
  startReminderWorkflow,
} from "../controllers/workflow.controller.js";

const workflowRouter = Router();

// Endpoint for Upstash to execute the workflow
workflowRouter.post("/subscription/reminder", sendReminders);

// Endpoint to manually start a workflow (for testing)
workflowRouter.post("/subscription/reminder/start", async (req, res) => {
  try {
    const { subscriptionId } = req.body;

    if (!subscriptionId) {
      return res.status(400).json({ error: "subscriptionId is required" });
    }

    const workflow = await startReminderWorkflow(subscriptionId);

    res.json({
      success: true,
      workflowId: workflow.id,
      message: "Reminder workflow started successfully",
    });
  } catch (error) {
    console.error("Error starting workflow:", error);
    res.status(500).json({ error: "Failed to start workflow" });
  }
});

export default workflowRouter;
// import { Router } from "express";
// import { sendReminders } from "../controllers/workflow.controller.js";
// const workflowRouter = Router();
// workflowRouter.post("/subscription/reminder", sendReminders);
// export default workflowRouter;
