import {
  findVideoIdByUser,
  insertStats,
  updateStats,
} from '../../lib/db/hasura';
import { verifyToken } from '../../lib/utils';

const stats = async (req, res) => {
  try {
    if (!(req.method === 'POST' || req.method === 'GET'))
      return res.status(400).json({ message: 'Invalid method' });

    const { videoId } = req.method === 'POST' ? req.body : req.query;

    if (!videoId)
      return res.status(400).json({ message: 'Video id is required' });

    const token = req.cookies?.token;

    const userId = await verifyToken(token);

    console.log(userId);
    if (!userId) return res.status(403).send({});

    const stats = await findVideoIdByUser(token, userId, videoId);

    const isStatsExist = stats?.length > 0;

    if (req.method === 'GET') return res.status(200).json(stats);

    const { favourited, watched = true } = req.body;

    if (!isStatsExist) {
      const response = await insertStats(token, {
        favourited,
        watched,
        userId,
        videoId,
      });
      return res.status(201).json({
        stats: response?.data?.insert_stats_one,
      });
    }
    const response = await updateStats(token, {
      favourited,
      userId,
      watched,
      videoId,
    });

    return res.status(200).json({
      data: response?.data?.update_stats,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Something went wrong',
    });
  }
};

export default stats;
