import mongoose from 'mongoose'
const taskSchema = new mongoose.Schema({
    creator:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'userModel'
    },
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    deadline:{
        type: Date,
        required: true,
    },
    isCompleted:{
        type: Boolean,
        default: false,
    },
    isImportant:{
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now // Automatically set to the current date and time when a document is created
    }
},
{
timeStamps: true
},
)

export const taskModel = mongoose.model('taskModel', taskSchema)