import Joi from "joi";

export const userValidation = Joi.object({
   username: Joi.string().min(3).required(),
   password: Joi.string()
            .min(8)
            .required()
            .pattern(new RegExp('^(?=.*[a-zA-Z])(?=.*[0-9])'))
            .messages({
                'string.pattern.base': 'Password harus memiliki setidaknya satu huruf dan satu angka'
            })
});
