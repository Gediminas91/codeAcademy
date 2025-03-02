import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateTaskSuggestion = async (taskDescription) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are an AI assistant that helps suggest tasks based on user input.",
        },
        {
          role: "user",
          content: `Suggest a task related to: ${taskDescription}`,
        },
      ],
      max_tokens: 100,
    });

    return response.choices[0]?.message?.content.trim();
  } catch (error) {
    console.error("AI Task Suggestion Error:", error);

    if (error.response) {
      console.error(
        "OpenAI API Error:",
        error.response.status,
        error.response.data
      );
      throw new Error(
        `OpenAI API error: ${
          error.response.data.error.message || "Unknown error"
        }`
      );
    } else if (error.request) {
      console.error("OpenAI request failed, no response received.");
      throw new Error("OpenAI API is unreachable. Please try again later.");
    } else {
      console.error("Unexpected AI error:", error.message);
      throw new Error("Unexpected AI failure. Please try again.");
    }
  }
};
