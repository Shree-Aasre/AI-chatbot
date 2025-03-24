// import React, { useState } from 'react';
// import { getChatResponse } from '../api/gemini';
// import { speakText } from '../utils/voice';

// function Chatbot() {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');

//   const sendMessage = async () => {
//     if (!input) return;
//     const userMessage = { text: input, sender: 'user' };
//     setMessages((prev) => [...prev, userMessage]);

//     const botReply = await getChatResponse(input);
//     const botMessage = { text: botReply, sender: 'bot' };

//     speakText(botReply);
//     setMessages((prev) => [...prev, botMessage]);
//     setInput('');
//   };

//   return (
//     <div className="p-4 bg-black text-white">
//       <div className="h-80 overflow-auto">
//         {messages.map((msg, index) => (
//           <p key={index} className={msg.sender === 'user' ? 'text-right' : 'text-left'}>
//             {msg.text}
//           </p>
//         ))}
//       </div>
//       <input
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//         className="w-full p-2 mt-2 text-white border-2 border-amber-50 rounded-2xl"
//       />
//       <button onClick={sendMessage} className="mt-2 p-2 bg-neon">Send</button>
//     </div>
//   );
// }

// export default Chatbot;


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

  return (
    <div className="p-4 bg-black text-white">
      <div className="h-80 overflow-auto">
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
      <button onClick={() => sendMessage(input)} className="mt-2 p-2 bg-neon">Send</button>
      <button onClick={stopSpeaking} className="mt-2 p-2 bg-red-500">Stop Speaking</button>
      <button onClick={handleVoiceRecognition} className="mt-2 p-2 bg-green-500">Listening</button>
    </div>
  );
}

export default Chatbot;
