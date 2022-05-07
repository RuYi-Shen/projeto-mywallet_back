import Joi from "joi";

const recordSchema = Joi.object({
    value: Joi.number().required(),
    description: Joi.string().required()
});

export default recordSchema;