import videoData from '../data/videos.json';

const formatData = (data) => {
  return data.items.map((item, idx) => {
    return {
      title: item?.snippet?.title,
      imgUrl: item?.snippet?.thumbnails?.high?.url,
      id: item?.id?.videoId || item.id || idx,
      description: item?.snippet?.description,
      publishTime: item?.snippet?.publishedAt,
      channelTitle: item?.snippet?.channelTitle,
      statistics: item?.statistics ? item?.statistics : { viewCount: 0 },
    };
  });
};

const fetchVideo = async (url) => {
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

  const response = await fetch(
    `https://youtube.googleapis.com/youtube/v3/${url}&key=${YOUTUBE_API_KEY}`
  );

  const data = await response.json();
  if (data?.error) {
    console.log(data?.error);
    return [];
  }

  return formatData(data);
};

export const getVideos = async (searchTerm) => {
  try {
    const data = process.env.DEV
      ? videoData
      : await fetchVideo(`search?part=snippet&maxResults=12&q=${searchTerm}`);
    return formatData(data);
  } catch (error) {
    console.log(error);
    return [];
  }
};

const video = {
  title: 'No Way Home',
  publishTime: '2021-12-12',
  description: 'After Peter Parker identity revealed to public',
  channelTitle: 'Marvel',
  statistics: {
    viewCount: 1000000,
  },
};

export const getVideoById = async (videoId) => {
  try {
    return process.env.DEV
      ? [video]
      : await fetchVideo(
          `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}`
        );
  } catch (error) {
    console.log(error);
    return [];
  }
};
