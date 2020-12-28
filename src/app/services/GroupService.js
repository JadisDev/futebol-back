import Group from '../models/Group';

class GroupService {

  async store(req) {
    const {name_group} = req.body;
    const group = await Group.findOne({ 'name_group': name_group });
    if (!group) {
      const group = new Group(req.body);
      await group.save();
      return group;
    }

    return group;
  }

}

export default new GroupService();
