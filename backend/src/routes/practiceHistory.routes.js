const express = require("express");
const { authUser } = require("../middlewares/auth.middleware");
const practiceHistoryController = require("../controllers/practiceHistory.controller");
const router = express.Router();

// save practice result
router.post(
  "/practice/:phraseId",
  authUser,
  practiceHistoryController.savePracticeResult
);

// get User's practice History
router.get(
  "/history",
  authUser,
  practiceHistoryController.getUserPracticeHistory
);

// get User statistics
router.get(
  "/statistics",
  authUser,
  practiceHistoryController.getUserStatistics
);

// get practice historyt for specific phrase
router.get(
  "/phrase/:phraseId",
  authUser,
  practiceHistoryController.getPhrasePracticeHistory
);

module.exports = router;
