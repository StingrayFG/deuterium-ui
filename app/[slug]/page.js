import React from 'react';

import FilePage from 'components/FilePage'

export default function Page({ params }) {
  return <FilePage slug={params.slug} />
}
