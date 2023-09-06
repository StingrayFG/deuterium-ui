"use client";

import { useState } from 'react';

import api from 'api'

export default function FileUploadPage() {

  const [file, setFile] = useState();
  const [link, setLink] = useState();

  const handleFileChange = (event) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
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
        setLink(data.link)
        ))
      .catch(err => console.error(err));

  };

  if (!link) {
    return (
      <div>
        <input type='file' onChange={handleFileChange} />
  
        <div>{file && `${file.name} - ${file.type}`}</div>
  
        <button onClick={handleSubmit}>Upload</button>
      </div>
    );
  } else {
    return (
      <div>
        <p>Your link:</p>
        <p>{'http://localhost:3000/' + link}</p>
      </div>
    );
  }
  
}
