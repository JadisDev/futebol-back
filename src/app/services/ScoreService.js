import Game from '../models/Game';
import mongoose from 'mongoose';

class ScoreService {

  async scoreGol(req, res) {
    try {

      console.log(req.group);

      const data = await Game.aggregate(
        [
          {
            $lookup:
            {
              from: 'groupusers',
              localField: 'groupUser',
              foreignField: '_id',
              as: 'groupUser'
            }
          },
          { $lookup:
            {
              from: 'users',
              localField: 'groupUser.user',
              foreignField: '_id',
              as: 'user'
            }
          },
          {
            $group: {
              _id: {user: "$user"},
              total: {
                $sum: "$gol"
              },
              group: { $first: '$groupUser.group' }
            }
          },

          { $match: { 'group': mongoose.Types.ObjectId(req.group) } }
        ]
      ).sort({ total: -1 });

      return res.json(data);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

}

export default new ScoreService();
