import { BackgroundVideo } from "@components/BackgroundHomeVideo";
import { Footer } from "@components/Footer";
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
      <Footer />
    </main>
  );
}
