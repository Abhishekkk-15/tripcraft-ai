const express = require("express");
const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const {
  uploadDocument,
  getUserItineraries,
} = require("../controllers/uploadController");

const router = express.Router();

router.post("/", protect, upload.single("document"), uploadDocument);
router.get("/history", protect, getUserItineraries);

module.exports = router;