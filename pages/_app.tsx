import { Raleway } from "next/font/google";
import Head from "next/head";
import { useState } from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import { RecoilRoot } from "recoil";
import "react-toastify/dist/ReactToastify.css";
import "@styles/global.css";
import { Modals } from "@components/Modals";
import { VerifyUser } from "@logic-components/VerifyUser";

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
          <meta
            name="description"
            content="A scientific tool for the description and analysis of the pain experience"
          />
        </Head>
        {children}
        <Modals />
        <ToastContainer />
        <VerifyUser />
      </main>
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
