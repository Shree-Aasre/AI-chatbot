
// import React, { useState, useEffect } from "react";
// import { Send, Mic, VolumeX, Trash, Square } from "lucide-react";//icon
// import { getChatResponse } from "../api/gemini"; //responce from gemini
// import { speakText, stopSpeaking, startListening, stopListening } from "../utils/voice";
// import { motion } from "framer-motion";//motion
// import Tippy from '@tippyjs/react'; //tooltip
// import 'tippy.js/dist/tippy.css';//tooltipdesign

// function Chatbot() {
//   const [messages, setMessages] = useState([]);//Stores the conversation history (both user and chatbot messages)
//   const [input, setInput] = useState(""); //Tracks the user’s current text input
//   const [audioResponse, setAudioResponse] = useState(false);
//   const [isListening, setIsListening] = useState(false);//Tracks whether voice input is active

//   useEffect(() => {
//     const welcomeMessage = "Welcome! How can I assist you today?";// declearing welcome messsage 
//     setMessages([{ text: welcomeMessage, sender: "bot" }]);// displaying welcome message as like chatbot message
//     setTimeout(() => speakText(welcomeMessage), 1000); // Added slight delay for better user experience
//   }, []);

//   const sendMessage = async (text) => { //creating a funcion for 
//     if (!text) return; // check for input is empty  
//     const userMessage = { text, sender: "user" }; //creating user message object with text and sender to apply diffrent styles in display
//     setMessages((prev) => [...prev, userMessage]);//Appends it to the chat using 

//     const botReply = await getChatResponse(text);// set recived responce in botreplay
//     speakText(botReply);// speek botreply
//     const botMessage = { text: botReply, sender: "bot" };// set message  in constant for display as in the format of object 

//     setMessages((prev) => [...prev, botMessage]); //Bot’s reply is added to the message list.
//     setInput("");//make input field empty for new search
//   };

//   const handleVoiceStart = () => { // creating a function for serch with voice 
//     setIsListening(true); // indicates the microphone is active
//     startListening( // Activates the microphone, listens to your voice, and converts your speech into a transcript (text).
//       (transcript) => {  // on success,
//         sendMessage(transcript);// Sends the recognized text to the chatbot.
//         setIsListening(false);//  Turns off the mic and updates the state.
//       },
//       (error) => { // on error 
//         console.error("Recognition Error:", error); // print error 
//         setIsListening(false); //  Turns off the mic and updates the state.
//       }
//     );
//   };

//   const handleVoiceStop = () => {
//     stopListening();// end voice recognition.
//     setIsListening(false);// Updates state to reflect that voice input has stopped.


//   };

//   const clearChat = () => {
//     setMessages([]);// clears all messages by setting the state to an empty array.
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-black text-white ">
//       <motion.div
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="w-[100%] h-[90%]  p-6 bg-opacity-10 backdrop-blur-md bg-white/10 rounded-2xl border border-cyan-400 shadow-lg justify-between flex flex-col">
//         <h2 className="text-center text-4xl font-bold mb-4 underline bg-gradient-to-b from-blue-100 to-purple-500 bg-clip-text text-transparent">AI VoiseAssistence</h2>

//         <div className="h-80 overflow-auto p-4">
//           {messages.map((msg, index) => (
//             <p
//               key={index}
//               className={`p-3 my-2 rounded-lg max-w-[80%] ${msg.sender === "user" ? "bg-cyan-500 text-pretty ml-auto text-right" : "bg-gray-800 text-left"}`}
//             >
//               {msg.text}
//             </p>
//           ))}
//         </div>

//         <div className="flex  gap-2 mt-4 ">
//           <Tippy content="mic">
//             <button
//               onClick={handleVoiceStart}
//               className="p-3 bg-cyan-500 text-white rounded-full hover:bg-gradient-to-b from-blue-100 to-purple-500  hover:scale-125 transition"
//               disabled={isListening}
//             >
//               <Mic size={20} />
//             </button>
//           </Tippy>

         

//           <input
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             className="flex-1 p-2 text-black rounded-lg outline-none border-none bg-white shadow-inner focus:ring-2 focus:ring-cyan-400"
//             placeholder="Ask me ..."
//           />
//           <Tippy content="search">
//           <motion.button
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//             onClick={() => sendMessage(input)}
//             className="p-3 px-4 rounded-lg bg-transparent  text-white font-bold shadow-md border-2 border-cyan-500  hover:bg-cyan-500    "
//           >
//             <Send size={20} />
//           </motion.button>
//           </Tippy>

//           <Tippy content="clearchat">
//             <button
//               onClick={clearChat}
//               className="p-3 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition"
//             >
//               <Trash size={20} />
//             </button>
//           </Tippy>
//           <Tippy content="Mute">
//             <button
//               onClick={stopSpeaking}
//               className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
//             >
//               <VolumeX size={20} />
//             </button>
//           </Tippy>
//         </div>
//       </motion.div>
//     </div>
//   );
// }

// export default Chatbot;











// import React, { useState, useEffect } from "react";
// import { Send, Mic, VolumeX, Trash } from "lucide-react";
// import { getChatResponse } from "../api/gemini";
// import { speakText, stopSpeaking, startListening, stopListening } from "../utils/voice";
// import { motion } from "framer-motion";
// import Tippy from '@tippyjs/react';
// import 'tippy.js/dist/tippy.css';

