"use client";

import { useState } from 'react';

import DropzoneComponent from './DropzoneComponent';

import api from 'api'

export default function FileUploadPage() {

  const [file, setFile] = useState();
  const [uuid, setuuid] = useState();

  const handleChange = file => {
    setFile(file);
  };

  const handleSubmit = async () => {
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    await fetch(api.baseUrl + '/upload', {
      method: 'POST',
      body: formData    
    })
      .then(res => res.json())
      .then(data => (
        setuuid(data.uuid)
        ))
      .catch(err => console.error(err));
  };

  if (!uuid) {
    return (
      <div>
        <DropzoneComponent handleChange={handleChange}/>

        <div>{file && `${file.name} - ${file.type}`}</div>
  
        <button onClick={handleSubmit}>Upload</button>
      </div>
    );
  } else {
    return (
      <div>
        <p>Your link:</p>
        <p>{'http://localhost:3000/' + uuid}</p>
      </div>
    );
  }
  
}
