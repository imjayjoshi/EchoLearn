const mongoose = require("mongoose");

const phraseSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },
    meaning: {
      type: String,
      trim: true,
    },
    example: {
      type: String,
      trim: true,
    },
    language: {
      type: String,
      default: "English",
    },
    level: {
      type: String,
      enum: ["beginner", "intermediate", "expert"],
      required: true,
    },
    audioUrl: {
      type: String, // generated TTS link for phrase text
      default: null,
    },
    audioMeaningUrl: {
      type: String, // generated TTS link for meaning text
      default: null,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Phrase = mongoose.model("Phrase", phraseSchema);

module.exports = Phrase;
