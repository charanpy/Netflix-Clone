import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import cls from 'classnames';

import styles from './Card.module.css';

const classMap = {
  large: styles.lgItem,
  medium: styles.mdItem,
  small: styles.smItem,
};

const defaultImage =
  'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=859&q=80';

const scale = (elem) => (elem === 0 ? { scaleY: 1.1 } : { scale: 1.1 });

const Card = ({ imgUrl = defaultImage, size = 'medium', id }) => {
  const [imgSrc, setImgSrc] = useState(imgUrl);

  const handleOnError = () => {
    setImgSrc(defaultImage);
  };

  return (
    <div className={styles.container}>
      <motion.div
        whileHover={{ ...scale(id) }}
        className={cls(styles.imgMotionWrapper, classMap[size])}
      >
        <Image
          src={imgSrc}
          alt='image'
          layout='fill'
          className={styles.cardImg}
          onError={handleOnError}
        />
      </motion.div>
    </div>
  );
};

export default Card;
