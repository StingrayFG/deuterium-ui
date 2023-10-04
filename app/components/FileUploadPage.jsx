'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import path from 'path';

import DropzoneComponent from './DropzoneComponent';

export default function FileUploadPage() {

  const [file, setFile] = useState();
  const [fileUuid, setFileUuid] = useState();

  const [requiresUpload, setRequiresUpload] = useState();
  const [progress, setProgress] = useState(0);
  const [isFailed, setIsFailed] = useState();

  useEffect(() => {
    if (requiresUpload === true)
    {
      handleSubmit();
      setRequiresUpload(false);
    }
  });

  const handleChange = (file) => {
    setFile(file);
    setFileUuid(undefined);
    if (file.size < (1024 * 1024 * 100)) {
      setRequiresUpload(true);
    } else {
      setProgress(0);
    }
  };

  const truncateFileName = (fileName) => {
    const len = path.parse(fileName).name.length;
    if (len > 40) {
      return path.parse(fileName).name.slice(0, 32) + '...' + 
      path.parse(fileName).name.slice(len - 5, len) +  path.parse(fileName).ext;
    } else {
      return fileName;
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
      .then(res => setFileUuid(res.data.fileUuid))
      .catch(err => {
        setIsFailed(true);
        console.error(err);
      });
  };

  if (file) {
    return (
      <div className='w-11/12 md:w-[50rem] h-auto mx-auto mb-36 md:mb-36 place-self-center'>
        <p className='h-12 text-sky-400 font-sans text-center text-xl md:text-2xl'>Files up to 100 MB are allowed</p>
        <DropzoneComponent handleChange={handleChange} progress={progress} isFailed={isFailed}
        fileData={{name: truncateFileName(file.name), size: (file.size / (1024 * 1024)).toFixed(1), uuid: fileUuid}}/>
      </div> 
    );
  } else {
    return (
      <div className='w-11/12 md:w-[50rem] h-auto mx-auto mb-36 md:mb-36 place-self-center'>
        <p className='h-12 text-sky-400 font-sans text-center text-xl md:text-2xl'>Files up to 100 MB are allowed</p>
        <DropzoneComponent handleChange={handleChange} progress={progress} isFailed={isFailed} fileData={{uuid: fileUuid}}/>
      </div> 
    );
  }
}
