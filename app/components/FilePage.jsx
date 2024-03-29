'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import path from 'path';
import Link from 'next/link'

import HashSumBox from './HashSumBox';

export default function FilePage(props) {

  const [fileData, setFileData] = useState();
  const [isFailed, setIsFailed] = useState();

  const truncateFileName = (fileName) => { // Truncate the file name to avoid the text overflow
    const len = path.parse(fileName).name.length;
    if (len > 40) {
      return path.parse(fileName).name.slice(0, 32) + '...' + 
      path.parse(fileName).name.slice(len - 5, len) +  path.parse(fileName).ext;
    } else {
      return fileName;
    }
  };

  useEffect(() => { // Make a file request to backend by its uuid specified in the url
    const getFile = async () => {
      await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL  + '/file/' + props.slug)
      .then(res => {
        setFileData(res.data.fileData);
      })
      .catch(err => {
        console.error(err)
        setIsFailed(true)
      });
    };
    if (!fileData) {
      getFile();
    }
  });

  if (fileData)
  {
    if (fileData.exists === true) // If file has been found
    {
      return (
        <div className='w-11/12 md:w-[50rem] h-auto mx-auto mb-36 md:mb-36 place-self-center'>
          <div className='w-full h-auto mx-auto sliding-div self-center
            bg-gray-900/50
            border-dashed border-2 border-sky-200 rounded-lg'>
            <a href={process.env.NEXT_PUBLIC_BACKEND_URL + '/file/' + props.slug + '/download'}>
              <div className='w-11/12 h-24 md:h-32 mx-auto mt-8 grid
                bg-gray-900 hover:bg-gray-800 active:bg-gray-700
                border-solid border-2 border-sky-700 rounded-lg'>
                <p className='text-center text-sky-400 font-sans text-2xl md:text-4xl place-self-center'>Download</p>
              </div>
            </a>
            <div className='h-14 md:h-16 grid'>
              <p className='pl-6 pr-6 mt-2 text-center align-middle text-sky-400 font-sans text-xl md:text-2xl self-center'>{truncateFileName(fileData.name)} {fileData.size}MB</p>
            </div>
            <HashSumBox hashSum={fileData.hashSum}/>
          </div>
        </div> 
      );
    } else { // If file has not been found
      return ( 
        <div className='w-11/12 md:w-[50rem] h-auto mx-auto mb-36 md:mb-36 place-self-center'>
          <p className='text-sky-400 font-sans text-2xl text-center'>File does not exist</p>
        </div> 
      );
    }
  } else if (isFailed) { // In case backend failed to respond
    return (
      <div className='w-11/12 md:w-[50rem] h-auto mx-auto mb-36 md:mb-36 place-self-center'>
        <p className='text-sky-400 font-sans text-2xl text-center'>Something went wrong</p>
      </div> 
    );
  }
  
}
