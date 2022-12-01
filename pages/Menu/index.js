import { useRouter } from 'next/router';
import React from 'react'

export async function getServerSideProps(){
  const res = await fetch('http://localhost:3000/api/songHandler')
  const post = await res.json()
  return {
    props: {
      data : post
    },
  }
}

export default function Menu({data}) {

  const router = useRouter();
  const buttons = data.data.map((obj) => {
    return(
        <input className='bg-cyan-700 px-2 m-2 text-[#f5f5f5] font-bold hover:text-cyan-300 active:text-black' type={'button'} key={obj} id={obj._id} value={obj.title} onClick={handleOnClick}/>
    )
  })

  function handleOnClick(e){
    router.push(`/Menu/${e.target.id}`)
  }

  return (
    <div>
        {buttons}
        <h1></h1>
    </div>
  )
}
