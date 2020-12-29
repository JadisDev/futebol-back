import ValidatorDefault from './ValidatorDefault';
import {ValidationException} from '../exception/ValidationException';
let Validator = require('validatorjs');
import Group from '../models/Group';

class GroupValidator {

  async validatorNewGroup(data) {

    const {name_group} = data;

    let rulesNewGroup = {
      'name_group': 'required|min:3',
    };

    let validation = new Validator({'name_group': name_group}, rulesNewGroup, ValidatorDefault.getMessages());
    if (validation.fails()) {
      throw new ValidationException(JSON.stringify(validation.errors.all()));
    }
  }

  async validatorGroupExist(name) {
    const group = await Group.findOne({'name_group': name});
    if (!group) {
      throw new ValidationException(JSON.stringify('Group not found'));
    }
    return group;
  }
}

export default new GroupValidator();
