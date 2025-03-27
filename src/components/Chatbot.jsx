

import React, { useState, useEffect } from "react";
import { Send, Mic, VolumeX, Trash } from "lucide-react";
import { getChatResponse } from "../api/gemini";
import { speakText, stopSpeaking, startListening, stopListening } from "../utils/voice";
import { motion } from "framer-motion";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import ReactMarkdown from 'react-markdown';

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isTextMode, setIsTextMode] = useState(true);

  useEffect(() => {
    const welcomeMessage = "Welcome! How can I assist you today?";
    setMessages([{ text: welcomeMessage, sender: "bot" }]);
    setTimeout(() => speakText(welcomeMessage), 1000);
  }, []);

  const toggleMode = () => {
    setIsTextMode((prevMode) => !prevMode);
  };

  const sendMessage = async (text) => {
    if (!text) return;
    const userMessage = { text, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);

    // Show "Bot is typing..."
    const typingMessage = { text: "Bot is typing...", sender: "bot", typing: true };
    setMessages((prev) => [...prev, typingMessage]);

    try {
      const botReply = await getChatResponse(text);

      // Remove "Bot is typing..." and add real response
      setMessages((prev) =>
        prev.filter((msg) => !msg.typing).concat({ text: botReply, sender: "bot" })
      );

      speakText(botReply); // Speak the bot’s response
    } catch (error) {
      console.error("Error getting bot response:", error);

      setMessages((prev) =>
        prev.filter((msg) => !msg.typing).concat({ text: "Sorry, I couldn't respond.", sender: "bot" })
      );
    }

    setInput(""); // Clear input field

  };

  const handleVoiceStart = () => {
    if (!isListening) {
      setIsListening(true);
      startListening(
        (transcript) => {
          sendMessage(transcript);
          setIsListening(false);
        },
        (error) => {
          console.error("Recognition Error:", error);
          setIsListening(false);
        },
        true //Enable continous listning
      );
    }
  };

  const handleVoiceStop = () => {
    stopListening();
    setIsListening(false);
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black text-white">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full h-full p-6 bg-opacity-10 backdrop-blur-md bg-white/10 rounded-2xl border border-cyan-400 shadow-lg flex flex-col justify-between"
      >
        <h2 className="text-center text-4xl font-bold mb-4 underline bg-gradient-to-b from-blue-100 to-purple-500 bg-clip-text text-transparent">
          AI Voice Assistance
        </h2>


        {isTextMode ? (
          <div className="flex-1 overflow-auto p-4">
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className={`p-4 my-2 rounded-3xl text-white max-w-[80%] ${msg.sender === "user" ? "bg-gradient-to-r from-cyan-500 to-blue-600 ml-auto" : "bg-gradient-to-l from-gray-700 to-gray-900"}`}
              >
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </motion.div>
            ))}
          </div>
        ) : (
          <video className="flex-1 w-full h-full object-cover" autoPlay loop muted>
            <source src="/ai.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
        <div className="flex justify-between flex-wrap gap-2 mt-4">
          <Tippy content={isTextMode ? "Only Voice" : "With Text"}>
            <button
              onClick={toggleMode}
              className="p-3 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition"
            >
              {isTextMode ? "Only Voice" : "With Text"}
            </button>
          </Tippy>

          <Tippy content="mic">
            <button
              onPointerDown={handleVoiceStart}  // Start listening on press
              onPointerUp={handleVoiceStop}    // Stop listening when released
              onPointerLeave={handleVoiceStop} // Stop if mouse leaves button
              className="p-3 bg-cyan-500 text-white rounded-full hover:bg-cyan-600 transition"
              disabled={isListening}
            >
              <Mic size={20} />
            </button>
          </Tippy>

          {isTextMode && (
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  sendMessage(input)
                }
              }}
              className="flex-1 p-2 text-black rounded-lg outline-none bg-white shadow-inner focus:ring-2 focus:ring-cyan-400"
              placeholder="Ask me ..."
            />
          )}

          {isTextMode && (
            <Tippy content="search">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => sendMessage(input)}
                className="p-3 px-4 rounded-lg bg-transparent text-white font-bold shadow-md border-2 border-cyan-500 hover:bg-cyan-500"
              >
                <Send size={20} />
              </motion.button>
            </Tippy>
          )}

          <Tippy content="clearchat">
            <button
              onClick={clearChat}
              className="p-3 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition"
            >
              <Trash size={20} />
            </button>
          </Tippy>

          <Tippy content="Mute">
            <button
              onClick={stopSpeaking}
              className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
            >
              <VolumeX size={20} />
            </button>
          </Tippy>
        </div>
      </motion.div>
    </div>
  );
}

export default Chatbot;
