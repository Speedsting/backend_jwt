import express from "express";
import { createUser, getUsers, getUser, updateUser, deleteUser, login } from "../userController.js";
import { verifyToken } from "../utils/auth.js";

const router = express.Router();

router.post("/", createUser);
router.get("/login", login);
router.get("/all", verifyToken, getUsers);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;