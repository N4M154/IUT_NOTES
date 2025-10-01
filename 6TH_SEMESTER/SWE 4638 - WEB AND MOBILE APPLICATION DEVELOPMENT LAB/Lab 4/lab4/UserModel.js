import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name: { type: String, required: true },
        email: {type:String, required:true},
        age:{type:Number, required:true},
        phone:{type:String, required:true},

    },
    {
        timestamps: true,
    }
);

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
