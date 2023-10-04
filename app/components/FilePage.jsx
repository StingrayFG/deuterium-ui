'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link'

import HashSumBox from './HashSumBox';

export default function FilePage(props) {

  const [fileData, setFileData] = useState();
  const [isFailed, setIsFailed] = useState();

  useEffect(() => {
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
    if (fileData.exists === true)
    {
      return (
        <div className='w-11/12 md:w-[50rem] h-auto mx-auto mb-12 md:mb-36 place-self-center'>
          <div className='w-full h-auto mx-auto sliding-div self-center
            bg-gray-900/50
            border-dashed border-2 border-sky-200 rounded-lg'>
            <Link href={process.env.NEXT_PUBLIC_BACKEND_URL + '/file/' + props.slug + '/download'}>
              <div className='w-11/12 h-24 md:h-32 mx-auto mt-8 grid
                bg-gray-900 hover:bg-gray-800 active:bg-gray-700
                border-solid border-2 border-sky-700 rounded-lg'>
                <p className='text-center text-sky-400 font-sans text-2xl md:text-4xl place-self-center'>Download</p>
              </div>
            </Link>
            <div className='h-14 md:h-16 grid'>
              <p className='pl-6 pr-6 mt-2 text-center align-middle text-sky-400 font-sans text-xl md:text-2xl self-center'>{fileData.name} {fileData.size}MB</p>
            </div>
            <HashSumBox hashSum={fileData.hashSum}/>
          </div>
        </div> 
      );
    } else {
      return (
        <div className='w-11/12 md:w-[50rem] h-auto mx-auto place-self-center'>
          <p className='text-sky-400 font-sans text-2xl text-center'>File does not exist</p>
        </div> 
      );
    }
  } else if (isFailed) {
    return (
      <div className='w-11/12 md:w-[50rem] h-auto mx-auto place-self-center'>
        <p className='text-sky-400 font-sans text-2xl text-center'>Something went wrong</p>
      </div> 
    );
  }
  
}
