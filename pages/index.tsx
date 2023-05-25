import { BackgroundVideo } from "@components/BackgroundHomeVideo";
import { TopBar } from "@components/TopBar";
import Head from "next/head";

export default function Home() {
  return (
    <main>
      <TopBar />
      <BackgroundVideo />
      <div
        style={{
          height: "100vh",
        }}
      />
    </main>
  );
}
