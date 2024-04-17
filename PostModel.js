import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    title: {
        type: String
    },
    desc: {
        type: String
    },
    file: {
        type: String
    },
    email: {
        type: String
    }
})

const PostModel = mongoose.model("posts", PostSchema);
export {PostModel as Post};