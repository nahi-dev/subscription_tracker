// config/upstash.js
import { Client as WorkflowClient } from "@upstash/workflow"; // rename class to avoid conflicts
import { Client } from "@upstash/qstash"; // correct import
import { QSTASH_TOKEN, QSTASH_URL } from "./env.js";

// ----------------------
// Upstash Workflow Client
// ----------------------
export const workflowClientInstance = new WorkflowClient({
  baseUrl: QSTASH_URL,
  token: QSTASH_TOKEN,
});

// ----------------------
// Upstash QStash Client
// ----------------------
export const qstashClient = new Client({
  baseUrl: QSTASH_URL,
  token: QSTASH_TOKEN,
});
