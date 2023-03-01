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
            .required()
            .min(4),
        skills:Joi.string()
            .required(),
        phone_number:Joi.string()
            .required()
            .length(10)
            .pattern(/^[0-9]+$/),
    });

    const validation = schema.validate(data);
    return validation;
};

const editProfileValidation = data => {
    const schema = Joi.object({
        full_name: Joi.string(),
        email: Joi.string()
            .required()
            .email()
            .pattern(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/),
        address: Joi.string(),
        skills:Joi.string(),
        phone_number:Joi.string()
            .length(10)
            .pattern(/^[0-9]+$/),
    });

    const validation = schema.validate(data);
    return validation;
};



module.exports.loginValidation = loginValidation;
module.exports.registerValidation = registerValidation;
module.exports.editProfileValidation = editProfileValidation;
