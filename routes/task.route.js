const express = require('express');
const taskController = require('./../controllers/task.controller');

const taskRouter = express.Router();

taskRouter.post('/task', taskController.createTask); // create
taskRouter.get('/tasks', taskController.getAllTasks); //read

taskRouter
  .route('/tasks/:taskId')
  .get(taskController.getTaskById)
  .put(taskController.updateTaskById)
  .delete(taskController.removeTaskById);

module.exports = taskRouter;
