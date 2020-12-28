import User from '../models/User';
import UserValidator from '../validations/UserValidation';
import GroupValidator from  '../validations/GroupValidator';
import { ValidationException } from '../exception/ValidationException';
import mongoose from 'mongoose';
import GroupService from './GroupService';
import GroupUserService from '../services/GroupUserService';
import SeasonService from '../services/SeasonService';
import SeasonValidator from '../validations/SeasonValidator';

class UserService {

  async store(req, res) {

    const session = await mongoose.startSession();

    try {

      session.startTransaction();

      await UserValidator.validateNewUser(req.body);
      await GroupValidator.validatorNewGroup(req.body);
      await SeasonValidator.validator(req.body);

      const user = new User(req.body);
      const group = await GroupService.store(req);
      await user.save();
      const groupUser = await GroupUserService.store({user, group});

      const {name_season} = req.body;
      const seasonData = {'group_user': groupUser, 'name_season': name_season}
      SeasonService.store(seasonData);

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
