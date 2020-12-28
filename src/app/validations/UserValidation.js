import ValidatorDefault from './ValidatorDefault';
import {ValidationException} from '../exception/ValidationException';
import User from '../models/User';
let Validator = require('validatorjs');

class UserValidation {

  async validateNewUser(data) {

    const { login } = data;

    if (await User.findOne({ login })) {
      throw new ValidationException(JSON.stringify({error: 'Usuário ja cadastrado'}));
    }

    let rulesNewUser = {
      name: 'required|min:3',
      login: 'required|min:3',
      password: 'required|min:3',
      active: 'required',
      admin: 'required'
    };

    let validation = new Validator(data, rulesNewUser, ValidatorDefault.getMessages());
    if (validation.fails()) {
      throw new ValidationException(JSON.stringify(validation.errors.all()));
    }

  }
}

export default new UserValidation();
