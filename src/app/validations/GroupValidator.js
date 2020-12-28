import ValidatorDefault from './ValidatorDefault';
import {ValidationException} from '../exception/ValidationException';
let Validator = require('validatorjs');

class GroupValidator {

  async validatorNewGroup(data) {

    const {name_group} = data;

    console.log(name_group);

    let rulesNewGroup = {
      'name_group': 'required|min:3',
    };

    let validation = new Validator({'name_group': name_group}, rulesNewGroup, ValidatorDefault.getMessages());
    if (validation.fails()) {
      throw new ValidationException(JSON.stringify(validation.errors.all()));
    }
  }
}

export default new GroupValidator();
