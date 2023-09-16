"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link'

export default function FilePage(props) {

  const [fileName, setFileName] = useState();
  const [fileSize, setFileSize] = useState();
  const [exists, setExists] = useState();
  const [isFetched, setIsFetched] = useState();
  const [isFailed, setIsFailed] = useState();

  useEffect(() => {
    const getFile = async () => {
      await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL  + '/file/' + props.slug)
      .then(res => {
        setIsFetched(true)
        setExists(res.data.exists);
        if (res.data.exists) {
          setFileName(res.data.fileName);
          setFileSize(res.data.fileSize);
        }
      })
      .catch(err => {
        console.error(err)
        setIsFailed(true)
      });
    };
    getFile();
  })

  if (isFetched === true)
  {
    if (exists === true)
    {
      return (
        <div className='w-11/12 md:w-200 h-96 mx-auto place-self-center'>
          <p className='text-sky-400 font-sans text-2xl text-center'>
            {fileName} {fileSize}MB
          </p>
          <Link href={process.env.NEXT_PUBLIC_BACKEND_URL + '/file/' + props.slug + '/download'}>
            <div className='w-11/12 h-24 md:h-32 mx-auto mt-8 grid
              bg-gray-900 hover:bg-gray-800/75 active:bg-gray-700/75
              border-solid border-2 border-sky-700 rounded-lg'>
              <p className='text-center text-sky-400 font-sans text-2xl md:text-4xl place-self-center'>Download</p>
            </div>
          </Link>
          
        </div> 
      );
    } else if (exists === false) {
      return (
        <div className='w-11/12 md:w-200 h-96 mx-auto place-self-center'>
          <p className='text-sky-400 font-sans text-2xl text-center'>File does not exist</p>
        </div> 
      );
    } else {
      return (
        <div className='w-11/12 md:w-200 h-96 mx-auto place-self-center'>
          <p className='text-sky-400 font-sans text-2xl text-center'>Something went wrong</p>
        </div> 
      );
    }
  } else if (isFailed){
    return (
      <div className='w-11/12 md:w-200 h-96 mx-auto place-self-center'>
        <p className='text-sky-400 font-sans text-2xl text-center'>Something went wrong</p>
      </div> 
    );
  }
  
}
