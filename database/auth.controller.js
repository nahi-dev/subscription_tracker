import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";
export const signUp = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { name, email, password } = req.body;

    // check if user already exists
    const existingUser = await User.findOne({ email }).session(session);
    if (existingUser) {
      return res.status(409).send("User already exists");
    }
    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUsers = await User.create(
      { name, email, password: hashedPassword },
      { session }
    );
    // create token for the user so that they can be logged in immediately after signing up
    const token = jwt.sign({ userId: newUsers[0]._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
    await newUsers[0].save({ session });

    // Your sign-up logic here
    await session.commitTransaction();
    res.status(201).send({ token });
  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    session.endSession();
  }
  res.status(201).send({
    success: true,
    message: "User created successfully",
    data: {
      token,
      user: newUsers[0],
    },
  });
};

export const signIN = async (req, res, next) => {};
export const signOut = async (req, res, next) => {};
