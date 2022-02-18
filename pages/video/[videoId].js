import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Modal from 'react-modal';
import cls from 'classnames';

import NavBar from '../../components/NavBar/Navbar';
import { getVideoById } from '../../lib/videos';
import styles from '../../styles/video.module.css';
import Like from '../../components/icons/Like';
import DisLike from '../../components/icons/DisLike';

Modal.setAppElement('#__next');

const Video = ({ video }) => {
  const router = useRouter();
  const { videoId } = router.query;

  const [toggleLike, setToggleLike] = useState(false);
  const [toggleDisLike, setToggleDisLike] = useState(false);

  useEffect(() => {
    async function fetchStat() {
      try {
        const res = await fetch(`/api/stats?videoId=${videoId}`);
        const data = await res.json();
        if (data?.length) {
          const isFavourited = data[0].favourited;
          if (isFavourited) {
            setToggleLike(true);
          } else {
            setToggleDisLike(true);
          }
        }
      } catch (error) {}
    }

    fetchStat();
  }, [videoId]);

  const likeApi = async (favourited = 1) => {
    try {
      return await fetch('/api/stats', {
        method: 'POST',
        body: JSON.stringify({
          videoId,
          favourited,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {}
  };

  const handleToggleLike = async () => {
    setToggleLike((like) => !like);
    setToggleDisLike(toggleLike);

    await likeApi();
  };
  const handleToggleDisLike = async () => {
    setToggleDisLike((like) => !like);
    setToggleLike(toggleDisLike);

    await likeApi(0);
  };

  return (
    <div className={styles.container}>
      <NavBar />

      <Modal
        className={styles.modal}
        isOpen={true}
        contentLabel='Watch Video'
        onRequestClose={() => {
          router.back();
        }}
        overlayClassName={styles.overlay}
      >
        <iframe
          id='player'
          type='text/html'
          width='100%'
          className={styles.videoPlayer}
          height='390'
          src={`https://www.youtube.com/embed/${videoId}?autoplay=0&origin=http://example.com&controls=0&rel=0`}
          frameBorder='0'
        ></iframe>
        {video && Object.keys(video)?.length ? (
          <div className={styles.likeDislikeBtnWrapper}>
            <div className={styles.likeBtnWrapper}>
              <button onClick={handleToggleLike}>
                <div className={styles.btnWrapper}>
                  <Like selected={toggleLike} />
                </div>
              </button>
            </div>
            <button onClick={handleToggleDisLike}>
              <div className={styles.btnWrapper}>
                <DisLike selected={toggleDisLike} />
              </div>
            </button>
          </div>
        ) : (
          ''
        )}
        {video && Object.keys(video)?.length ? (
          <div className={styles.modalBody}>
            <div className={styles.modalBodyContent}>
              <div className={styles.col1}>
                <p className={styles.publishTime}>{video.publishTime}</p>
                <p className={styles.title}>{video.title}</p>
                <p className={styles.description}>{video.description}</p>
              </div>
              <div className={styles.col2}>
                <p className={cls(styles.subText, styles.subTextWrapper)}>
                  <span className={styles.textColor}>Cast:</span>
                  <span className={styles.channelTitle}>
                    {video.channelTitle}
                  </span>
                </p>
                <p className={cls(styles.subText, styles.subTextWrapper)}>
                  <span className={styles.textColor}>View Count:</span>
                  <span className={styles.channelTitle}>
                    {video.statistics?.viewCount || ''}
                  </span>
                </p>
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
      </Modal>
    </div>
  );
};

export async function getStaticPaths() {
  const paths = ['JfVOs4VSpmA'];
  return {
    paths: paths.map((path) => ({
      params: {
        videoId: path,
      },
    })),
    fallback: 'blocking',
  };
}

export async function getStaticProps(ctx) {
  const videoId = ctx.params.videoId;

  const videoById = await getVideoById(videoId);
  return {
    props: {
      video: videoById?.length ? videoById[0] : {},
    },
    revalidate: 30,
  };
}

export default Video;
