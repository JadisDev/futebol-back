let Validator = require('validatorjs');
import ValidatorDefault from './ValidatorDefault';
import {ValidationException} from '../exception/ValidationException';
import GroupUser from '../models/GroupUser';

class GameValidator {

  async validator (data) {

    const groupUser = await GroupUser.findById(data.groupUser);

    if (!groupUser) {
      throw new ValidationException(JSON.stringify('Grupo user not found'));
    }

    let rules = {
      gol: 'required|integer',
      victory: 'required|integer',
      assistance: 'required|integer',
      date: 'required|date',
      groupUser: 'required'
    };

    let validation = new Validator(data, rules, ValidatorDefault.getMessages());
    if (validation.fails()) {
      throw new ValidationException(JSON.stringify(validation.errors.all()));
    }
  }

}

export default new GameValidator();
