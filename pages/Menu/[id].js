import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

export default function Menu() {
    const router = useRouter();

    useEffect(()=>{
        if(!router.isReady) return;
        router.push(`/PartButton?id=${router.query.id}`)
    },[router.isReady])

    
    return (
      null
    )
}
