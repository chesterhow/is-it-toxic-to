import "../styles/globals.css";

import { Analytics } from "@vercel/analytics/react";
import type { AppProps } from "next/app";

import { AppLayout } from "../components/layouts/AppLayout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppLayout>
      <Component {...pageProps} />
      <Analytics />
    </AppLayout>
  );
}

export default MyApp;
