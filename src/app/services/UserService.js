import User from '../models/User';
import UserValidator from '../validations/UserValidation';
import {ValidationException} from '../exception/ValidationException';

class UserService {

  async store(req, res) {
    const { login } = req.body;
    try {
      if (await User.findOne({ login })) {
        return res.status(400).json({ error: 'Usuário já existe' });
      }
      await UserValidator.validateNewUser(req.body);
      await User.create(req.body);
      return res.json(req.body);
    } catch (err) {
      if (err instanceof ValidationException) {
        return res.status(400).json({ validation: JSON.parse(err.message) });
      }
      return res.status(400).json({ error: err.message });
    }
  }
}

export default new UserService();
