"use client";

import { useState } from 'react';

export default function HashSumBox({ hashSum }) {

  const [fade, setFade] = useState();

  const delay = ms => new Promise(res => setTimeout(res, ms));

  const copyHashSum = async () => {
    navigator.clipboard.writeText(hashSum)
    setFade(true);
    await delay(1500);
    setFade(false);
  };

  return(
    <div onClick={copyHashSum} className='w-11/12 md:w-8/12 h-20 md:h-12 mt-4 mb-8 mx-auto grid
      hover:bg-gray-800/50 active:bg-gray-700/50
      border-solid border-2 border-sky-700 rounded-lg'>
      <p className={`text-center text-sky-200 font-sans text-xl md:text-2xl ml-4 mr-4 place-self-center break-all
        transition-all duration-250 ${fade ? "opacity-0" : "opacity-100"}`}>
        md5: {hashSum}
      </p>
      <p className={`text-center text-sky-200 font-sans text-xl md:text-2xl place-self-center absolute
        transition-all duration-250 ${fade ? "opacity-100" : "opacity-0"}`}>
        Copied!
      </p> 
    </div>  
  ) 
  
}
