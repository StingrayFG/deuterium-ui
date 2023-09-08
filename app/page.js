import React from 'react';
import Image from 'next/image'

import FileUploadPage from 'components/FileUploadPage'

import githubMark from '../images/github-mark-white.png';
import deLogo from '../images/de-logo-white.png';
import Link from 'next/link';

export default function Page() {
  return (
    <div className='bg-gradient-to-b from-black/75 via-transparent to-sky-500/75 h-screen'>
      <Image src={deLogo} alt='logo' width={100} className='pl-4 pt-2 inline-grid'/>
      <FileUploadPage /> 
      <Link href='https://github.com/StingrayFG/' className='absolute bottom-0 left-0 p-6'>
        <Image src={githubMark} alt='github' width={80} />
      </Link>
    </div>
  )
}
