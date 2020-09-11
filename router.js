const express = require('express');
const taskRouter = require('./routes/task.route');
const router = express.Router();

router.use(taskRouter);

module.exports = router;
