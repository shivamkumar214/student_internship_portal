import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  console.log("signup page");
  try {
    const { name, email, phone, college, course, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User Already Exists",
      });
    }

    // const hashedPassword = await bcrypt.hash(password, 10);

    // const user = await User.create({
    //   name,
    //   email,
    //   phone,
    //   college,
    //   course,
    //   password: hashedPassword,
    // });

    // const newUser = await User.findById(user._id).select("-password");
    // const token = jwt.sign({ id: newUser._id, }, process.env.JWT_SECRET,
    //   {
    //     expiresIn: "7d",
    //   },
    // );
    // console.log(token);

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
    });

    console.log("3");

    const newUser = await User.findById(user._id).select("-password");

    console.log("4");

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
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

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    const userData = await User.findById(user._id).select("-password");

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, //7day = 7*24hr*60mint*60sec*1000milliseconds
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
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
