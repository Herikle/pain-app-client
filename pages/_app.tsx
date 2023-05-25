import "@styles/global.css";
import { Inter } from "next/font/google";
import Head from "next/head";
const inter = Inter({ subsets: ["latin"] });

function MyApp({ Component, pageProps }) {
  return (
    <main className={inter.className}>
      <Head>
        <title>PainTrack</title>
        <meta
          name="description"
          content="A scientific tool for the description and analysis of the pain experience"
        />
      </Head>
      <Component {...pageProps} />
    </main>
  );
}

export default MyApp;