// function Chatbot() {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [audioResponse, setAudioResponse] = useState(false);
//   const [isListening, setIsListening] = useState(false);
//   const [isTextMode, setIsTextMode] = useState(true);

//   useEffect(() => {
//     const welcomeMessage = "Welcome! How can I assist you today?";
//     setMessages([{ text: welcomeMessage, sender: "bot" }]);
//     setTimeout(() => speakText(welcomeMessage), 1000);
//   }, []);

//   const toggleMode = () => {
//     setIsTextMode((prevMode) => !prevMode);
//   };

//   const sendMessage = async (text) => {
//     if (!text) return;
//     const userMessage = { text, sender: "user" };
//     setMessages((prev) => [...prev, userMessage]);

//     const botReply = await getChatResponse(text);
//     speakText(botReply);
//     const botMessage = { text: botReply, sender: "bot" };

//     setMessages((prev) => [...prev, botMessage]);
//     setInput("");
//   };

//   const handleVoiceStart = () => {
//     setIsListening(true);
//     startListening(
//       (transcript) => {
//         sendMessage(transcript);
//         setIsListening(false);
//       },
//       (error) => {
//         console.error("Recognition Error:", error);
//         setIsListening(false);
//       }
//     );
//   };

//   const handleVoiceStop = () => {
//     stopListening();
//     setIsListening(false);
//   };

//   const clearChat = () => {
//     setMessages([]);
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-black text-white">
//       <motion.div
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="w-full h-90 p-6 bg-opacity-10 backdrop-blur-md bg-white/10 rounded-2xl border border-cyan-400 shadow-lg flex flex-col"
//       >
//         <h2 className="text-center text-4xl font-bold mb-4 underline bg-gradient-to-b from-blue-100 to-purple-500 bg-clip-text text-transparent">
//           AI Voice Assistance
//         </h2>

//         {isTextMode && (
//           <div className="h-80 overflow-auto p-4">
//             {messages.map((msg, index) => (
//               <p
//                 key={index}
//                 className={`p-3 my-2 rounded-lg max-w-80% ${msg.sender === "user" ? "bg-cyan-500 ml-auto text-right" : "bg-gray-800"}`}
//               >
//                 {msg.text}
//               </p>
//             ))}
//           </div>
//         )}

//         <div className="flex gap-2 mt-4">
//           <Tippy content={isTextMode ? "Only Voice" : "With Text"}>
//             <button
//               onClick={toggleMode}
//               className="p-3 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition"
//             >
//               {isTextMode ? "Only Voice" : "With Text"}
//             </button>
//           </Tippy>

//           <Tippy content="mic">
//             <button
//               onClick={handleVoiceStart}
//               className="p-3 bg-cyan-500 text-white rounded-full hover:bg-cyan-600 transition"
//               disabled={isListening}
//             >
//               <Mic size={20} />
//             </button>
//           </Tippy>

//           {isTextMode && (
//             <input
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               className="flex-1 p-2 text-black rounded-lg outline-none bg-white shadow-inner focus:ring-2 focus:ring-cyan-400"
//               placeholder="Ask me ..."
//             />
//           )}

//           {isTextMode && (
//             <Tippy content="search">
//               <motion.button
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.9 }}
//                 onClick={() => sendMessage(input)}
//                 className="p-3 px-4 rounded-lg bg-transparent text-white font-bold shadow-md border-2 border-cyan-500 hover:bg-cyan-500"
//               >
//                 <Send size={20} />
//               </motion.button>
//             </Tippy>
//           )}

//           <Tippy content="clearchat">
//             <button
//               onClick={clearChat}
//               className="p-3 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition"
//             >
//               <Trash size={20} />
//             </button>
//           </Tippy>
//           <Tippy content="Mute">
//             <button
//               onClick={stopSpeaking}
//               className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
//             >
//               <VolumeX size={20} />
//             </button>
//           </Tippy>
//         </div>
//       </motion.div>
//     </div>
//   );
// }

// export default Chatbot;

import React, { useState, useEffect } from "react";
import { Send, Mic, VolumeX, Trash } from "lucide-react";
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
    <div className="flex justify-center items-center h-screen bg-black text-white">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full h-90 p-6 bg-opacity-10 backdrop-blur-md bg-white/10 rounded-2xl border border-cyan-400 shadow-lg flex flex-col"
      >
        <h2 className="text-center text-4xl font-bold mb-4 underline bg-gradient-to-b from-blue-100 to-purple-500 bg-clip-text text-transparent">
          AI Voice Assistance
        </h2>

        <div className={`h-80 overflow-auto p-4 ${isTextMode ? 'visible' : 'invisible'}`}>
          {messages.map((msg, index) => (
            <p
              key={index}
              className={`p-3 my-2 rounded-lg max-w-80% ${msg.sender === "user" ? "bg-cyan-500 ml-auto text-right" : "bg-gray-800"}`}
            >
              {msg.text}
            </p>
          ))}
        </div>

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
              onClick={handleVoiceStart}
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
