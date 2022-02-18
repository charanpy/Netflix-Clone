import videoData from '../data/videos.json';
import disneyData from '../data/disney.json';
import productivityData from '../data/productivity.json';
import codingData from '../data/coding.json';
import { getFavVideo, getWatchedVideos } from './db/hasura';

const formatData = (data) => {
  return data?.items?.map((item, idx) => {
    const id = item?.id?.videoId || item.id;
    return {
      title: item?.snippet?.title || '',
      imgUrl: `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
      id: id || idx,
      description: item?.snippet?.description || '',
      publishTime: item?.snippet?.publishedAt || '',
      channelTitle: item?.snippet?.channelTitle || '',
      statistics: item?.statistics ? item?.statistics : { viewCount: 0 },
    };
  });
};

export const marvelVideos = formatData(videoData);
export const disneyVideos = formatData(disneyData);
export const codingVideos = formatData(codingData);
export const productivityVideos = formatData(productivityData);

const fetchVideo = async (url, searchTerm = '') => {
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

  const response = await fetch(
    `https://youtube.googleapis.com/youtube/v3/${url}&key=${YOUTUBE_API_KEY}`
  );

  const data = await response.json();
  if (data?.error) {
    return [];
  }

  return formatData(data);
};

export const getVideos = async (searchTerm) => {
  try {
    return process.env.DEV
      ? formatData(videoData)
      : await fetchVideo(
          `search?part=snippet&maxResults=12&q=${searchTerm}`,
          searchTerm
        );
  } catch (error) {
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
    return [];
  }
};

export const getWatchItAgainVideos = async (userId, token) => {
  try {
    const videos = await getWatchedVideos(token, userId);
    return videos?.map((video) => ({
      id: video.videoId,
      imgUrl: `https://i.ytimg.com/vi/${video.videoId}/maxresdefault.jpg`,
    }));
  } catch (error) {
    return [];
  }
};

export const getFavouritedVideo = async (token, userId) => {
  try {
    const videos = await getFavVideo(token, userId);
    return videos?.map((video) => ({
      id: video.videoId,
      imgUrl: `https://i.ytimg.com/vi/${video.videoId}/maxresdefault.jpg`,
    }));
  } catch (error) {
    return [];
  }
};
