import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { LinearProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

import FileLinkBox from './FileLinkBox';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
}));


function DropzoneComponent({handleChange, progress, fileName, fileSize, link}) {
  const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles);
    handleChange(acceptedFiles[0])
  }, []);

  const {
    getRootProps,
    getInputProps
  } = useDropzone({
    onDrop, multiple: false, noDragEventsBubbling: true
  });

  if (fileName) {
    return (
      <div className='w-full h-88 mx-auto mt-8 sliding-div
      bg-gray-900/50
      border-dashed border-2 border-sky-200 rounded-lg'>
        <div className='w-184 h-32 mx-auto mt-8 
          bg-gray-900 hover:bg-gray-800/75 active:bg-gray-700/75
          border-solid border-2 border-sky-700 rounded-lg' {...getRootProps({role: 'button'})}>
          <input {...getInputProps()} />
          <p className='text-center mt-9 text-sky-400 font-sans text-4xl'>Select or drop files</p>
        </div>
        <p className='text-center mt-6 text-sky-400 font-sans text-2xl'>{fileName} {fileSize}MB</p>
        <BorderLinearProgress className='w-184 mx-auto mt-3 h-16' variant="determinate" value={progress * 100} />
        <FileLinkBox progress={progress} fileSize={fileSize} link={link}/>
      </div>
    ) 
  } else {
    return (
      <div className='w-full h-48 mx-auto mt-8 sliding-div
      bg-gray-900/50
      border-dashed border-2 border-sky-200 rounded-lg'>
        <div className='w-184 h-32 mx-auto mt-8
          bg-gray-900 hover:bg-gray-800/75 active:bg-gray-700/75
          border-solid border-2 border-sky-700 rounded-lg' {...getRootProps({role: 'button'})}>
          <input {...getInputProps()} />
          <p className='text-center mt-9 text-sky-400 font-sans text-4xl'>Select or drop files</p>
        </div>
      </div>
    )
  }

}

export default DropzoneComponent;
