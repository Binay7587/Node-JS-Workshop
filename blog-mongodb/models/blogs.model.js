import mongoose from "mongoose";

const blogsSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const blogModel = mongoose.model("blogs", blogsSchema);

export default blogModel;