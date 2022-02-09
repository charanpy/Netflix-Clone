import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { magic } from '../lib/magic-client';

import Loading from '../components/Loading/Loading';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    (async () => {
      const isLoggedIn = await magic.user.isLoggedIn();
      if (isLoggedIn) {
        return router.push('/');
      }
      router.push('/login');
    })();
  }, []);

  useEffect(() => {
    console.log('rerender');

    const handleComplete = () => {
      setIsLoading(false);
    };

    router.events.on('routeChangeComplete', handleComplete);

    return () => {
      router.events.off('routeChangeComplete', handleComplete);
    };
  }, [router]);

  return isLoading ? <Loading /> : <Component {...pageProps} />;
}

export default MyApp;
