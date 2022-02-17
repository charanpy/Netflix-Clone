import Link from 'next/link';
import cls from 'classnames';
import Card from './Card';

import styles from './SectionCard.module.css';

const SectionCard = ({ title, videos = [], size, shouldWrap = false }) => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={cls(styles.cardWrapper, shouldWrap && styles.wrap)}>
        {videos.map((video, index) => (
          <Link
            passHref
            href={{
              pathname: '/video/[videoId]',
              query: { videoId: video.id },
            }}
            key={video.id}
          >
            <a>
              <Card id={index} imgUrl={video.imgUrl} size={size} />
            </a>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default SectionCard;
