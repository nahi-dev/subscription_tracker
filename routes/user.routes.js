import { Router } from "express";
import { getUser, getAllUsers } from "../controllers/user.controller.js";
import { authorize } from "../middleware/auth.middleware.js";
const userRouter = Router();
userRouter.get("/", getAllUsers);
userRouter.get("/:id", authorize, getUser);
userRouter.post("/", (req, res) => {
  res.send({
    body: { title: "Create a new user" },
  });
});
userRouter.put("/:id", (req, res) => {
  res.send({
    body: { title: "Update user details" },
  });
});
userRouter.delete("/:id", (req, res) => {
  res.send({
    body: { title: "Delete user" },
  });
});
userRouter.get("/", async (req, res) => {
  try {
    const users = await User.find(); // fetch all users from MongoDB
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch users" });
  }
});
export default userRouter;
