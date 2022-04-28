import { useRouter } from "next/router";

import Header from "./header";
import Footer from "./footer";
import Head from "next/head";
import Script from "next/script";

const Layout = ({ children }) => {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>Valina</title>
      </Head>
      <Script src="./scripts/global.js" />
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
