import { Router } from "express";
const userRouter = Router();
userRouter.get("/", (req, res) => {
  res.send({
    body: { title: "Get all users" },
  });
});
userRouter.get("/:id", (req, res) => {
  res.send({
    body: { title: "Get all user details" },
  });
});
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
export default userRouter;
