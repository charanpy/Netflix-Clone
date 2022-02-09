import Head from 'next/head';

import Banner from '../components/Banner/Banner';
import SectionCard from '../components/Card/SectionCard';
import Navbar from '../components/NavBar/Navbar';

import { getVideos } from '../lib/videos';
import styles from '../styles/Home.module.css';

export default function Home({
  disneyVideos,
  marvelVideos,
  productivityVideos,
  codingVideos,
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

export async function getServerSideProps() {
  // const disneyVideos = await getVideos('disney trailer');
  // const marvelVideos = await getVideos('marvel');
  // const productivityVideos = await getVideos('productivity');
  // const codingVideos = await getVideos('popular coding');

  const disneyVideos = [];
  const marvelVideos = [];
  const productivityVideos = [];
  const codingVideos = [];

  return {
    props: {
      disneyVideos,
      marvelVideos,
      productivityVideos,
      codingVideos,
    },
  };
}
