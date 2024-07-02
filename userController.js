import User from "./models/users.js";
import jwt from "jsonwebtoken";

export const createUser = async (req, res) => {
    try {
        console.log(req.body);
        const user = new User(req.body);
        const {email} = user;
        const existingUser = await User.findOne({email});

        if (existingUser) {
            return serverError(res, num=400, msg="User already exists");
        }
        const savedUser = await user.save();
        return res.status(201).json(savedUser);
    } catch (error) {
        return serverError(res, error);
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return serverError(res, num=401, msg="Authentication failed");
        }
        
        if (password != user.password) {
            return serverError(res, num=401, msg="Password authentication failed");
        }

        const token = jwt.sign({ userId: user._id }, "your-secret-key", {
            expiresIn: "1h"
        });

        return res.status(200).json({ token });
    } catch (error) {
        return serverError(res, error, msg="Login failed");
    }
}

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (error) {
        return serverError(res, error);
    }
}

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        
        if (!user) {
            return serverError(res, num=404, msg="User not found");
        }
        return res.status(200).json(user);
    } catch (error) {
        return serverError(res, error);
    }
}

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndUpdate(id, req.body, { new: true });

        if (!user) {
            return serverError(res, num=404, msg="User not found");
        }
        return res.status(200).json(user);
    } catch (error) {
        return serverError(res, error);
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndUpdate(id);

        if (!user) {
            // return res.status(404).json({ error: "User not found" });
            return serverError(res, num=404, msg="User not found");
        }
        return res.status(200).json(user);
    } catch (error) {
        return serverError(res, error);
    }
}

function serverError (res, error=null, num=500, msg="Internal server error") {
    if (error != null) {
        console.log(error);
    }
    return res.status(num).json({error: msg})
}
