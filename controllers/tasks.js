import { readFileSync, writeFileSync } from "fs";
import { Tasks } from "../models/tasks.js";

export const addTask = async (req, res) => {
  try {
    const task = await Tasks.create(req.body);
    res.status(201).send({ task: `${task.title} has been created` });
  } catch (error) {
    res.status(403).send(error.message);
  }
};

export const viewTasks = async (req, res) => {
  const { title, description, priority } = req.query;
  try {
    const tasks = await Tasks.findAll();
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
    const task = await Tasks.destroy({
      where: {
        id: id,
      },
    });
    if (!task) {
      throw new Error("Task not found");
    }
    res.status(204).send();
  } catch (error) {
    res.status(404).send(error.message);
  }
};
