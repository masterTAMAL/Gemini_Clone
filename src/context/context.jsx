import { createContext, useState } from "react";
import run from "../Config/celestia";

export const Context = createContext();

const ContextProvider=(props)=>{

    const[input,setInput]= useState("");
    const[recentPrompt,setRecentPrompt]=useState("");
    const[prevPrompt,setPrevPrompts]=useState([]);
    const[showResult,setShowResult]=useState(false);
    const[loading,setloading]=useState(false);
    const [resultData,setResultData]=useState("");
  
    const delayPara=(index,nextWord)=>{
         setTimeout(function(){
          setResultData(prev=>prev+nextWord);
         },75*index)
    }

    const newChat=()=>
    {
       setloading(false)
       setShowResult(false)
    }


    const onSent = async (prompt) => {
        setResultData("");
        setloading(true);
        setShowResult(true);
    
        let newPrompt = prompt !== undefined ? prompt : input;
    
        // Store the message in recent prompts before running the response
        setPrevPrompts(prev => [...prev, newPrompt]);  
        setRecentPrompt(newPrompt);
    
        let response = await run(newPrompt); 
    
        // Process response formatting
        let responseArray = response.split("**");
        let newArray = "";
    
        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 !== 1) { 
                newArray += responseArray[i];
            } else {
                newArray += "<b>" + responseArray[i] + "</b>";
            }
        }
    
        let newResponse = newArray.split("*").join("</br>");
    
        // Delayed text effect
        let newResponseArray = newResponse.split(" ");
        for (let i = 0; i < newResponseArray.length; i++) {
            const nextWord = newResponseArray[i];
            delayPara(i, nextWord + " ");
        }
    
        setloading(false);
        setInput(""); 
    };
    
   
    


    const contextValue={
       prevPrompt,
       setPrevPrompts, 
       onSent,
       setRecentPrompt,
       recentPrompt,
       showResult,
       loading,
       resultData,
       input,
       setInput,
       newChat
    }
     
    return (
        <Context.Provider value={contextValue}>
        {props.children}
      </Context.Provider>
    )
}

export default ContextProvider;