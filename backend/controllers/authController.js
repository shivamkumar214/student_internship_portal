import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {

  console.log("signup page");
  try {
    const { name, email, phone, college, course, password } = req.body;
    
    console.log("for signup , ", email, password)

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User Already Exists",
      });
    }
    console.log("1");

    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("2");

    const user = await User.create({
      name,
      email,
      phone,
      college,
      course,
      password: hashedPassword,
      role: "student"
    });

    console.log("3");

    const newUser = await User.findById(user._id).select("-password");

    console.log("4");

    const token = jwt.sign({ id: newUser._id , role: newUser.role}, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    console.log("5", token);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, //7day = 7*24hr*60mint*60sec*1000milliseconds
      sameSite: "strict",
      secure: false,
    });

    res.status(201).json({
      success: true,
      message: "Registration Successful",
      newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (
      email == process.env.ADMIN_EMAIL &&
      password == process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(
        {
          id: "admin",
          role: "admin",
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        },
      );

      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: "strict",
        secure: false,
      });

      return res.status(200).json({
        success: true,
        message: "Admin Login Successful",
        role: "admin",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Password",
      });
    }

    const token = jwt.sign({
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );
    const userData = await User.findById(user._id).select("-password");

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, //7days = 7*24hr *60mint*60sec*1000milliseconds
      sameSite: "strict",
      secure: false,
    });

    res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      userData,
    });
  } catch (error) {
    console.log("catch error from authController while login")
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
