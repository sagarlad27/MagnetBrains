const express=require("express");
const validateToken = require("../middleware/validateTokenHandler");
const { 
        createTaskForUser,
        getAllTask, 
        getTaskById, 
        updateTask, 
        deleteTask, 
        updateTaskStatus, 
        updateTaskPriority } = require("../controllers/taskController");

const router=express.Router();

router.route("/createTaskForUser").post(validateToken,createTaskForUser);

router.route("/getAllTask").get(validateToken,getAllTask);

router.route("/getTaskById").get(validateToken,getTaskById);

router.route("/updateTask").patch(validateToken,updateTask);

router.route("/deleteTask").delete(validateToken,deleteTask);

router.route("/updateTaskStatus").patch(validateToken,updateTaskStatus);

router.route("/updateTaskPriority").patch(validateToken,updateTaskPriority);

module.exports=router;