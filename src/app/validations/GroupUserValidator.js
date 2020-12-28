import ValidatorDefault from './ValidatorDefault';
import {ValidationException} from '../exception/ValidationException';
import GroupUser from '../models/GroupUser';
let Validator = require('validatorjs');

class GroupUserValidator {

  async validator(data) {

    if (await GroupUser.findOne(data)) {
      throw new ValidationException(JSON.stringify({error: 'Usuário ja pertence ao grupo'}));
    }

    let rules = {
      user: 'required',
      group: 'required'
    };

    let validation = new Validator(data, rules, ValidatorDefault.getMessages());
    if (validation.fails()) {
      throw new ValidationException(JSON.stringify(validation.errors.all()));
    }
  }

}

export default new GroupUserValidator();
