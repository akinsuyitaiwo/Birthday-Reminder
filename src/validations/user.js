import Joi from "joi";

const options = {
	stripUnknown: true,
	abortEarly: false,
	errors: {
		wrap: {
			label: ""
		}
	}
};

const validateUser =  (User) => {
    const schema =  Joi.object({
        email: Joi.string().required().email(),
        username: Joi.string().min(5).required(),
        birthday: Joi.string().required()
    });
    return schema.validate(User,options)
}

export default validateUser;