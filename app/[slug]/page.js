import React from 'react';

import FilePage from 'components/FilePage'

export default function Page({ params }) {
  return(
    <div className='bg-gradient-to-b from-black/75 via-transparent to-sky-500/75 h-screen'>
      <FilePage slug={params.slug} />
    </div>
  )
}
