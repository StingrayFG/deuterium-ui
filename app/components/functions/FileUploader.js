"use client";

import { useState } from 'react';

import api from 'api'

function FileUploader() {

  const [file, setFile] = useState();

  const handleFileChange = (event) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    fetch(api.baseUrl + '/files', {
      method: 'POST',
      body: formData
      
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <input type='file' onChange={handleFileChange} />

      <div>{file && `${file.name} - ${file.type}`}</div>

      <button onClick={handleSubmit}>Upload</button>
    </div>
  );
}

export default FileUploader;
