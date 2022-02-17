import Link from 'next/link';
import Card from './Card';
import styles from './SectionCard.module.css';

const SectionCard = ({ title, videos = [], size }) => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cardWrapper}>
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
