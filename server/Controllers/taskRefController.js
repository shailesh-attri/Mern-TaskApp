import { userModel } from "../Models/user.model.js";
import { taskRefModel } from "../Models/taskRef.model.js";
const taskRefController = {
  getTask: async (req, res) => {
    const userId = req.userID
    try {
      const currentUser = await taskRefModel.findOne({ creator: userId });
      if (!currentUser) {
        return res.status(404).send({ message: "user not found" }); // Use return to stop execution here
      }
      const userTask = await currentUser
        .populate({
          path: "allTask",
          options: { sort: { createdAt: -1 } }, // Sort allTask documents by createdAt in descending order
        })
        
      return res.status(200).json({ userTask }); // Use return to stop execution here
    } catch (error) {
      console.log("Internal server error: " + error);
      return res
        .status(500)
        .send({ message: "Internal server error: ", error: error.message }); // Use return to stop execution here
    }
  },
};
export { taskRefController };
