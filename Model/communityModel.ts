import mongoose from 'mongoose';
const Schema = mongoose.Schema


const CommunitySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    ownerId: {
        type: String,
        required: false,
    },
    membersId: {
        type: Array
    },
    createdAt: {
        type: String,
        required: false,
    },
    updatedAt: {
        type: String,
        required: false,
    }
})

const Community = mongoose.model('community', CommunitySchema);

export default Community;