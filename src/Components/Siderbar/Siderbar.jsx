import React, { useContext, useState } from 'react'
import './Siderbar.css'
import {assets} from '../../assets/assets'
import { Context } from '../../context/context'

const Siderbar = () => {
  const [extended,setExtended]=useState(false)
  const {onSent,setRecentPrompt,newChat}=useContext(Context);
  const [prevPrompts, setPrevPrompts] = useState([]);

  
  const loadprompt=async(prompt)=>{
    setRecentPrompt(prompt)
    await onSent(prompt)
  }


  return (
    <div className='Siderbar'>

        <div className="top">
            
         <img onClick={()=>setExtended(prev=>!prev)} src={assets.menu_icon} alt="Menu icon" className='Menu' />
         <div onClick={()=>newChat()}className="new-chat">
            <img src={assets.plus_icon} alt="plus-icon" />
            {extended?<p>New Chat</p>:null}
         </div>

         {extended
         ?
         <div className="recent">
            <p className="recent-title">
                Recent
            </p>
            {prevPrompts && prevPrompts.length > 0 ? (
    prevPrompts.map((item, index) => (
        <div onClick={() => loadprompt(item)} className="recent-entry" key={index}>
            <img src={assets.message_icon} alt="" />
            <p>{item.slice(0, 18)}.....</p>
        </div>
    ))
) : (
    <p>No recent prompts</p>
)}

            
         </div> 
         : null
}

        </div>


        <div className="bottom">
          <div className="bottom-item recent-entry">
            <img src={assets.question_icon} alt="" />
            {extended?<p>Help</p>:null}
          </div>
          <div className="bottom-item recent-entry">
            <img src={assets.history_icon} alt="" />
            {extended?<p>Activity</p>:null}
          </div>
          <div className="bottom-item recent-entry">
            <img src={assets.setting_icon} alt="" />
            {extended?<p>Settings</p>:null}
          </div>

        </div>

    </div>
  )
}

export default Siderbar  