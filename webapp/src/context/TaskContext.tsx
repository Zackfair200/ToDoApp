import { createContext, useEffect, useState } from "react";
import {
  createApiTaskRequest,
  deleteTaskRequest,
  getTaskRequest,
  updateTaskRequest,
} from "../api/task";
import { Task, UpdateTask, CreateTask } from "../interfaces/task.interface";

interface TaskContextValue {
  tasks: Task[];
  createTask: (task: CreateTask) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  updateTask: (id: string, task: UpdateTask) => Promise<void>;
}

export const TaskContext = createContext<TaskContextValue>({
  tasks: [],
  createTask: async () => {},
  deleteTask: async () => {},
  updateTask: async () => {},
});

interface Props {
  children: React.ReactNode;
}

export const TaskProvider: React.FC<Props> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    getTaskRequest()
      .then((response) => response.json())
      .then((data) => setTasks(data));
  }, []);

  const createTask = async (task: CreateTask) => {
    const response: any = await createApiTaskRequest(task);
    const jsonResponse = await response.json();
    setTasks([...tasks, jsonResponse]);
  };

  const deleteTask = async (id: string) => {
    const response = await deleteTaskRequest(id);
    if (response.status == 204) {
      setTasks(tasks.filter((task) => task._id != id));
    }
  };

  const updateTask = async (id: string, task: UpdateTask) => {
    const response = await updateTaskRequest(id, task);
    const jsonResponse = await response.json();
    setTasks(
      tasks.map((task) =>
        task._id == id ? { ...task, ...jsonResponse } : task
      )
    );
  };

  return (
    <TaskContext.Provider value={{ tasks, createTask, deleteTask, updateTask }}>
      {children}
    </TaskContext.Provider>
  );
};
