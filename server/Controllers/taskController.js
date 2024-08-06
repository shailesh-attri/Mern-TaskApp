import { userModel } from "../Models/user.model.js"
import {taskModel} from "../Models/task.model.js"
import { taskRefModel } from "../Models/taskRef.model.js"
const taskController = {
    createTask : async (req, res)=>{
        const userId = req.userID
        console.log("UserId in controller",userId);
        const {taskName, description, deadline} = req.body
        try {
            const user = await userModel.findById(userId)
            if(!user){
                res.send({message:"User not found"})
            }
            const task = new taskModel({
                creator:userId,
                title:taskName,
                description:description,
                deadline:deadline,
            })
            const NewTask = await task.save()

            let taskEntry = await taskRefModel.findOne({creator:userId})
            if(!taskEntry){
                taskEntry = new taskRefModel({
                    creator:userId,
                }) 
            }
            taskEntry.allTask.push(NewTask._id)
            await taskEntry.save()
            res.status(200).json({message:"Task created successfully"})
        } catch (error) {
            console.log("Task saved error", error);
            res.status(500).json({message:"Task saved error", error:error.message})
        }
    },
    updateTask : async (req, res)=>{
        const taskId = req.params.id
        const {taskName, description, deadline, isCompleted, isImportant} = req.body
        try {
            
            const updatedTask = await taskModel.findByIdAndUpdate(taskId, {
                title: taskName,
                description: description,
                deadline: deadline,
                isCompleted: isCompleted,
                isImportant: isImportant
            });
            if (!updatedTask) {
                return res.status(404).json({ message: "Task not found" });
            }
            res.status(200).json({ message: "Task updated successfully" });
        } catch (error) {
            console.log("Task saved error", error);
            res.status(500).json({message:"Task saved error", error:error.message})
        }
    },
    deleteTask: async (req, res) => {
        const taskId = req.params.id;
        
        try {
            const deletedTask = await taskModel.findByIdAndDelete(taskId);
            if (!deletedTask) {
                return res.status(404).json({ message: "Task not found" });
            }
            
            let taskEntry = await taskRefModel.findOne({ allTask: taskId });
            if (!taskEntry) {
                return res.status(404).json({ message: "Task entry not found" });
            }
    
            const index = taskEntry.allTask.indexOf(taskId);
            if (index > -1) {
                taskEntry.allTask.splice(index, 1); // Remove the task ID from the array
            }
            
            await taskEntry.save();
            
            
            return res.status(200).json({ message: "Task deleted successfully" });
        } catch (error) {
            console.log("Task deleting error", error);
            return res.status(500).json({ message: "Task deleting error", error: error.message });
        }
    },
    
    markImportant:async(req, res)=>{
        const taskId = req.params.id
        try {
            const {isImportant} = req.body
            const task =await taskModel.findByIdAndUpdate(taskId, {
                isImportant: isImportant
            })
            const {isImportant:markedImportant} = task._doc
            if(!task){
                return res.status(404).json({ message: "Task not found" });
            } 
            return res.status(200).json({ message: "Task updated successfully",markedImportant }); // Return after sending the response
        } catch (error) {
            console.log("Task deleting error", error);
            return res.status(500).json({ message: "Task deleting error", error: error.message }); // Return after sending the response
        }
    },
    markCompleted:async(req, res)=>{
        const taskId = req.params.id
        try {
            const {isCompleted} = req.body
            const task =await taskModel.findByIdAndUpdate(taskId, {
                isCompleted: isCompleted
            })
            const {isImportant:markedCompleted} = task._doc
            if(!task){
                return res.status(404).json({ message: "Task not found" });
            } 
            let message = "";
                if (isCompleted) {
                message = "Task marked Completed!";
                } else {
                message = "Task marked incomplete!";
                }
            return res.status(200).json({ message, markedCompleted }); // Return after sending the response
        } catch (error) {
            console.log("Task deleting error", error);
            return res.status(500).json({ message: "Task deleting error", error: error.message }); // Return after sending the response
        }
    }

    
}
export{ taskController}