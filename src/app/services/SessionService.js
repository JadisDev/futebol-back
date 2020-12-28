import jwt from 'jsonwebtoken';
import User from '../models/User';
import authConfig from '../../config/auth';
import GroupUser from '../models/GroupUser';
import Group from '../models/Group';

class SessionService {

  async store(data, res) {
    try {
      const { login, password, name_group } = data;

      const user = await User.findOne({ login });

      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }

      const group = await Group.findOne({'name_group': name_group});
      if (!group) {
        return res.status(400).json({ error: 'Group not found' });
      }

      const groupUser = await GroupUser.findOne({user, group});
      if (!groupUser) {
        return res.status(400).json({ error: 'User does not belong to this group' });
      }

      if (!(await user.compareHash(password))) {
        return res.status(400).json({ error: 'Invalid password' });
      }

      const payload = { user, group, groupUser };
      const options = { expiresIn: authConfig.expiresIn, issuer: 'https://jwt.io/' };
      const secret = authConfig.secret;
      const token = jwt.sign(payload, secret, options);

      return res.json({
        user,
        group,
        groupUser,
        token: token,
      });

    } catch (err) {
      return res.status(400).json({ error: 'User authentication failed' });
    }
  }
}

export default new SessionService();
