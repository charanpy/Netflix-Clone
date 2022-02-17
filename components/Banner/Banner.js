import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from './Banner.module.css';

const containerBg = (imgUrl) => ({
  backgroundImage: `url(${imgUrl})`,
  width: '100%',
  height: '100%',
  position: 'absolute',
  // backgroundSize: 'cover',
  backgroundPosition: '50% 50%',
  backgroundRepeat: 'no-repeat',
});

const Banner = ({ title, subTitle, imgUrl }) => {
  const router = useRouter();
  const handleOnPlay = () => {
    console.log('handle');
    router.push(`/video/JfVOs4VSpmA`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftWrapper}>
        <div className={styles.left}>
          <h3 className={styles.title}>{title}</h3>
          <h3 className={styles.subTitle}>{subTitle}</h3>
          <div className={styles.playBtnWrapper}>
            <button className={styles.btnWithIcon} onClick={handleOnPlay}>
              <Image
                src='/static/play.svg'
                alt='play button'
                width='32px'
                height='32px'
              />
              <span className={styles.playText}>Play</span>
            </button>
          </div>
        </div>
      </div>
      <div className={styles.bannerImg} style={containerBg(imgUrl)}></div>
    </div>
  );
};

export default Banner;
