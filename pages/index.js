import Head from 'next/head';

import Banner from '../components/Banner/Banner';
import SectionCard from '../components/Card/SectionCard';
import Navbar from '../components/NavBar/Navbar';

import { getVideos, getWatchItAgainVideos } from '../lib/videos';
import styles from '../styles/Home.module.css';
import redirectUser from '../utils/redirect';

export default function Home({
  disneyVideos = [],
  marvelVideos = [],
  productivityVideos = [],
  codingVideos = [],
  watchItAgainVideos = [],
}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix</title>
      </Head>

      <div className={styles.main}>
        <Navbar username='Charan' />
        <Banner
          title='No Way Home'
          subTitle='Superhero,Marvel'
          imgUrl='/static/nwh.jpg'
        />
        <div className={styles.sectionWrapper}>
          <SectionCard title='Disney' videos={disneyVideos} size='large' />
          <SectionCard
            title='Watch it again'
            videos={watchItAgainVideos}
            size='small'
          />
          <SectionCard title='Marvel' videos={marvelVideos} size='small' />
          <SectionCard
            title='Productivity'
            videos={productivityVideos}
            size='medium'
          />
          <SectionCard title='Coding' videos={codingVideos} size='small' />
        </div>
      </div>
    </div>
  );
}

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

  const disneyVideos = await getVideos('disney trailer');
  const marvelVideos = await getVideos('marvel');
  const productivityVideos = await getVideos('productivity');
  const codingVideos = await getVideos('popular coding');

  const watchItAgainVideos = await getWatchItAgainVideos(userId, token);

  return {
    props: {
      disneyVideos,
      marvelVideos,
      productivityVideos,
      codingVideos,
      watchItAgainVideos,
    },
  };
}
