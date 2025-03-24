


import React, { useState } from 'react';
import { getChatResponse } from '../api/gemini';
import { speakText, stopSpeaking, startListening } from '../utils/voice';

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async (text) => {
    if (!text) return;
    const userMessage = { text, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);

    const botReply = await getChatResponse(text);
    const botMessage = { text: botReply, sender: 'bot' };

    speakText(botReply);
    setMessages((prev) => [...prev, botMessage]);
    setInput('');
  };

  const handleVoiceRecognition = () => {
    startListening(
      (transcript) => {
        console.log('Voice Input:', transcript);
        sendMessage(transcript);
      },
      (error) => {
        console.error('Recognition Error:', error);
      }
    );
  };

  const clearChat = () => {
    setMessages([]);
    console.log('Chat cleared.');
  };
  
  return (
    <div className="p-4 bg-black text-white">
      <div className="h-[72vh] overflow-auto">
        {messages.map((msg, index) => (
          <p key={index} className={msg.sender === 'user' ? 'text-right' : 'text-left'}>
            {msg.text}
          </p>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full p-2 mt-2 text-white border-2 border-amber-50 rounded-2xl"
      />
      <div className='flex justify-evenly '>
      <button onClick={() => sendMessage(input)} className=" bg-gray-200 border-5 border-red-500 text-black mt-2 p-2 bg-neon rounded-xl">Send</button>
      <button onClick={stopSpeaking} className="mt-2 p-2 bg-red-500 rounded-xl">Stop Speaking</button>
      <button onClick={handleVoiceRecognition} className="mt-2 p-2 bg-green-500 rounded-xl">listen</button>
      <button onClick={clearChat} className="mt-2 p-2 bg-gray-500 rounded-xl">Clear Chat</button>
      </div>
      
    </div>
  );
}

export default Chatbot;
