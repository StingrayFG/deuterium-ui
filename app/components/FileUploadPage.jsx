"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';

import DropzoneComponent from './DropzoneComponent';

import api from 'api'

export default function FileUploadPage() {

  const [file, setFile] = useState();
  const [uuid, setUuid] = useState();
  const [requiresUpload, setRequiresUpload] = useState();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (requiresUpload === true)
    {
      handleSubmit();
      setRequiresUpload(false);
    }
  })

  const handleChange = (file) => {
    setFile(file);
    if (file.size < (1000000 * 100)) {
      console.log("up");
      setRequiresUpload(true);
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.append('file', file);

    await axios.post(api.baseUrl + '/upload', formData, {
      onUploadProgress: (progressEvent) => {
        const progress = (progressEvent.loaded / progressEvent.total);
        setProgress(progress);
      }})
      .then(res => setUuid(res.data.uuid))
      .catch(err => console.error(err));
  };

  if (file) {
    return (
      <div className='w-full h-96 mx-auto'>
        <p className='text-sky-400 font-sans text-2xl text-center pt-48'>Files up to 100 MB are allowed.</p>
        <DropzoneComponent handleChange={handleChange} progress={progress}
        fileName={file.name.slice(0, 40) + '...' + file.name.slice(file.name.length - 10, file.name.length)} 
        fileSize={(file.size/1000000).toFixed(1)} link={window.location.host + '/' + uuid}/>
      </div> 
    );
  } else {
    return (
      <div className='w-full h-96 mx-auto'>
        <p className='text-sky-400 font-sans text-2xl text-center pt-48'>Files up to 100 MB are allowed.</p>
        <DropzoneComponent handleChange={handleChange} />
      </div> 
    );
  }
}
