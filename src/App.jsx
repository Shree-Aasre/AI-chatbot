import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import AvatarScene from './components/Avatar';
import Chatbot from './components/Chatbot';

function App() {
  return (
    <div className="h-screen flex flex-col justify-between bg-black text-white">
      
      <div className="flex-1 flex flex-col md:flex-row">
        <div className="flex-1">
        <Chatbot />
        </div>
        <div className="flex-1">
          <AvatarScene />
        </div>
      </div>
      
    </div>
  );
}

export default App;