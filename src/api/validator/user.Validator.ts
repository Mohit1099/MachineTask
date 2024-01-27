import Joi from "@hapi/joi";

const createUser = Joi.object({
  username: Joi.string().required().messages({
    "any.required": "username is required",
    "string.base": "username must be astring",
  }),
  password: Joi.string()
    .required()
    .pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/))
    .messages({
      'any.required': 'Password is required',
      'string.base': 'Password must be a string',
      'string.pattern.base': 'Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one digit, and one special character.',
    })

});

export { createUser };
