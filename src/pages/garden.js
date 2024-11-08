import Head from "next/head";
import { App } from "@/components/App";

export default function Home() {
  return (
    <>
      <Head>
        <title>Digital Gradient Garden</title>
        <meta name="description" content="Digital Gradient Garden" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <App />
    </>
  );
}
