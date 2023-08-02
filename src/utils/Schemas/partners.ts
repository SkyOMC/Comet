import mongo from "mongoose";

const { model, Schema } = mongo;

let partners = new Schema({
    partners: Array
})

export default model("partnerSchema", partners);