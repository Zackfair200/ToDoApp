import { useTasks } from "../context/useTasks";
import { Task } from "../interfaces/task.interface";
import { IoCheckmarkCircleOutline, IoTrashOutline } from "react-icons/io5";

interface Props {
  task: Task;
}

export default function TaskItem({ task }: Props) {
  const { deleteTask, updateTask } = useTasks();

  return (
    <div
      key={task._id}
      className="bg-gray-900 p-2 my-2 flex justify-between hover:bg-gray-800 hover:cursor-pointer"
    >
      <div>
        <h1>{task.title}</h1>
        <p>{task.description}</p>
      </div>
      <div className="flex gap-x-2">
        {task.done ? (
          <IoCheckmarkCircleOutline
            className="text-gray-500"
            onClick={() => {
              updateTask(task._id, {
                done: !task.done,
              });
            }}
          />
        ) : (
          <IoCheckmarkCircleOutline
            className="text-green-500"
            onClick={() => {
              updateTask(task._id, {
                done: !task.done,
              });
            }}
          />
        )}
        <IoTrashOutline
          onClick={async () => {
            if (!window.confirm("Are you sure you want to delete this task?"))
              return;
            await deleteTask(task._id);
          }}
        />
      </div>
    </div>
  );
}
