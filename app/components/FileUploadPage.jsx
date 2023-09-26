"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import path from 'path';

import DropzoneComponent from './DropzoneComponent';

export default function FileUploadPage() {

  const [file, setFile] = useState();
  const [uuid, setUuid] = useState();
  const [requiresUpload, setRequiresUpload] = useState();
  const [progress, setProgress] = useState(0);
  const [isFailed, setIsFailed] = useState();

  useEffect(() => {
    if (requiresUpload === true)
    {
      handleSubmit();
      setRequiresUpload(false);
    }
  })

  const handleChange = (file) => {
    setFile(file);
    setUuid(undefined);
    if (file.size < (1000000 * 100)) {
      setRequiresUpload(true);
    } else {
      setProgress(0);
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.append('file', file);

    await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + '/upload', formData, {
      onUploadProgress: (progressEvent) => {
        const progress = (progressEvent.loaded / progressEvent.total);
        setProgress(progress);
      }})
      .then(res => setUuid(res.data.uuid))
      .catch(err => {
        setIsFailed(true);
        console.error(err);
      });
  };

  if (file) {
    return (
      <div className='w-11/12 md:w-[50rem] h-96 mx-auto mb-12 md:mb-36 place-self-center'>
        <p className='text-sky-400 font-sans text-center text-xl md:text-2xl'>Files up to 100 MB are allowed</p>
        <DropzoneComponent handleChange={handleChange} progress={progress} isFailed={isFailed}
        fileName={path.parse(file.name).name.slice(0, 40) + path.parse(file.name).ext}
        fileSize={(file.size/(1024 * 1024)).toFixed(1)} link={uuid}/>
      </div> 
    );
  } else {
    return (
      <div className='w-11/12 md:w-[50rem] h-96 mx-auto mb-12 md:mb-36 place-self-center'>
        <p className='text-sky-400 font-sans text-center text-xl md:text-2xl'>Files up to 100 MB are allowed</p>
        <DropzoneComponent handleChange={handleChange} progress={progress} isFailed={isFailed} link={uuid}/>
      </div> 
    );
  }
}
