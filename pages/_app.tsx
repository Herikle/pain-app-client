import { Raleway } from "next/font/google";
import Head from "next/head";
import { useState } from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import { RecoilRoot } from "recoil";
import "react-toastify/dist/ReactToastify.css";
import "@styles/global.css";
import { Modals } from "Modals";
import { FiltersController } from "@logic-components/FiltersController";
import { Analytics } from "@vercel/analytics/react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const raleway = Raleway({ subsets: ["latin"] });

type ApplicationProps = {
  children: React.ReactNode;
};

const Application = ({ children }: ApplicationProps) => {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${raleway.style.fontFamily};
        }
      `}</style>
      <main>
        <Head>
          <title>PainTrack</title>
          <link rel="icon" type="image/x-icon" href="/favicon/favicon.ico" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/favicon/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg"/>
          <meta
            name="description"
            content="A scientific tool for the description and analysis of the pain experience"
          />
        </Head>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          {children}
          <Modals />
        </LocalizationProvider>
        <ToastContainer />
        <FiltersController />
      </main>
      <Analytics />
    </>
  );
};

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <RecoilRoot>
          <Application>
            <Component {...pageProps} />
          </Application>
        </RecoilRoot>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
