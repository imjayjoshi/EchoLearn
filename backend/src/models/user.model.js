const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["learner", "admin"],
      default: "learner",
    },
    streak: {
      type: Number,
      default: 0,
    },
    lastLogin: {
      type: Date,
      default: null,
    },
    badges: {
      type: [String],
      enum: [
        "Word Whisperer",
        "Sound Scout",
        "Voice Voyager",
        "Fluency Fighter",
        "Accent Ace",
        "SpeakWise Legend",
      ],
      default: ["Word Whisperer"],
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: false,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
