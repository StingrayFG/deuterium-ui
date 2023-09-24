"use client";

import { useState } from 'react';

export default function FilePage({fileSize, link, isFailed}) {

  const [fade, setFade] = useState();

  const delay = ms => new Promise(res => setTimeout(res, ms));

  const copyLink = async () => {
    navigator.clipboard.writeText(process.env.NEXT_PUBLIC_DOMAIN + '/' + link)
    setFade(true);
    await delay(2000);
    setFade(false);
  }

  if (isFailed) {
    return(
      <div className='w-11/12 md:w-3/5 h-12 mx-auto mt-0 grid 
        border-solid border-2 border-sky-700 rounded-lg'>
        <p className='text-center text-sky-200 font-sans text-xl md:text-2xl place-self-center'>Something went wrong</p> 
      </div>  
    )
  } else if (fileSize > 100) {
    return(
      <div className='w-11/12 md:w-3/5 h-12 mx-auto mt-0 grid 
        border-solid border-2 border-sky-700 rounded-lg'>
        <p className='text-center text-sky-200 font-sans text-xl md:text-2xl place-self-center'>File is too large</p>
      </div>  
    )
  } else if (!link) {
    return(
      <div className='w-11/12 md:w-3/5 h-12 mx-auto mt-0 grid 
        border-solid border-2 border-sky-700 rounded-lg'>
        <p className='text-center text-sky-200 font-sans text-xl md:text-2xl place-self-center'>...</p> 
      </div>  
    )
  } else if (fileSize < 100) {
    return(
      <div onClick={copyLink} className='w-11/12 md:w-3/5 h-12 mx-auto mt-0 grid 
        hover:bg-gray-800/50 active:bg-gray-700/50
        border-solid border-2 border-sky-700 rounded-lg'>
        <p className={
          `text-center text-sky-200 font-sans text-xl md:text-2xl place-self-center 
          transition-all duration-500 ${fade ? "opacity-0" : "opacity-100"}`}>{process.env.NEXT_PUBLIC_DOMAIN + '/' + link}</p>
        <p className={
          `text-center text-sky-200 font-sans text-xl md:text-2xl place-self-center absolute
          transition-all duration-500 ${fade ? "opacity-100" : "opacity-0"}`
        }>
          Copied!
        </p> 
      </div>  
    )
  } else {
    return null;
  }
  
}
