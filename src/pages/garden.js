import Head from "next/head";
import { App } from "@/components/App";
import { HelperApp } from "@/components/HelperApp";

export default function Home() {
  return (
    <>
      <Head>
        <title>Digital Gradient Garden</title>
        <meta name="description" content="Digital Gradient Garden" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@10..48,200..900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <App />
      <HelperApp />
    </>
  );
}
