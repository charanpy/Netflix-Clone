import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { magic } from '../lib/magic-client';

import Loading from '../components/Loading/Loading';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  // const [isLoading, setIsLoading] = useState(true);
  // const router = useRouter();
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       console.log(router);
  //       const isLoggedIn = await magic.user.isLoggedIn();
  //       if (isLoggedIn && router.pathname === '/login') {
  //         return router.push('/');
  //       }
  //       if (!isLoggedIn) router.push('/login');
  //       router.push(router.asPath);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   })();
  // }, []);

  // useEffect(() => {
  //   console.log('rerender');

  //   const handleComplete = () => {
  //     setIsLoading(false);
  //   };

  //   router.events.on('routeChangeComplete', handleComplete);

  //   return () => {
  //     router.events.off('routeChangeComplete', handleComplete);
  //   };
  // }, [router]);

  // return isLoading ? <Loading /> : <Component {...pageProps} />;
  return <Component {...pageProps} />;
}

export default MyApp;
