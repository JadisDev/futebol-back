import ValidatorDefault from './ValidatorDefault';
import {ValidationException} from '../exception/ValidationException';

let Validator = require('validatorjs');

class UserValidation {

  validateNewUser(data) {

    let rulesNewUser = {
      name: 'required|min:3',
      login: 'required|min:3',
      password: 'required|min:3',
      active: 'required'
    };

    let validation = new Validator(data, rulesNewUser, ValidatorDefault.getMessages());
    if (validation.fails()) {
      console.log(validation.errors.all())
      throw new ValidationException(JSON.stringify(validation.errors.all()));
    }
  }
}

export default new UserValidation();
