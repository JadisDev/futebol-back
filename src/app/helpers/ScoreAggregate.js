import mongoose from 'mongoose';

class ScoreAggregate {

  async conf(collumnCount, groupId) {
    return [
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
            $sum: collumnCount
          },
          group: { $first: '$groupUser.group' }
        }
      },

      { $match: { 'group': mongoose.Types.ObjectId(groupId) } }
    ]
  }

  async confCount(groupId) {
    return [
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
            $count: '$_id'
          },
          group: { $first: '$groupUser.group' }
        }
      },

      { $match: { 'group': mongoose.Types.ObjectId(groupId) } }
    ]
  }

}

export default new ScoreAggregate();
