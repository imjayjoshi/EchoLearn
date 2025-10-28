const express = require("express");
const { authUser, authAdmin } = require("../middlewares/auth.middleware");
const phraseController = require("../controllers/phrase.controller");
const router = express.Router();

// ADMIN ROUTES (Protected - Admin Only)

router.post("/add", authAdmin, phraseController.addPhrase); // Add new phrase
router.get("/all", authAdmin, phraseController.getAllPhrases); // Get all phrases
router.put("/:id", authAdmin, phraseController.updatePhrase); // Update a phrase
router.delete("/:id", authAdmin, phraseController.deletePhrase); // Delete a phrase

// USER ROUTES (Protected - All Users)

router.get("/level/:level", authUser, phraseController.getPhrasesByLevel); // Get phrases by level
router.get(
  "/language/:language",
  authUser,
  phraseController.getPhrasesByLanguage
); // Get phrases by language

router.get("/user/practiced", authUser, phraseController.getPracticedPhrases); // Get practiced phrases for the logged-in user
router.get("/user/progress", authUser, phraseController.getUserProgress); // Get user's progress statistics
router.post("/practice/:id", authUser, phraseController.markPhraseAsPracticed); // Mark phrase as practiced
router.get("/:id", authUser, phraseController.getPhraseById); // Get a single phrase by ID

module.exports = router;
