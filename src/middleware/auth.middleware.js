import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {

        token = req.headers.authorization.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({ message: "Unauthorized request: token not found" });
        }
    }
    try {

        const decodedToken = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
        req.user = await User.findById(decodedToken.userId).select("-password");
        if (!req.user) {
            return res.status(401).json({ message: "User not found" });
        }

        next();
    }
    catch (error) {
        return res.status(401).json({ message: "Not authorized, token failed" })
    }
};



const isAdminRoleChecker = (req, res, next) => {

    if(req.user.role === "Admin") {
        next();
    }
    else {
        res.status(403).json({ message: "Access Denied: you need an Admin role to access this" })
    }
};


export {protect, isAdminRoleChecker};