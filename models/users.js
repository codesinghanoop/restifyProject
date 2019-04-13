import Mongoose from 'mongoose'

const schema = Mongoose.Schema;


const Users = new schema({
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
});

const UserModel = Mongoose.model('User', Users);

export default UserModel
