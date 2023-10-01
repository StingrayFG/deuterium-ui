import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { LinearProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

import FileLinkBox from './FileLinkBox';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
}));

function DropzoneComponent({ handleChange, progress, isFailed, fileName, fileSize, fileUuid }) {
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
      <div className='w-full h-80 md:h-88 mx-auto self-center sliding-div
        bg-gray-900/50
        border-dashed border-2 border-sky-200 rounded-lg'>
        <div className='w-11/12 h-24 md:h-32 mx-auto mt-8 grid
          bg-gray-900 hover:bg-gray-800/75 active:bg-gray-700/75
          border-solid border-2 border-sky-700 rounded-lg' {...getRootProps({role: 'button'})}>
          <input {...getInputProps()} />
          <p className='text-center text-sky-400 font-sans text-2xl md:text-4xl place-self-center'>Select or drop files</p>
        </div>
        <div className='h-14 md:h-16 grid'>
          <p className='pl-6 pr-6 mt-2 text-center align-middle text-sky-400 font-sans text-xl md:text-2xl self-center'>{fileName} {fileSize}MB</p>
        </div>
        <BorderLinearProgress className='w-11/12 mx-auto mt-5 mb-5 md:mt-3 md:mb-6 h-16'
          sx={{
            '&[aria-valuenow="0"]': {
              '& .MuiLinearProgress-bar': {
                transition: 'none'
              }
            }
          }}
          variant="determinate" value={progress * 100} />
        <FileLinkBox isFailed={isFailed} fileSize={fileSize} fileUuid={fileUuid}/>
      </div>
    ) 
  } else {
    return (
      <div className='w-full h-40 md:h-48 mx-auto self-center sliding-div
        bg-gray-900/50
        border-dashed border-2 border-sky-200 rounded-lg'>
        <div className='w-11/12 h-24 md:h-32 mx-auto mt-8 grid
          bg-gray-900 hover:bg-gray-800/75 active:bg-gray-700/75
          border-solid border-2 border-sky-700 rounded-lg' {...getRootProps({role: 'button'})}>
          <input {...getInputProps()} />
          <p className='text-center text-sky-400 font-sans text-2xl md:text-4xl place-self-center'>Select or drop files</p>
        </div>
      </div>
    )
  }

}

export default DropzoneComponent;
