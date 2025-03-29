import React, {useRef, useState, useEffect } from "react";
import { Send, Mic, VolumeX, Trash } from "lucide-react";
import { getChatResponse } from "../../api/gemini";
import { speakText, stopSpeaking, startListening, stopListening } from "../../utils/voice";
import { motion } from "framer-motion";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import ReactMarkdown from 'react-markdown';
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { AnimationMixer, LoopRepeat } from "three";

function RobotModel() {
  const { scene, animations } = useGLTF("/robot_playground.glb");
  const mixer = useRef(null);

  useEffect(() => {
    if (animations.length) {
      mixer.current = new AnimationMixer(scene);
      animations.forEach((clip) => {
        const action = mixer.current.clipAction(clip);
        action.setLoop(LoopRepeat, Infinity);
        action.play();
      });
    }
  }, [animations, scene]);

  useFrame((_, delta) => {
    mixer.current?.update(delta);
  });

  return (
    <primitive object={scene} scale={[1.5, 1.5, 1.5]} position={[0, -1, 0]} />
  ); // Increased size
}


function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isTextMode, setIsTextMode] = useState(true);
  const [isHovered, setIsHovered] = useState(false);


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
    <div className=" ddidddd flex  justify-center items-center h-screen bg-gray-300 text-white p-4 md:p-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-3xl h-full p-4 md:p-6 bg-opacity-10 backdrop-blur-md bg-white/10 rounded-2xl border border-cyan-400 shadow-lg flex flex-col justify-between"
      >
       <h2 className="text-center text-xl md:text-4xl font-bold mb-4 underline bg-gradient-to-r from-pink-600 via-purple-500 to-purple-900 bg-clip-text text-transparent animate-gradient drop-shadow-lg">
  AI Voice Assistance
</h2>




        {isTextMode ? (
          <div className="flex-1 overflow-auto p-2 md:p-4 max-h-[60vh] w-full">
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className={`p-3 md:p-4 my-2 rounded-xl text-white text-sm md:text-base break-words whitespace-pre-wrap  max-w-full md:max-w-[75%] overflow-hidden
                   ${msg.sender === "user" ? " text-right bg-gradient-to-r from-cyan-500 to-blue-600 ml-auto" : "bg-gradient-to-l from-gray-700 to-gray-900"}`}
              >
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="h-100vh flex flex-col justify-center items-center bg-gradient-to-b from-gray-300 to-white"
        
        >
          <Canvas style={{ height: "70vh", width: "100vw " }}>
            <ambientLight intensity={0.8} />
            <directionalLight position={[10, 10, 5]} intensity={1.5} />
            <RobotModel />
            <OrbitControls />
          </Canvas>
        </div>

        )}
        <div className="flex items-center justify-between flex-wrap  mb-12 gap-2 mt-4">
          <Tippy content={isTextMode ? "Only Voice" : "With Text"}>
            <button
              onClick={toggleMode}
              className=" bg-transparent text-white rounded-full hover:scale-125 transition"
            >
              <img
                src={isTextMode ? "ov.gif" : "/quote.gif"}
                alt=""
                className="size-12 object-contain rounded-full" 
              /> 
              
            </button>
          </Tippy>

          <Tippy content="Mic">
      <motion.button
        onPointerDown={handleVoiceStart}
        onPointerUp={handleVoiceStop}
        onPointerLeave={handleVoiceStop}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        disabled={isListening}
        className="text-white border-2 border-black rounded-full p-3"
        initial={{ scale: 1 }}
        animate={{
          scale: isHovered ? 1.2 : 1,
          boxShadow: isHovered
            ? "0px 0px 20px rgba(0, 255, 255, 0.8)"
            : "0px 0px 8px rgba(0, 0, 0, 0.2)",
        }}
        whileTap={{
          scale: 0.9,
          rotate: 360,
          transition: { duration: 0.4, ease: "easeInOut" }
        }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        <Mic size={20} color="black" />
      </motion.button>
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
              className="flex-1 p-2 text-black rounded-lg outline-none bg-white border-3 border-cyan-500 sm:w-auto "
              placeholder="Ask me ..."
            />
          )}

          {input.trim() !== "" && (
            <Tippy content="send">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => sendMessage(input)}
                className="p-3 px-4 rounded-lg bg-transparent text-cyan-500 font-bold shadow-md border-2 border-cyan-500 hover:bg-cyan-500 hover:text-black"
              >
                <Send size={20} />
              </motion.button>
            </Tippy>
          )}

          <Tippy content="clearchat">
            <button
              onClick={clearChat}
              className=" bg-gray-500 text-white rounded-full hover:scale-125 transition"
            >
               <img
                src="/bin.gif"
                alt="Silent"
                className="size-12 object-fit rounded-full"
              />
            </button>
          </Tippy>

          <Tippy content="Mute">
            <button
              onClick={stopSpeaking}
              className="  text-white rounded-full hover:scale-125 transition "
            >
              <img
                src="/noa.gif"
                alt="Silent"
                className="size-12 object-fit rounded-full"
              />
            </button>
          </Tippy>
        </div>
      </motion.div>
    </div>
  );
}

export default Chatbot;
