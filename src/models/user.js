import { Schema , model} from "mongoose";

const userSchema = new schema ({
    username: {
        type: String,
    },
    email: {
        type: String
    },
    birthday: {
        type: Date
    }
}, {timestamp: true});

export default model('User', userSchema); 