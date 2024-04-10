import { db } from "../database/db.js";

export const createTask = (req, res) => {
    const userId = req.body.userId;
    const description = req.body.description;

    if (isNaN(userId)) {
        return res.status(422).json({ error: "userId deve ser um número." });
    }

    const queryUser = "SELECT * FROM users WHERE user_id = ?";
    db.query(queryUser, userId, (error, result) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        const user = result.find(user => user && user.user_id === parseInt(userId));
        if (!user) {
            return res.status(404).json({
                error: "Usuário não encontrado."
            });
        }
        const queryTask = "INSERT INTO tasks(`user_id`, `description`) VALUES(?)";
        const values = [
            userId,
            description
        ];

        db.query(queryTask, [values], (error) => {
            if (error) {
                return res.status(500).json({ error: error.message });
            }
            return res.status(201).json({ message: "Tarefa criada com sucesso!" });
        });
    });
};


export const getTasks = (req, res) => {
    const queryTask = "SELECT * FROM tasks";

    db.query(queryTask, (error, data) => {
        if (error) {
            return res.status(500).json({
                error: error.message
            });
        }
        return res.status(200).json(data);
    });
}

export const editTask = (req, res) => {
    const userId = req.params.userId;
    const taskId = req.params.taskId;
    const newDescription = req.body.newDescription;

    if (!newDescription) return res.status(422).json({ error: "Campo não pode ser vazio!" });
    if (isNaN(userId)) {
        return res.status(422).json({ error: "userId deve ser um número." });
    }
    if (isNaN(taskId)) {
        return res.status(422).json({ error: "taskId deve ser um número." });
    }

    const queryUser = "SELECT * FROM users WHERE user_id = ?";
    db.query(queryUser, [userId], (error, userResult) => {
        if (error) {
            return res.status(500).json({
                error: error.message
            });
        }

        if (userResult.length === 0) {
            return res.status(404).json({
                error: "Usuário não encontrado."
            });
        }

        const queryTasks = "SELECT * FROM tasks WHERE user_id = ?";
        db.query(queryTasks, [userId], (error, result) => {
            if (error) {
                return res.status(500).json({
                    error: error.message
                });
            }

            const task = result.find(task => task && task.task_id === parseInt(taskId));

            if (!task) {
                return res.status(404).json({
                    error: "Tarefa não encontrada."
                });
            }

            const queryUpdateTask = "UPDATE tasks SET description = ? WHERE user_id = ? AND task_id = ?";
            db.query(queryUpdateTask, [newDescription, userId, taskId], (error) => {
                if (error) {
                    return res.status(500).json({
                        error: error.message
                    });
                }
                return res.status(200).json({ message: "Tarefa editada com sucesso!" });
            });
        });
    });
}


export const deleteTask = (req, res) => {
    const userId = req.params.userId;
    const taskId = req.params.taskId;
    if (isNaN(userId)) {
        return res.status(422).json({ error: "userId deve ser um número." });
    }
    if (isNaN(taskId)) {
        return res.status(422).json({ error: "taskId deve ser um número." });
    }

    const queryUser = "SELECT * FROM users WHERE user_id = ?";
    db.query(queryUser, [userId], (error, userResult) => {
        if (error) {
            return res.status(500).json({
                error: error.message
            });
        }

        if (userResult.length === 0) {
            return res.status(404).json({
                error: "Usuário não encontrado."
            });
        }

        const queryDeleteTask = "DELETE FROM tasks WHERE user_id = ? AND task_id = ?";
        db.query(queryDeleteTask, [userId, taskId], (error, result) => {
            if (error) {
                return res.status(500).json({
                    error: error.message
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    error: "Tarefa não encontrada."
                });
            }

            return res.status(200).json({ message: "Tarefa excluída com sucesso!" });
        });
    });
}
