import joi from "@hapi/joi";

export const registerSchema = joi.object({
    firstName: joi.string().min(3).required(),
    lastName: joi.string().min(3).required(),
    email: joi.string().email(),
    password: joi.string().min(5),
})

export const loginSchema = joi.object({
    email: joi.string().email(),
    password: joi.string().min(5),
})

export const communitySchema = joi.object({
    name: joi.string().required(),
    ownerId: joi.string(),
    membersId: joi.array()
})

export const memberSchema = joi.object({
    communityId : joi.required(),
    memberId : joi.required(),
})