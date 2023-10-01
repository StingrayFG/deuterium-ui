"use client";

import { useState } from 'react';

export default function FileLinkBox({ isFailed, fileData }) {

  const [fade, setFade] = useState();

  const delay = ms => new Promise(res => setTimeout(res, ms));

  const copyLink = async () => {
    navigator.clipboard.writeText('https://' + process.env.NEXT_PUBLIC_DOMAIN + '/' + fileData.uuid)
    setFade(true);
    await delay(2000);
    setFade(false);
  };

  if (isFailed) {
    return(
      <div className='w-11/12 md:w-8/12 h-12 mx-auto mt-6 mb-8 grid
        border-solid border-2 border-sky-700 rounded-lg'>
        <p className='text-center text-sky-200 font-sans text-xl md:text-2xl place-self-center'>Something went wrong</p> 
      </div>  
    )
  } else if (fileData.setFadeize > 100) {
    return(
      <div className='w-11/12 md:w-8/12 h-12 mx-auto mt-6 mb-8 grid 
        border-solid border-2 border-sky-700 rounded-lg'>
        <p className='text-center text-sky-200 font-sans text-xl md:text-2xl place-self-center'>File is too large</p>
      </div>  
    )
  } else if (!fileData.uuid) {
    return(
      <div className='w-11/12 md:w-8/12 h-12 mx-auto mt-6 mb-8 grid 
        border-solid border-2 border-sky-700 rounded-lg'>
        <div className="h-10 w-10 animate-spin place-self-center absolute grid">
          <div className="h-5 w-5 mr-4 place-self-center absolute
            rounded-full border-dotted border-2 border-sky-white rounded-full">
          </div>
          <div className="h-5 w-5 ml-4 place-self-center absolute
            bg-white rounded-full">
          </div>
        </div>
      </div>  
    )
  } else if (fileData.size < 100) {
    return(
      <div onClick={copyLink} className='w-11/12 md:w-8/12 h-12 mx-auto mt-6 mb-8 grid 
        hover:bg-gray-800/50 active:bg-gray-700/50
        border-solid border-2 border-sky-700 rounded-lg'>
        <p className={`text-center text-sky-200 font-sans text-xl md:text-2xl place-self-center 
          transition-all duration-500 ${fade ? "opacity-0" : "opacity-100"}`}>
          {process.env.NEXT_PUBLIC_DOMAIN + '/' + fileData.uuid}
        </p>
        <p className={`text-center text-sky-200 font-sans text-xl md:text-2xl place-self-center absolute
          transition-all duration-500 ${fade ? "opacity-100" : "opacity-0"}`}>
          Copied!
        </p> 
      </div>  
    )
  } else {
    return null;
  }
  
}
