const { GoogleGenerativeAI } = require("@google/generative-ai");

const generateItinerary = async (extractedText) => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("Gemini API key is missing");
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });

  const prompt = `
You are an AI travel assistant.

Generate a structured and practical travel itinerary from the booking details below.

Return the itinerary in this format:

Trip Summary:
- 

Travel Details:
- 

Accommodation Details:
- 

Day-wise Itinerary:
Day 1:
- 

Day 2:
- 

Important Reminders:
- 

Missing Information:
- 

Booking Details:
${extractedText}
`;

  const result = await model.generateContent(prompt);
  const response = result.response.text();

  if (!response || response.trim().length === 0) {
    throw new Error("AI did not return any itinerary");
  }

  return response;
};

module.exports = generateItinerary;