import jwt from "jsonwebtoken";

import {JWT_SECRET} from "../config/env.js";
import User from "../models/user.model.js";

const authorize = async (req, res, next) => {
    try {
        let token

        if (req.headers.authorization?.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1]
        }

        if (!token) {
            res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const decoded = jwt.verify(token, JWT_SECRET)

        const user = await User.findById(decoded.id)

        if (!user) {
            res.status(404).json({ success: false, message: "User not found" });
        }

        req.user = user

        next()
    } catch {
        res.status(401).json({ success: false, message: "Unauthorized" });
    }
}

export default authorize;