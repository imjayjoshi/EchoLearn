const express = require("express");
const userModel = require("../models/user.model");
const phraseModel = require("../models/phrase.model");

async function addPhrase(req, res) {
  const { text, meaning, example, language, level, audioUrl } = req.body;
}
