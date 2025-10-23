import { userModel } from "../Models/user.model.js";
import { taskRefModel } from "../Models/taskRef.model.js";
const taskRefController = {
  getTask: async (req, res) => {
    const userId = req.userID;

    try {
      const userTask = await taskRefModel
        .findOne({ creator: userId })
        .populate({
          path: "allTask",
          options: { sort: { createdAt: -1 } },
        });

      // 🟡 If no user doc found, return empty structure
      if (!userTask) {
        return res.status(200).json({
          userTask: {
            _id: null,
            creator: userId,
            allTask: [],
            message: "No taskRef found for this user",
          },
        });
      }

      // ✅ Return same structure as your expected response
      return res.status(200).json({ userTask });
    } catch (error) {
      console.error("❌ Internal server error:", error);
      return res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },
};

export { taskRefController };

