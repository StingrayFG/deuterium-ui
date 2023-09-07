import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

function DropzoneComponent({handleChange}) {
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

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <div>Drag and drop your images here.</div>
    </div>
  )
}

export default DropzoneComponent;
