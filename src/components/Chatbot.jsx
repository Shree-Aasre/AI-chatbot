


// import React, { useState } from 'react';
// import { getChatResponse } from '../api/gemini';
// import { speakText, stopSpeaking, startListening } from '../utils/voice';

// function Chatbot() {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');

//   const sendMessage = async (text) => {
//     if (!text) return;
//     const userMessage = { text, sender: 'user' };
//     setMessages((prev) => [...prev, userMessage]);

//     const botReply = await getChatResponse(text);
//     const botMessage = { text: botReply, sender: 'bot' };

//     speakText(botReply);
//     setMessages((prev) => [...prev, botMessage]);
//     setInput('');
//   };

//   const handleVoiceRecognition = () => {
//     startListening(
//       (transcript) => {
//         console.log('Voice Input:', transcript);
//         sendMessage(transcript);
//       },
//       (error) => {
//         console.error('Recognition Error:', error);
//       }
//     );
//   };

//   const clearChat = () => {
//     setMessages([]);
//     console.log('Chat cleared.');
//   };

//   return (
//     <div className="p-4 bg-black text-white">
//       <div className="h-[72vh] overflow-auto">
//         {messages.map((msg, index) => (
//           <p key={index} className={msg.sender === 'user' ? 'text-right' : 'text-left'}>
//             {msg.text}
//           </p>
//         ))}
//       </div>

//       <div className="relative">
//       <input
//         value={input}
//         placeholder="Ask me...."
//         onChange={(e) => setInput(e.target.value)}
//         className="w-full p-2 mt-2 text-white border-2 border-amber-50 rounded-2xl"
//       />
//       <button onClick={() => sendMessage(input)}  className="  absolute right-2 top-1/2 transform -translate-y-1/2 bg-neon text-white p-2 rounded-xl">Send</button>
//       </div>

//       <div className='flex justify-evenly '>
//        <button onClick={stopSpeaking} className="mt-2 p-2 bg-red-500 rounded-xl">Stop Speaking</button>
//       <button onClick={handleVoiceRecognition} className="mt-2 p-2 bg-green-500 rounded-xl">listen</button>
//       <button onClick={clearChat} className="mt-2 p-2 bg-gray-500 rounded-xl">Clear Chat</button>
//       </div>

//     </div>
//   );
// }

// export default Chatbot;

import React, { useState, useEffect } from "react";
import { Send, Mic, VolumeX, Trash, Square } from "lucide-react";
import { getChatResponse } from "../api/gemini";
import { speakText, stopSpeaking, startListening, stopListening } from "../utils/voice";
import { motion } from "framer-motion";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [audioResponse, setAudioResponse] = useState(false);
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    const welcomeMessage = "Welcome! How can I assist you today?";
    setMessages([{ text: welcomeMessage, sender: "bot" }]);
    setTimeout(() => speakText(welcomeMessage), 1000); // Added slight delay for better UX
  }, []);

  const sendMessage = async (text) => {
    if (!text) return;
    const userMessage = { text, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);

    const botReply = await getChatResponse(text);
    speakText(botReply);
    const botMessage = { text: botReply, sender: "bot" };

    setMessages((prev) => [...prev, botMessage]);
    setInput("");
  };

  const handleVoiceStart = () => {
    setIsListening(true);
    startListening(
      (transcript) => {
        sendMessage(transcript);
        setIsListening(false);
      },
      (error) => {
        console.error("Recognition Error:", error);
        setIsListening(false);
      }
    );
  };

  const handleVoiceStop = () => {
    stopListening();
    setIsListening(false);
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black text-white ">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-[100%] h-[90%]  p-6 bg-opacity-10 backdrop-blur-md bg-white/10 rounded-2xl border border-cyan-400 shadow-lg justify-between flex flex-col">
        <h2 className="text-center text-4xl font-bold mb-4 underline bg-gradient-to-b from-blue-100 to-purple-500 bg-clip-text text-transparent">AI Chatbot</h2>

        <div className="h-80 overflow-auto p-4">
          {messages.map((msg, index) => (
            <p
              key={index}
              className={`p-3 my-2 rounded-lg max-w-[80%] ${msg.sender === "user" ? "bg-cyan-500 text-pretty ml-auto text-right" : "bg-gray-800 text-left"}`}
            >
              {msg.text}
            </p>
          ))}
        </div>

        <div className="flex  gap-2 mt-4 ">
          <Tippy content="mic">
            <button
              onClick={handleVoiceStart}
              className="p-3 bg-cyan-500 text-white rounded-full hover:bg-gradient-to-b from-blue-100 to-purple-500  hover:scale-125 transition"
              disabled={isListening}
            >
              <Mic size={20} />
            </button>
          </Tippy>

         

          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-2 text-black rounded-lg outline-none border-none bg-white shadow-inner focus:ring-2 focus:ring-cyan-400"
            placeholder="Ask me ..."
          />
          <Tippy content="search">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => sendMessage(input)}
            className="p-3 px-4 rounded-lg bg-transparent  text-white font-bold shadow-md border-2 border-cyan-500  hover:bg-cyan-500    "
          >
            <Send size={20} />
          </motion.button>
          </Tippy>

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
