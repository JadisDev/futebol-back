import User from '../models/User';
import UserValidator from '../validations/UserValidation';
import GroupValidator from  '../validations/GroupValidator';
import { ValidationException } from '../exception/ValidationException';
import mongoose from 'mongoose';
import GroupService from './GroupService';
import GroupUserService from '../services/GroupUserService';

class UserService {

  async store(req, res) {

    const session = await mongoose.startSession();

    try {

      session.startTransaction();

      await UserValidator.validateNewUser(req.body);
      await GroupValidator.validatorNewGroup(req);

      const user = new User(req.body);
      const group = await GroupService.store(req);
      await user.save();
      await GroupUserService.store({user, group});

      await session.commitTransaction();
      session.endSession();

      return res.json(req.body);

    } catch (err) {
      session.endSession();
      if (err instanceof ValidationException) {
        return res.status(400).json({ validation: JSON.parse(err.message) });
      }
      return res.status(400).json({ error: err.message });
    }
  }
}

export default new UserService();
