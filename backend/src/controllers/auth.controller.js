const express = require("express");
const cookieParser = require("cookie-parser");
const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
  const { fullName, email, password } = req.body;

  const isUserAlreadyExists = await userModel.findOne({ email });
  if (isUserAlreadyExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    fullName,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET
  );
  res.cookie("token", token);

  res.status(200).json({
    message: "User Created Successfully",
    user: {
      id: user._id,
      fullName: user.fulllName,
      email: user.email,
      streak: user.streak,
      badges: user.badges,
    },
  });
}

async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const today = new Date();
    const lastLogin = user.lastLogin;

    if (lastLogin) {
      const diffInDays = Math.floor(
        (today - new Date(lastLogin)) / (1000 * 60 * 60 * 24)
      );

      if (diffInDays === 1) {
        // increase streak
        user.streak += 1;
      } else if (diffInDays > 1) {
        // reset streak
        user.streak = 0;
      }
      // no change
    } else {
      // First ever login
      user.streak = 1;
    }

    // Update last login to current time
    user.lastLogin = today;
    await user.save();

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login Successful",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        streak: user.streak,
        badges: user.badges,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
}

async function logoutUser(req, res) {
  res.clearCookie("token");
  res.status(200).json({ message: "Logout Successful" });
}

async function getLoggedInUser(req, res) {
  try {
    const user = req.user; // from middleware
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        streak: user.streak,
        badges: user.badges,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getLoggedInUser
};
