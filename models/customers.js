import Mongoose from 'mongoose'
import Timestamp from 'mongoose-timestamp'

const Schema = Mongoose.Schema;

const CustomerSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    balance: {
        type: Number,
        default: 0
    }
})

CustomerSchema.plugin(Timestamp);
const customer = Mongoose.model('Customer', CustomerSchema)
export default customer
