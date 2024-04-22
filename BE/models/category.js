import { Schema, model } from "mongoose";

const CategorySchema = new Schema({
    name: {type: String, required: true},
},{ collection: "category"});

export default model ("Category",CategorySchema);