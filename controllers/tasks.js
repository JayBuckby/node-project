import { Tasks } from "../models/tasks.js";
import { Op } from "sequelize";

export const addTask = async (req, res) => {
  try {
    const task = await Tasks.create(req.body);
    if (task === null) {
      throw new Error("Unable to create task, please check your entry");
    }
    res.status(201).send(`The task "${task.title}" has been created`);
  } catch (error) {
    res.status(403).send(error.message);
  }
};

export const viewTasks = async (req, res) => {
  const { title, description, priority, created_by } = req.query;

  const query = {
    attributes: ["priority", "title", "description", "created_by"],
    where: {},
    order: [],
  };
  if (title) {
    query.where.title = { [Op.like]: `%${title}%` };
  }
  if (description) {
    query.where.description = { [Op.like]: `%${description}%` };
  }
  if (created_by) {
    query.where.created_by = { [Op.eq]: created_by };
  }
  // Match priority to what it is set as in the search param.
  if (priority == "asc") {
    query.order[0] = ["priority", "ASC"];
  } else if (priority == "desc") {
    query.order[0] = ["priority", "DESC"];
  } else if (priority) {
    query.where.priority = { [Op.eq]: priority };
  }

  try {
    const tasks = await Tasks.findAll(query);
    res.send(tasks);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

export const getTaskByID = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const task = await Tasks.findByPk(id);
    if (task === null) {
      throw new Error("Task not found");
    }
    res.send(task);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

export const updateTaskById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const task = await Tasks.update(req.body, {
      where: {
        id: id,
      },
    });

    if (task[0] === 0) {
      throw new Error("Task not found");
    }
    res.send("This task has been updated");
  } catch (error) {
    res.status(404).send(error.message);
  }
};

export const deleteTask = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const taskstore = await Tasks.findByPk(id);
    const taskTitle = taskstore.title;
    const task = await Tasks.destroy({
      where: {
        id: id,
      },
    });
    if (!task) {
      throw new Error("Task not found");
    }
    res
      .status(201)
      .send(`The task "${taskTitle}" has been sucessfully deleted`);
  } catch (error) {
    res.status(404).send(error.message);
  }
};
