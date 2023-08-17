import mongo from 'mongoose';
const { model, Schema } = mongo;

const a = new Schema({
    User: String,
    Badges: Array
});

export default model("badgeSchema", a);