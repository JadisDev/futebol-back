class ValidatorDefault {

  getMessages() {
    return {
      required: 'Campo obrigatório :attribute',
      min: 'Mínimo de caracteres :min para :attribute',
      max: 'Mínimo de caracteres :max para :attribute'
    }
  }

}

export default new ValidatorDefault();
