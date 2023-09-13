"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link'

import api from 'api'

export default function FilePage({progress, fileSize, link}) {

  const [fileName, setFileName] = useState();

  if (!link){
    return(
      <div className='w-3/5 h-12 mx-auto mt-8
        border-solid border-2 border-sky-700 rounded-lg'>
        <p className='text-center mt-1 text-sky-200 font-sans text-2xl'>Something went wrong, try again later</p>
      </div>  
    )
  } else if (fileSize > 100) {
    return(
      <div className='w-3/5 h-12 mx-auto mt-8
        border-solid border-2 border-sky-700 rounded-lg'>
        <p className='text-center mt-1 text-sky-200 font-sans text-2xl'>File is too large</p>
      </div>  
    )
  } else if (fileSize < 100) {
    return(
      <div className='w-3/5 h-12 mx-auto mt-8
        border-solid border-2 border-sky-700 rounded-lg'>
        <p className='text-center mt-1 text-sky-200 font-sans text-2xl'>{process.env.DOMAIN + '/' + link}</p>
      </div>  
    )
  } else {
    return null;
  }
  
}
