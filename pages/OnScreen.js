import React, { useEffect, useState } from 'react'


export default function OnScreen() {
    const [items, setItems] = useState([]);

    useEffect(() => {
    function checkUserData(){
        const item = JSON.parse(localStorage.getItem('current'));
        if (item){
            setItems(item)
        }
    }
    window.addEventListener('storage', checkUserData)
    return () => {
        window.removeEventListener('storage', checkUserData)
    }
    },[])

  return (
    <div style={{"width" : "100vw" , "height" : "100vh", "display" : "flex", "alignItems" : "center", "justifyContent" : "center"}}>
    <h1 style={{"fontSize" : "5em", "textAlign" : "center", "fontFamily" : "'Montserrat', sans-serif", "fontWeight" : "600"}}>{items}</h1>
    </div>
  )
}
