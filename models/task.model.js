class Task {
  constructor(values) {
    for (const key in values) {
      if (values.hasOwnProperty(key)) {
        this[key] = values[key];
      }
    }
  }
  update(values) {
    Task.db.set(
      this.id,
      new Task({
        ...this,
        ...values,
      })
    );
    return Promise.resolve(Task.db.get(this.id));
  }
}

Task.db = new Map()
  .set(
    1,
    new Task({
      id: 1,
      value: 'Test 1',
      deadline: '2020-10-10 14:00',
      isDone: false,
    })
  )
  .set(
    2,
    new Task({
      id: 2,
      value: 'Test 2',
      deadline: '2020-10-11 14:00',
      isDone: false,
    })
  )
  .set(
    3,
    new Task({
      id: 3,
      value: 'Test 2',
      deadline: '2020-10-12 14:00',
      isDone: false,
    })
  );

Task.createTask = function (value) {
  const newTask = new Task({ ...value });
  newTask.id = this.db.size + 1;
  this.db.set(newTask.id, newTask);
  return Promise.resolve(newTask);
};

Task.findById = function (id) {
  return Promise.resolve(this.db.get(Number(id)));
};

Task.findAll = function () {
  return Promise.resolve([...this.db.values()]);
};

Task.removeById = function (id) {
  return Promise.resolve(this.db.delete(Number(id)));
};

module.exports = Task;
