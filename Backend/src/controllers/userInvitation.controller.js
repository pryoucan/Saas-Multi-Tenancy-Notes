import { User } from "../models/user.model.js";

const inviteUsers = async (req, res) => {

    try {
        const {email, password, role} = req.body;

        if(!email || !password || !role) {
            return res.status(400).json({message: "Email, password, and role are required fields"});
        }

        const existingUser = await User.findOne({email});

        if(existingUser) {
            return res.status(409).json({message: "User with this email already exists"}); 
        }

        const {tenantId} = req.user;

        const newUser = await User.create({
            email,
            password,
            role,
            tenantId,
        });

        const newUserResponse = {
            _id: newUser._id,
            email: newUser.email,
            role: newUser.role,
            tenantId: newUser.tenantId
        }

        res.status(201).json(newUserResponse);
    }
    catch(error) {
        return res.status(500).json({message: "Something went wrong"})
    }
};

export default inviteUsers;