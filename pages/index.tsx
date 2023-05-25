import { BackgroundVideo } from "@components/BackgroundHomeVideo";
import { TopBar } from "@components/TopBar";

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
