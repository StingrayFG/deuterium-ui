'use client';

import { useState } from 'react';

export default function FileLinkBox({ isFailed, fileData }) {

  const [showCopied, setShowCopied] = useState();

  const delay = ms => new Promise(res => setTimeout(res, ms));

  const copyLink = async () => {
    navigator.clipboard.writeText('https://' + process.env.NEXT_PUBLIC_DOMAIN + '/' + fileData.uuid)
    setShowCopied(true);
    await delay(1500);
    setShowCopied(false);
  };

  if (isFailed) {
    return (
      <div className='w-11/12 md:w-8/12 h-12 mx-auto mt-6 mb-8 grid
        border-solid border-2 border-sky-700 rounded-lg'>
        <p className='text-center text-sky-200 font-sans text-xl md:text-2xl place-self-center'>Something went wrong</p> 
      </div>  
    )
  } else if (fileData.size > 100) {
    return (
      <div className='w-11/12 md:w-8/12 h-12 mx-auto mt-6 mb-8 grid 
        border-solid border-2 border-sky-700 rounded-lg'>
        <p className='text-center text-sky-200 font-sans text-xl md:text-2xl place-self-center'>File is too large</p>
      </div>  
    )
  } else if (!fileData.uuid) {
    return (
      <div className='w-11/12 md:w-8/12 h-12 mx-auto mt-6 mb-8 grid 
        border-solid border-2 border-sky-700 rounded-lg'>
        <div className='h-9 w-9 place-self-center grid grid-cols-1 grid-rows-1 animate-spin'>
          <div className='h-5 w-5 mt-1 place-self-center
            border-dotted border-2 border-sky-white rounded-full'>
          </div>
          <div className='h-5 w-5 relative place-self-center
            bg-white rounded-full'>
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
          transition-all duration-250 ${showCopied ? 'opacity-0' : 'opacity-100'}`}>
          {process.env.NEXT_PUBLIC_DOMAIN + '/' + fileData.uuid}
        </p>
        <p className={`text-center text-sky-200 font-sans text-xl md:text-2xl place-self-center absolute
          transition-all duration-250 ${showCopied ? 'opacity-100' : 'opacity-0'}`}>
          Copied!
        </p> 
      </div>  
    )
  } else {
    return null;
  }
  
}
