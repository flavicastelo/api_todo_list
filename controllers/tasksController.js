import { db } from "../database/db.js";
export const createTask = (req, res) => {
    const queryTask = "INSERT INTO tasks(`user_id`, `description`) VALUES(?)";

    const values = [
        req.body.userId,
        req.body.description
    ];
    db.query(queryTask, [values], (err) => {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }
        return res.status(201).json("Tarefa criada com sucesso!");
    });
}

export const getTasks = (req, res) => {
    const queryTask = "SELECT * FROM tasks";

    db.query(queryTask, (err, data) => {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }
        return res.status(200).json(data);
    });
}

export const editTask = (req, res) => {
    const userId = req.params.userId;
    const taskId = req.params.taskId;
    const newDescription = req.body.newDescription;

    const queryGetUserTasks = "SELECT * FROM tasks WHERE user_id = ?";
    db.query(queryGetUserTasks, [userId], (err, result) => {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        const task = result.find(task => task && task.task_id === parseInt(taskId));

        if (!task) {
            return res.status(404).json({
                error: "Tarefa não encontrada"
            });
        }

        const queryUpdateTask = "UPDATE tasks SET description = ? WHERE user_id = ? AND task_id = ?";
        db.query(queryUpdateTask, [newDescription, userId, taskId], (err) => {
            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }
            return res.status(200).json("Tarefa editada com sucesso!");
        });
    });
}

export const deleteTask = (req, res) => {
    const userId = req.params.userId;
    const taskId = req.params.taskId;

    const queryDeleteTask = "DELETE FROM tasks WHERE user_id = ? AND task_id = ?";
    db.query(queryDeleteTask, [userId, taskId], (err, result) => {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                error: "Tarefa não encontrada"
            });
        }

        return res.status(200).json("Tarefa excluída com sucesso!");
    });
}
