import axios from 'axios';

// Securely access API key from .env

const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyAycMzmk1JToXTT7oGISeDVnyzvr5arNpI`;

export const getChatResponse = async (message) => {
  try {
    const response = await axios.post(GEMINI_API_URL, {
      contents: [{ parts: [{ text: message }] }],
    });

    console.log('Full API Response:', response.data); // Debugging

    const reply = response?.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!reply) {
      console.error('Invalid API Response:', response.data);
      return 'Sorry, I could not understand the response.';
    }

    return reply;
  } catch (error) {
    console.error('API Error:', error?.response?.data || error.message);
    return 'Sorry, something went wrong.';
  }
};
