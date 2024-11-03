import Head from "next/head";
import { App } from "@/components/App";
import { HelperApp } from "@/components/HelperApp";
import { useEffect, useRef } from "react";

export default function Home() {
  // const gardenRef = useRef(null);

  // useEffect(() => {
  //   const garden = gardenRef.current;

  //   garden.scrollLeft = garden.scrollWidth / 2 - garden.clientWidth / 2;
  //   garden.scrollTop = garden.scrollHeight / 2 - garden.clientHeight / 2;
  // }, []);

  return (
    <>
      <Head>
        <title>Digital Gradient Garden</title>
        <meta name="description" content="Digital Gradient Garden" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {/* <div
        ref={gardenRef}
        style={{
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
          position: "relative",
          background: "transparent",
        }}
        onWheel={(e) => {
          gardenRef.current.scrollLeft += e.deltaX;
          gardenRef.current.scrollTop += e.deltaY;
        }}
      >
        <div
          style={{
            width: "400vw",
            height: "300vh",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "transparent",
          }}
        > */}
      <App />
      <HelperApp />
      {/* </div>
      </div> */}
    </>
  );
}
