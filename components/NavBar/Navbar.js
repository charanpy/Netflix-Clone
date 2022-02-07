import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

import styles from './Navbar.module.css';

const Navbar = ({ username }) => {
  const router = useRouter();

  const [showDropdown, setShowDropdown] = useState(false);

  const handleToggleDropdown = () => {
    setShowDropdown((dropdown) => !dropdown);
  };

  const handleOnClick = (e, href) => {
    e.preventDefault();
    router.push(href);
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
              <p className={styles.username}>{username}</p>
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
                  <Link href='/login'>
                    <a className={styles.linkName}>Sign out</a>
                  </Link>
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
