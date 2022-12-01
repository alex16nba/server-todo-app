const Validator = require('validatorjs');

export function validateRegister(data) {
  const rules = {
    email: 'required|email',
	  password: 'required|string',
    name: 'required|string',
  };

  const validation = new Validator(data, rules);

  if (validation.fails()) {
    return validation.errors;
  }

  return false;
}
