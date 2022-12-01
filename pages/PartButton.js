import { set } from 'mongoose';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

export async function getServerSideProps(context){
  const res = await fetch(`http://localhost:3000/api/songHandler/${context.query.id}`)
  const post = await res.json();

  return {
    props: {
      song : post
    },
  }
}




export default function PartButton({song : {data : {lyrics}}}) {
  const [line, setLine] = useState([]);
  const [onScreen, setOnScreen] = useState("");
  const [count, setCount] = useState(0);
  const router = useRouter();

   

  function getButton(){
    const lyric = Object.entries(lyrics).map((value, dex) => {
      if(value[1] != "" && value[1] != lyrics._id){
        const part = value[1].split("\n").map((items, index) => {
          return(
            <button key={items} className='text-white' onClick={() => {
              setCount(index)
              setLine(value[1].split("\n"))
              setOnScreen(items)
            }}>{items}</button>
          )
        })
        return(
          <div key={value} className='flex flex-col'>
            <button className='bg-cyan-700 px-2 m-2 text-[#f5f5f5] font-bold hover:text-cyan-300 active:text-black' onClick={() => {
              setCount(0)
              setLine(value[1].split("\n"))
              setOnScreen(value[1].split("\n")[0])
            }}>{value[0]}</button>
            {part}
          </div>
        )}
    })
   return lyric
  }

  useEffect(() => {
    setOnScreen(line[count])
    localStorage.setItem('current', JSON.stringify(onScreen));
  },[count, onScreen])

  function gotoMenu(){
    router.push('/');
  }


  function handlePrev(){
    if(count >= 0 && count < line.length){
      setCount(count => count - 1)
    }
  }

  return (
    <>
    <div className='w-full h-8 bg-cyan-400 flex justify-around items-center'>
      <button className='bg-cyan-700 px-2 text-[#f5f5f5] font-bold hover:text-cyan-300 active:text-black' onClick={() => {
        count > 0 ? setCount(count => count - 1) : null
      }}>Prev</button>
      <button className='bg-cyan-700 px-2 text-[#f5f5f5] font-bold hover:text-cyan-300 active:text-black' onClick={() => {
        gotoMenu()
      }}>Go To Song List</button>
      <button className='bg-cyan-700 px-2 text-[#f5f5f5] font-bold hover:text-cyan-300 active:text-black' onClick={() => {
        count >= 0 && count < line.length - 1 ? setCount(count => count + 1) : null
      }}>Next</button>
    </div>
    <h1 className='text-center font-bold text-xl'>{onScreen}</h1>
    <div className='w-full h-auto bg-cyan-800'>
      {getButton()}
    </div>
    </>
    
  )
}
