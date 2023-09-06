"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link'

import api from 'api'

export default function FilePage(props) {

  const [fileName, setFileName] = useState();
  const [exists, setExists] = useState();
  const [isFetched, setIsFetched] = useState();

  useEffect(() => {
    const getFile = async () => {
      await fetch(api.baseUrl + '/file/' + props.slug, {
        method: 'get' 
      })
      .then(res => res.json())
      .then(data => {
        setIsFetched(true)
        setExists(data.exists);
        if (data.exists) {
          setFileName(data.fileName)
        }
      })
      .catch(err => console.error(err));
    };
    getFile();
  })

  if (isFetched === true)
  {
    if (exists === true)
    {
      return (
        <div>
          <p>{fileName}</p>
          <Link href={api.baseUrl + '/file/' + props.slug + '/download'}>Download</Link>
        </div>
      );
    } else if (exists === false) {
      return (
        <div>
          <p>File does not exist</p>
        </div>
      );
    } else {
      return (
        <div>
          <p>Something went wrong</p>
        </div>
      );
    }
  }
  
}
