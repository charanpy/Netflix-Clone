import jwt from 'jsonwebtoken';
import {
  findVideoIdByUser,
  insertStats,
  updateStats,
} from '../../lib/db/hasura';

const stats = async (req, res) => {
  try {
    if (!(req.method === 'POST' || req.method === 'GET'))
      return res.status(400).json({ message: 'Invalid method' });

    const { videoId } = req.method === 'POST' ? req.body : req.query;

    if (!videoId)
      return res.status(400).json({ message: 'Video id is required' });

    const token = req.cookies?.token;
    if (!token) return res.status(403).send({});

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) return res.status(403).send({});

    const stats = await findVideoIdByUser(token, decoded.issuer, videoId);

    const isStatsExist = stats?.length > 0;

    if (req.method === 'GET') return res.status(200).json(stats);

    const { favourited, watched = true } = req.body;

    if (!isStatsExist) {
      const response = await insertStats(token, {
        favourited,
        watched,
        userId: decoded.issuer,
        videoId,
      });
      return res.status(201).json({
        stats: response?.data?.insert_stats_one,
      });
    }
    const response = await updateStats(token, {
      favourited,
      userId: decoded.issuer,
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
