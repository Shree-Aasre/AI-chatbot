import React from 'react'
import Chatbot from './Chatbot'
//import AvatarScene from './Avatar'


function Mainchatbot() {
  return (

    <div className="h-screen flex flex-col justify-between text-white">
      
      <div className="flex-1 flex flex-col md:flex-row">
        <div className="flex-1">
        <Chatbot/>
        </div>
        {/* <div className="flex-1 hidden md:block">
          <AvatarScene />
        </div> */}
      </div>
      
    </div>

  )
}

export default Mainchatbot
