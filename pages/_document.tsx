import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,soft,wght@0,9..144,0..100,100;0,9..144,0..100,200;0,9..144,0..100,300;0,9..144,0..100,400;0,9..144,0..100,500;0,9..144,0..100,600;0,9..144,0..100,700;0,9..144,0..100,800;0,9..144,0..100,900;1,9..144,0..100,100;1,9..144,0..100,200;1,9..144,0..100,300;1,9..144,0..100,400;1,9..144,0..100,500;1,9..144,0..100,600;1,9..144,0..100,700;1,9..144,0..100,800;1,9..144,0..100,900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
