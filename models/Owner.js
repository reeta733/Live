import mongoose from '../config/conn.js'

let OwnerSchema = mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    address: String,
    state: String,
    city: String,
    password: String,
    status: {
        type: Number,
        default: 1
    }

}, {timestamps:true})

let Owner = mongoose.model("owner", OwnerSchema);

export default Owner;