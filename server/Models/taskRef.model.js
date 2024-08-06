import mongoose from 'mongoose';
const taskRefSchema = new mongoose.Schema({
    creator :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'userModel',
        required:true
    },

    allTask:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"taskModel",
            default:[]
        }
    ],
    
}, {
    timestamps:true
})
export const taskRefModel = mongoose.model("taskRefModel", taskRefSchema)