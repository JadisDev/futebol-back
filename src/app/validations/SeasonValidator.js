import ValidatorDefault from './ValidatorDefault';
import {ValidationException} from '../exception/ValidationException';
let Validator = require('validatorjs');

class GroupUserValidator {

  async validator(data) {

    let rules = {
      name_season: 'required|min:3'
    };

    let validation = new Validator(data, rules, ValidatorDefault.getMessages());
    if (validation.fails()) {
      throw new ValidationException(JSON.stringify(validation.errors.all()));
    }
  }

}

export default new GroupUserValidator();
