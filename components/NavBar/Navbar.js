import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import styles from './Navbar.module.css';
import { magic } from '../../lib/magic-client';

const Navbar = () => {
  const router = useRouter();

  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState('');

  const getUser = useCallback(async () => {
    try {
      const user = await magic.user.getMetadata();
      if (user?.email) setUser(user?.email);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getUser();
  }, [getUser]);

  const handleToggleDropdown = () => {
    setShowDropdown((dropdown) => !dropdown);
  };

  const handleOnClick = (e, href) => {
    e.preventDefault();
    router.push(href);
  };

  const handleLogout = async () => {
    try {
      const isLoggedOut = await magic.user.logout();
      if (isLoggedOut) {
        router.push('/login');
      }
    } catch (error) {
      console.log(error);
      router.push('/login');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
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

        <ul className={styles.navItems}>
          <li className={styles.navItem} onClick={(e) => handleOnClick(e, '/')}>
            Home
          </li>
          <li
            className={styles.navItem2}
            onClick={(e) => handleOnClick(e, '/browse/my-list')}
          >
            My List
          </li>
        </ul>

        <nav className={styles.navContainer}>
          <div>
            <button
              className={styles.usernameBtn}
              onClick={handleToggleDropdown}
            >
              <p className={styles.username}>{user}</p>
              <Image
                src='/static/expand-more.svg'
                alt='Expand More'
                width='24px'
                height='24px'
              />
            </button>
            {showDropdown && (
              <div className={styles.navDropdown}>
                <div>
                  <p className={styles.linkName} onClick={handleLogout}>
                    Sign out
                  </p>
                  <div className={styles.lineWrapper}></div>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
