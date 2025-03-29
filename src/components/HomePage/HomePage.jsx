import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import "../../Styles/HomePage.css";
import { useNavigate } from 'react-router-dom'; // Import useNavigate


const HomePage = () => {
  const bubblesRef = useRef([]);
  const navigate = useNavigate(); // Initialize navigate function

  useEffect(() => {
    bubblesRef.current.forEach((bubble, index) => {
      gsap.to(bubble, {
        y: -window.innerHeight,
        x: `+=${Math.random() * 300 - 150}`,
        duration: 5 + Math.random() * 5,
        repeat: -1,
        ease: 'sine.inOut'
      });
    });
  }, []);

  
  const handleRedirect = () => {
    navigate("/chatbot"); // Redirect to chatbot page
  };

  return (
    <div className="homepage">
      <div className="glass-container">
        <h1 className="title">Welcome to the AI voice Assistant</h1>
       <p className="subtitle">Experience AI like never before
       </p>
       <button onClick={handleRedirect} className="arrow-button"></button>
       
      </div>

      {[...Array(50)].map((_, i) => (
  <div
    key={i}
    className="bubble"
    style={{
      '--x': Math.random(),
      '--y': Math.random(),
      '--x2': Math.random(),
      '--y2': Math.random()
    }}
  />
))}


    </div>
  );
};

export default HomePage;
