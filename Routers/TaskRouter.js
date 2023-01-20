const express = require('express');
const router = express.Router()
const TaskControll = require('../Controllers/TaskControll');
const Authentication = require('../Middleware/Authentication')

router.post('/createTask',Authentication,TaskControll.createTask)
router.delete('/deleteTask/:id',TaskControll.deleteTask)
router.put('/updateStatusTask/:id/:status',TaskControll.updateStatusTask)
router.get('/listTaskByStatus/:status',TaskControll.listTaskByStatus)
router.get('/taskStatusCount',TaskControll.taskStatusCount)



module.exports = router ;