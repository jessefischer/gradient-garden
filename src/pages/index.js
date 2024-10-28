import Head from "next/head";
import styles from "@/styles/App.module.css";

export default function App() {
  return (
    <>
      <Head>
        <title>Digital Gradient Garden</title>
        <meta name="description" content="Digital Gradient Garden" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={styles.app}>
        <h1>Digital Gradient Garden</h1>
      </div>
    </>
  );
}
