import React,{useState} from 'react'
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [theme, settheme] = useState(localStorage.getItem("mode") || false);
const handleDark=()=>{
    // document.body.classList.toggle("dark-theme")
    if(theme){
      console.log(theme)
      localStorage.setItem("mode", "")
      
      settheme(false)
    }
    else{
      settheme(true)
      console.log(theme)
      localStorage.setItem("mode", "dark-theme")
    }
}
  return (
    <div>Home Page
        <button onClick={handleDark}>dark</button>
    </div>
  )
}

export default HomePage