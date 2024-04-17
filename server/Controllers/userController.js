import { userModel } from "../Models/user.model.js";
import bcrypt from "bcrypt";
import generateTokenAndSetCookie from "../middleware/generateTokenAndSetCookie.js";
import cloudinary from "../middleware/cloudinary.js";
import fs from 'fs'
const userController = {
  register: async (req, res) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(422).send({ message: "Fill in the required fields" });
      }

      const newUserName = username;
      const userNameExists = await userModel.findOne({ username: newUserName });
      if (userNameExists) {
        return res.status(401).send({ message: "Username already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new userModel({
        username,
        password: hashedPassword,
      });

      const savedUser = await newUser.save();
      const { password:userPassword, ...otherDetails } = savedUser._doc;
      const time = "1d";
      const token = generateTokenAndSetCookie(savedUser._doc._id, time);

      // Set the token in the response cookie
      // res.cookie("userToken", token, {
      //   httpOnly: true,
      //   expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      // });

      // Send success response
      res.status(200).json({ message: "Account registered successfully",token });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "User registration failed" });
    }
  },
  login: async (req, res) => {
    const { username, password } = req.body;
    try {
      const User = await userModel.findOne({ username: username });
      if (!User) {
         res.status(404).send({ message: "user not found" });
      } else {
        const comparePassword = await bcrypt.compare(password, User.password);

        if (!comparePassword) {
          res.status(401).json({ message: "Invalid password" });
        }

        const { password: userPassword, ...userDetails } = User._doc;
        const time = "1d";
        const token = generateTokenAndSetCookie(User._doc._id, time);

        // Set the token in the response cookie
        

          // const cookieOptions = {
          //   httpOnly: true,
          //   expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days
          //   sameSite: 'None',
          //   secure:false
          // };

          

          // res.cookie("userToken", token, cookieOptions);

        // Send success response
        res.status(200).json({ message: "Login successfully", token });
      }
    } catch (error) {
      res
        .status(500)
        .send({ message: "Internal Server Error", error: error.message });
    }
  },
  logout:async(req, res)=>{
    // const token = req.cookies.userToken;
    res.clearCookie('userToken');
    // Send success response
    res.status(200).json({ message: 'Sign-out successful' });
  },
  getUser: async (req, res) => {
    const userId = req.userID
    
    try {
      const user = await userModel.findById(userId);
      if (!user) {
        return res.status(404).send({ message: "user not found" });
      }
      const {password, ...otherDetails} = user._doc
      
      res.status(200).json({ otherDetails})
    } catch (error) {
      console.log("Inter server error: " + error);
      res
        .status(500)
        .send({ message: "Internal Server Error", error: error.message });
    }
  },
  
  changeAvatar: async (req, res, next) => {
    try {
      const userID = req.userID;

      let imageUrl;
      if (req.file) {
        const filePath = req.file.path;
        
        imageUrl = await ImageFileUpload(filePath);
        
      }else{
        console.log("Please select an image");
      }

      const userDoc = await userModel.findById(userID);
      if (!userDoc) {
        return res.status(404).json({ message: 'User not found' });
      }

      userDoc.avatarUrl = imageUrl;
      await userDoc.save();

      return res.status(200).json({ message: 'Avatar changed successfully', imageUrl});
    } catch (error) {
      console.log('An error occurred:', error);
      return res.status(500).json({ message: 'Internal Server Error', error });
    }
  },
};
export { userController };
const ImageFileUpload = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath); 
    

    fs.unlink(filePath, (err) => {
      if (err) {
        console.error('Error deleting file:', err);
      } else {
        console.log('File deleted successfully');
      }
    }); 

    return result.secure_url; 
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw error; 
  }
};