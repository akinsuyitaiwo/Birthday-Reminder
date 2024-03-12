import { Schema , model} from "mongoose";

const userSchema = new Schema ({
    username: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    birthday: {
        type: Date
    }
}, {timestamp: true});

export default model('User', userSchema); 