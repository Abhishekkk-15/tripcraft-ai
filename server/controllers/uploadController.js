const fs = require("fs");
const extractTextFromFile = require("../services/extractTextService");
const generateItinerary = require("../services/aiService");
const Itinerary = require("../models/Itinerary");

const uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    let extractedText;

    try {
      extractedText = await extractTextFromFile(
        req.file.path,
        req.file.mimetype
      );
    } finally {
      if (req.file?.path && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
    }

    if (!extractedText || extractedText.trim().length === 0) {
      return res.status(400).json({
        message: "Could not extract text from document",
      });
    }

    let itineraryText;

    try {
      itineraryText = await generateItinerary(extractedText);
    } catch (aiError) {
      itineraryText = `
TripCraft AI Demo Itinerary

Trip Summary:
Your travel document was uploaded and text was extracted successfully.

Extracted Booking Details:
${extractedText}

Day-wise Plan:
Day 1:
- Check your booking details
- Reach airport/station on time
- Complete check-in
- Travel to destination
- Check in to hotel

Day 2:
- Explore nearby attractions
- Keep booking documents ready
- Follow your travel schedule

Important Reminders:
- Carry ID proof
- Keep tickets and hotel booking accessible
- Check baggage and timing details

Note:
AI quota is currently unavailable, so this fallback itinerary was generated.
`;
    }

    const itinerary = await Itinerary.create({
      user: req.user._id,
      documentName: req.file.originalname,
      extractedText,
      itinerary: itineraryText,
    });

    res.status(200).json({
      message: "Itinerary generated successfully",
      data: itinerary,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserItineraries = async (req, res) => {
  try {
    const itineraries = await Itinerary.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      data: itineraries,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  uploadDocument,
  getUserItineraries,
};