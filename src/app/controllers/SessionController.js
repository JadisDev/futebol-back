import jwt from 'jsonwebtoken';
import User from '../models/User';
import authConfig from '../../config/auth';
import ApiService from '../services/ApiService'

class SessionController {

  async api (req, res) {
    return await ApiService.api(res);
  }

  // responsável por fazer o login do usuário
  async store(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }

      if (!(await user.compareHash(password))) {
        return res.status(400).json({ error: 'Invalid password' });
      }

      return res.json({
        user,
        token: await user.generateToken(),
      });
    } catch (err) {
      return res.status(400).json({ error: 'User authentication failed' });
    }
  }

  async validateToken(req, res) {
    const token = req.body.token || '';
    jwt.verify(token, authConfig.secret, err => {
      return res.status(200).send({ valid: !err });
    });
  }
}

export default new SessionController();
