import GroupUserValidator from "../validations/GroupUserValidator";
// import User from '../models/User';
// import Group from '../models/Group';
import GroupUser from '../models/GroupUser';

class GroupUserService {

  async store(data) {
    try {
      await GroupUserValidator.validator(data);
      const {user, group} = data;
      return await GroupUser.create({user, group});
    } catch (err) {
      throw err;
    }
  }

}

export default new GroupUserService();
