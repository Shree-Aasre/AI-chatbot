// // voice.js - Text-to-Speech using Web Speech API

// // Speak the provided text using browser's Speech Synthesis API
// export const speakText = (text) => {
//     if (!window.speechSynthesis) {
//       console.error('Speech synthesis is not supported in this browser.');
//       return;
//     }
  
//     const utterance = new SpeechSynthesisUtterance(text);
  
//     // Set voice and other properties
//     utterance.lang = 'en-US'; // You can change this to other languages like 'en-GB' or 'fr-FR'
//     utterance.rate = 1; // 1 is the normal speed, adjust if needed
//     utterance.pitch = 1; // Adjust pitch, 1 is normal
//     utterance.volume = 1; // Volume from 0 to 1
  
//     // Speak the text
//     window.speechSynthesis.speak(utterance);
  
//     console.log('Speaking:', text);
//   };
  
//   // Optional: Stop any ongoing speech
//   export const stopSpeaking = () => {
//     if (window.speechSynthesis.speaking) {
//       window.speechSynthesis.cancel();
//       console.log('Speech stopped.');
//     }
//   };
  
//   // Optional: List available voices
//   export const listVoices = () => {
//     const voices = window.speechSynthesis.getVoices();
//     console.log('Available voices:', voices);
//   };
  

// voice.js - Text-to-Speech using Web Speech API

// Speak the provided text using browser's Speech Synthesis API





export const speakText = (text) => { //Allows the function to be imported and used in other files, Function that converts text to speech, text comes from chatbot.jsx
  if (!window.speechSynthesis) { // Built-in Web Speech API that handles text-to-speech
    console.error("Speech synthesis is not supported in this browser.");
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text); // Object representing the text to be spoken. & (Text) The input provided by the user for speech synthesis.
  utterance.lang = "en-US";
  utterance.rate = 1;//Controls the speed of speech
  utterance.pitch = 1;
  utterance.volume = 1;

  utterance.onstart = () => console.log("Speaking:", text);
  utterance.onend = () => console.log("Speech finished.");

  window.speechSynthesis.speak(utterance);
};

// Stop any ongoing speech
export const stopSpeaking = () => {
  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
    console.log("Speech stopped.");
  }
};

// Voice recognition using Web Speech API
export const startListening = (onResult, onError) => {
  if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
    console.error("Speech recognition not supported in this browser.");
    return;
  }

  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    console.log("Recognized:", transcript);
    onResult(transcript);
  };

  recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
    if (onError) onError(event.error);
  };

  recognition.onend = () => {
    console.log("Speech recognition ended.");
  };

  recognition.start();
  console.log("Listening...");
  window.speechRecognitionInstance = recognition;
};

// Stop listening manually
export const stopListening = () => {
  if (window.speechRecognitionInstance) {
    window.speechRecognitionInstance.stop();
    console.log("Speech recognition manually stopped.");
  }
};
