import { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script async defer data-website-id={process.env.ANALYTICS_CODE ?? ''} src={process.env.ANALYTICS_URL ?? ''} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
