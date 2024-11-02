import Head from "next/head";
import { Homepage } from "@/components/Homepage";

export default function Home() {
  return (
    <>
      <Head>
        <title>Pollinator</title>
        <meta
          name="description"
          content="Pollinator Homepage: a Digital Gradient Garden "
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz@12..96&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Homepage />
    </>
  );
}
