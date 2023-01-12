const Joi = require("joi");

const loginValidation = data => {
    const schema = Joi.object({
        email: Joi.string() .email() .required(),
        password: Joi.string() .required()
    });
    const validation = schema.validate(data);
    return validation;
};


const registerValidation = data => {
    const schema = Joi.object({

        full_name: Joi.string()
            .required(),
        address: Joi.string()
            .required(),
        email: Joi.string()
            .required()
            .email(),
        password:Joi.string()
            .required(),
        skills:Joi.string()
            .required(),
        phone_number:Joi.string()
            .required(),

    });

    const validation = schema.validate(data);
    return validation;
};


module.exports.loginValidation = loginValidation;
module.exports.registerValidation = registerValidation;
