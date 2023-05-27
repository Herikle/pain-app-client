import { BackgroundVideo } from "@components/BackgroundHomeVideo";
import { Footer } from "@components/Footer";
import { TopBar } from "@components/TopBar";
import { GuestLayout } from "layouts/GuestLayout";
import Head from "next/head";

export default function Home() {
  return (
    <GuestLayout>
      <BackgroundVideo />
    </GuestLayout>
  );
}
