import Head from 'next/head';
import SectionCard from '../../components/Card/SectionCard';
import Navbar from '../../components/NavBar/Navbar';
import { getFavouritedVideo } from '../../lib/videos';
import styles from '../../styles/myList.module.css';
import redirectUser from '../../utils/redirect';

const MyList = ({ favouritedVideos = [] }) => {
  return (
    <div>
      <Head>
        <title>My List</title>
      </Head>
      <main className={styles.main}>
        <Navbar />

        <div className={styles.sectionWrapper}>
          <SectionCard
            title='My List'
            size='small'
            videos={favouritedVideos}
            shouldWrap
          />
        </div>
      </main>
    </div>
  );
};

export async function getServerSideProps(ctx) {
  const { userId, token } = await redirectUser(ctx?.req?.cookies?.token);

  if (!userId) {
    return {
      props: {},
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const favouritedVideos = await getFavouritedVideo(token, userId);

  return {
    props: {
      favouritedVideos,
    },
  };
}

export default MyList;
