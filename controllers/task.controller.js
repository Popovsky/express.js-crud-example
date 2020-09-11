const { Task } = require('./../models');

module.exports.createTask = async (req, res, next) => {
  const { body } = req;
  try {
    const newTask = await Task.createTask(body);

    res.status(201).send(newTask);
  } catch (e) {
    next(e);
  }
};

module.exports.updateTaskById = async (req, res, next) => {
  const {
    params: { taskId },
    body,
  } = req;

  const task = await Task.findById(taskId);

  if (task) {
    const updatedTask = await task.update(body);
    return res.status(200).send(updatedTask);
  }
  res.status(404).send({ message: 'Task not found' });
};

module.exports.getTaskById = async (req, res, next) => {
  const {
    params: { taskId },
  } = req;

  const task = await Task.findById(taskId);

  if (task) {
    return res.status(200).send(task);
  }
  res.status(404).send({ message: 'Task not found' });
};

module.exports.removeTaskById = async (req, res, next) => {
  const {
    params: { taskId },
  } = req;

  const result = await Task.removeById(taskId);
  if (result) {
    return res.status(204).send();
  }
  res.status(404).send({ message: 'Task not found' });
};

module.exports.getAllTasks = async (req, res, next) => {
  const tasks = await Task.findAll();
  res.send(tasks);
};
