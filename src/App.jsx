import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import AvatarScene from './components/Avatar';
import Chatbot from './components/Chatbot';

function App() {
  return (
    <div className="h-screen flex flex-col justify-between bg-red-400 text-white">
      <Header />
      <div className="flex-1 flex flex-col md:flex-row">
        <div className="flex-1">
          <AvatarScene />
        </div>
        <div className="flex-1">
          <Chatbot />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;