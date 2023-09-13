"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link'

import api from 'api'

export default function FilePage(props) {

  const [fileName, setFileName] = useState();
  const [fileSize, setFileSize] = useState();
  const [exists, setExists] = useState();
  const [isFetched, setIsFetched] = useState();
  const [isFailed, setIsFailed] = useState();

  useEffect(() => {
    const getFile = async () => {
      await axios.get(api.baseUrl + '/file/' + props.slug)
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
        <div className='w-200 h-96 mx-auto'>
          <p className='text-sky-400 font-sans text-2xl text-center pt-48'>{fileName} {fileSize}MB</p>
          <Link href={api.baseUrl + '/file/' + props.slug + '/download'}>
            <div className='w-96 h-32 mx-auto mt-8 
              bg-gray-900 hover:bg-gray-800/75 active:bg-gray-700/75
              border-solid border-2 border-sky-700 rounded-lg'>
              <p className='text-center mt-9 text-sky-400 font-sans text-4xl'>Download</p>
            </div>
          </Link>
          
        </div> 
      );
    } else if (exists === false) {
      return (
        <div className='w-200 h-96 mx-auto'>
          <p className='text-sky-400 font-sans text-2xl text-center pt-48'>File does not exist</p>
        </div> 
      );
    } else {
      return (
        <div className='w-200 h-96 mx-auto'>
          <p className='text-sky-400 font-sans text-2xl text-center pt-48'>Something went wrong</p>
        </div> 
      );
    }
  } else if (isFailed){
    return (
      <div className='w-200 h-96 mx-auto'>
        <p className='text-sky-400 font-sans text-2xl text-center pt-48'>Something went wrong</p>
      </div> 
    );
  }
  
}
