import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

function DropzoneComponent({handleChange, progress, fileName, fileSize, link}) {
  const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles);
    handleChange(acceptedFiles[0])
  }, []);

  const {
    getRootProps,
    getInputProps
  } = useDropzone({
    onDrop, multiple: false
  });

  if (fileName) {
    if (fileSize < 100) {
      return (
        <div className='w-2/5 h-72 mx-auto mt-8 
          bg-gray-900/75 hover:bg-gray-800/75 active:bg-gray-700/75
          border-solid border-2 border-sky-700 rounded-lg' {...getRootProps({role: 'button'})}>
          <input {...getInputProps()} />
          <p className='text-center mt-9 text-sky-400 font-sans text-4xl'>Select or drop files</p>
          <div className='w-4/5 h-36 mx-auto mt-8
          border-solid border-2 border-sky-700 rounded-lg'>          
            <p className='text-center mt-3 text-sky-400 font-sans text-2xl'>{fileName} {fileSize}MB {progress}</p>
            <p className='text-center mt-3 text-sky-400 font-sans text-2xl'>{link}</p>
          </div>
        </div>
      )
    } else {
      return (
        <div className='w-2/5 h-64 mx-auto mt-8 
          bg-gray-900/75 hover:bg-gray-800/75 active:bg-gray-700/75
          border-solid border-2 border-sky-700 rounded-lg' {...getRootProps({role: 'button'})}>
          <input {...getInputProps()} />
          <p className='text-center mt-9 text-sky-400 font-sans text-4xl'>Select or drop files</p>
          <p className='text-center mt-9 text-sky-400 font-sans text-2xl'>{fileName} {fileSize}MB</p>
          <p className='text-center mt-3 text-red-600 font-sans text-2xl'>File is too large</p>
        </div>
      )
    } 
  } else {
    return (
      <div className='w-2/5 h-32 mx-auto mt-8 
        bg-gray-900/75 hover:bg-gray-800/75 active:bg-gray-700/75
        border-solid border-2 border-sky-700 rounded-lg' {...getRootProps({role: 'button'})}>
        <input {...getInputProps()} />
        <p className='text-center mt-9 text-sky-400 font-sans text-4xl'>Select or drop files</p>
      </div>
    )
  }

}

export default DropzoneComponent;
