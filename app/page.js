import React from 'react';
import Image from 'next/image'
import Link from 'next/link';

import FileUploadPage from 'components/FileUploadPage'

import githubMark from '/images/github-mark-white.png';
import logo from '/images/logo-white.png';

export default function Page() {
  return (
    <div className='bg-gradient-to-b from-black/75 via-transparent to-sky-500/75 h-screen grid'>
      <Image src={logo} alt='logo' className='absolute top-0 left-0 pl-4 w-16 md:w-24'/>
      <FileUploadPage /> 
      <Link href='https://github.com/StingrayFG/' className='absolute bottom-0 left-0 p-6'>
        <Image src={githubMark} alt='githubMark' className='w-10 md:w-16' />
      </Link>
    </div>
  )
}
