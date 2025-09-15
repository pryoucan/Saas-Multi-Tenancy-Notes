import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

const userLogin = async (req, res) => {
   
   try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (user && (await user.matchPassword(password))) {
         const token = jwt.sign(
            {
               userId: user._id, role: user.role, tenantId: user.tenantId
            },
            process.env.JWT_ACCESS_TOKEN,
            { expiresIn: '1d' }
         );

         res.json({token});
      }
      else {
         res.status(401).json({ message: 'Invalid email or password' }); // Alternatively, I could've also make the whole error class seperately, but I didn't becuase there was no such big requirements from the code. ex: all the API errors and so.
      }
   }
   catch (error) {
      res.status(500).json({ message: 'Server Error' });
   }
};


export { userLogin };