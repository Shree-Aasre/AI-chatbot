import axios from 'axios';
import { log } from 'three/tsl';

// Securely access API key from .env

const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyAycMzmk1JToXTT7oGISeDVnyzvr5arNpI`;

export const getChatResponse = async (message) => { // messsage coming from innput type
  
  
  try {
    const response = await axios.post(GEMINI_API_URL, { //sends a POST request to the Gemini API.
      contents: [{ parts: [{ text: ` tou are the english teacher and story teler user can talk anything you cn reply like a normal human ${message} ` }] }], //object contains the user's message, formatted as required by Gemini API.
    });

    console.log('Full API Response:', response.data); //prints response from api

    const reply = response?.data?.candidates?.[0]?.content?.parts?.[0]?.text;// i use optional chaining to safely extract the reply from api
    if (!reply) { 
      console.error('Invalid API Response:', response.data);//prints the error
      return 'Sorry, I could not understand the response.';
    }

    return reply; //returns extracted reply text 
  } catch (error) {
    console.error('API Error:', error?.response?.data || error.message);//prints error in try catch 
    return 'Sorry, something went wrong.';
  }
};

