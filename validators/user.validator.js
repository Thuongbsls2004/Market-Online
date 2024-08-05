const Joi = require('joi');

const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': "Email must be a valid emails address",
        'any.required': "Email is required"
    }),
    password: Joi.string().min(4).required().messages({
        'string.min': "password must be at least 4 characters long",
        'any.required': "password is required"
    })
});

const registerSchema = Joi.object({
    name: Joi.string().required().messages({'any.required': "name is required"}),
    email: Joi.string().email().required().messages({
        'string.email': "Email must be a valid emails address",
        'any.required': "Email is required"
    }),
    password: Joi.string().min(4).required().messages({
        'string.min': "password must be at least 4 characters long",
        'any.required': "password is required"
    })
})

module.exports = {

 validateLogin: (req, res, next) => {
    const { error } = loginSchema.validate(req.body, {abortEarly: false});
    if (error) {
        const errors = error.details.map(err => ({
            mesage: err.message,
            path: err.path
        }));
        return res.status(400),json({errors});
    }
    next();
},
validateRegister: (req, res, next)=> {
    const { error } = registerSchema.validate(req.body, {abortEarly: false});
    if (error) {
        const errors = error.details.map(err => ({
            mesage: err.message,
            path: err.path
        }));
        return res.status(400),json({errors});
    }
    next();
}

}