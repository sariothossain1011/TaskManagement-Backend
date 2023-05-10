const express = require('express');
const router = express.Router()
const TaskController = require('../Controllers/TaskController');
const Authentication = require('../Middleware/Authentication')

router.post('/createTask',Authentication,TaskController.createTask)
router.delete('/deleteTask/:id',Authentication,TaskController.deleteTask)
router.get('/updateStatusTask/:id/:status',Authentication,TaskController.updateStatusTask)
router.get('/listTaskByStatus/:status',Authentication,TaskController.listTaskByStatus)
router.get('/taskStatusCount',Authentication,TaskController.taskStatusCount)



module.exports = router ;