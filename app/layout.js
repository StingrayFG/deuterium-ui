import React from 'react';

import './globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel='icon' href='../images/favicon.ico'/>
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
