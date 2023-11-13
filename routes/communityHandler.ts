import express from "express"
import authModule from "../Helper/jwtHelper"
import {communitySchema, memberSchema} from "../Helper/schemaValidation"
import communityModel from "../Model/communityModel"
import createError from "http-errors"
import moment from "moment"
const route = express.Router()

//Get all community

route.get("/all-community", authModule.verifyAccessToken, async(req, res, next) => {
    try {
        const allCommunity = await communityModel.find({})
        res.status(200).send(allCommunity)

    } catch (error) {
        next(error)        
    }
})

//Get all community members

route.get("/all-member/:id", authModule.verifyAccessToken, async (req, res, next) => {
    try {
        const findCommunity = await communityModel.findById(req.params.id)
        if(!findCommunity)
            throw createError.NotFound("Could not found the community")

        res.send(findCommunity.membersId)

    } catch (error) {
        next(error)
    }
})

// createCommunity

route.post("/create-community", authModule.verifyAccessToken, async(req, res, next) => {
    try {
        const result = await communitySchema.validateAsync(req.body)
        
        const dublicate = await communityModel.findOne({name: result.name});

        if(dublicate)
            throw createError.Conflict("The community already exists");

        const created_at = moment().format();
        const updated_at = created_at;

        const ownerId = req.headers.userId;
        const name = result.name

        const community = new communityModel({name, ownerId, created_at, updated_at});
        const savedCommunity = await community.save()

        res.send(savedCommunity)        
    } catch (error) {
        next(error)
    }
})

// Add member to the community

route.patch("/add-member", authModule.verifyAccessToken, async (req, res, next) => {
    try {
        const result = await memberSchema.validateAsync(req.body)

        const findCommunity = await communityModel.findById(result.communityId)

        if(!findCommunity)
            throw createError.NotFound("The community does'nt exist")

        if(findCommunity.ownerId != req.headers.userId)
            throw createError.Unauthorized("Only owner of the community can modify the community")
        
        const updatedResp = await communityModel.updateOne(
            {_id: findCommunity._id},
            { $push: {membersId: result.memberId}}
        );

        res.send("Successfully updated the community!!!")
    } catch (error) {
        next(error)        
    }
})

export = route