import { Schema, model } from "mongoose";

const CategorySchema = new Schema({
    _id: { type: Schema.Types.ObjectId, required: true },
    name: {type: String, required: true},
},{collation: categories});

export default model ("Category",CategorySchema);