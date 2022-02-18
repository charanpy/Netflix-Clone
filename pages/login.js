import { useRef, useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { loginUser } from '../lib/magic-client';

import styles from '../styles/Login.module.css';

const Login = () => {
  const router = useRouter();
  const emailRef = useRef();
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleComplete = () => {
      setLoading(false);
    };

    router.events.on('routeChangeComplete', handleComplete);

    return () => {
      router.events.off('routeChangeComplete', handleComplete);
    };
  }, [router]);

  const handleOnLogin = async (e) => {
    e.preventDefault();
    const email = emailRef?.current?.value;

    if (!email) {
      return setErrorMessage('Please enter a valid email');
    }

    setLoading((load) => !load);

    const token = await loginUser(email);

    if (!token) return setErrorMessage('Something went wrong');

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const loggedInResponse = await response.json();

    if (!loggedInResponse?.done) {
      setErrorMessage('Something went wrong.Please try again');
      return;
    }

    router.push('/');
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix SignIn</title>
      </Head>
      <header className={styles.header}>
        <div className={styles.headerWrapper}>
          <a className={styles.logoLink}>
            <div className={styles.logoWrapper}>
              <Image
                src='/static/netflix.svg'
                alt='Netflix logo'
                width='128px'
                height='34px'
              />
            </div>
          </a>
        </div>
      </header>

      <main className={styles.main}>
        <form className={styles.mainWrapper} onSubmit={handleOnLogin}>
          <h1 className={styles.signinHeader}>Sign In</h1>

          <input
            className={styles.emailInput}
            type='email'
            placeholder='Email address'
            ref={emailRef}
            required
          />
          <p className={styles.userMsg}>{errorMessage ? errorMessage : ''}</p>
          <button type='submit' className={styles.loginBtn}>
            {loading ? 'Loading...' : 'Sign In'}
          </button>
        </form>
      </main>
    </div>
  );
};

export default Login;
