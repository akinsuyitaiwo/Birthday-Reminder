import Joi from "Joi";

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
    const schema =  Joi.obJoiect({
        email: Joi.String().required(true).email(),
        username: Joi.String().min(5).required(),
        birthday: Joi.Number().required(true)
    });
    return schema.validate(User,options)
}

export default validateUser