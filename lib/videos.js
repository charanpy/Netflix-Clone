// import videoData from '../data/videos.json';

export const getVideos = async (searchTerm) => {
  try {
    const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

    const response = await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&q=${searchTerm}&key=${YOUTUBE_API_KEY}`
    );

    const data = await response.json();
    if (data?.error) {
      return [];
    }

    return data.items.map((item, idx) => {
      return {
        title: item?.snippet?.title,
        imgUrl: item?.snippet?.thumbnails?.high?.url,
        id: item?.id?.videoId || item.id || idx,
      };
    });
  } catch (error) {
    return [];
  }
};
