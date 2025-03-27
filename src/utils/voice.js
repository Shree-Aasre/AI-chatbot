
export const speakText = (text) => {
  if (!window.speechSynthesis) {
    console.error("Speech synthesis is not supported in this browser.");
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 1;
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
let recognitionInstance = null;


export const startListening = (onResult, onError, continuous = false) => {
  if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
    console.error("Speech recognition not supported in this browser.");
    return;
  }

  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.continuous = continuous;

  recognition.onresult = (event) => {
    const transcript = event.results[event.results.length - 1][0].transcript;
    onResult(transcript);
  };

  recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
    if (onError) onError(event.error);
  };

  recognition.onend = () => {
    console.log("Recognition ended.");
    if (continuous && recognitionInstance) {
      console.log("Restarting recognition...");
      recognition.start(); // Restart only if still active
    }
  };

  recognition.start();
  console.log("Listening...");
  recognitionInstance = recognition;
};

export const stopListening = () => {
  if (recognitionInstance) {
    console.log("Stopping recognition...");
    recognitionInstance.onend = null; // Prevent restart loop
    recognitionInstance.stop();
    recognitionInstance = null;
  }
};