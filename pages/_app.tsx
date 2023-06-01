import "@styles/global.css";
import { Inter } from "next/font/google";
import Head from "next/head";
import { useState } from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

type ApplicationProps = {
  children: React.ReactNode;
};

const Application = ({ children }) => {
  return (
    <main className={inter.className}>
      <Head>
        <title>PainTrack</title>
        <meta
          name="description"
          content="A scientific tool for the description and analysis of the pain experience"
        />
      </Head>
      {children}
    </main>
  );
};

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Application>
          {/* <RecoilRoot> */}
          <Component {...pageProps} />
          {/* </RecoilRoot> */}
          <ToastContainer />
        </Application>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
