import TaskList from "./components/TaskList";
import TasForm from "./components/TaskForm";
import { TaskProvider } from "./context/TaskContext";

function App() {
  return (
    <div className="bg-zinc-900 h-screen text-white flex items-center justify-center">
      <div className="bg-gray-950 p-4 w-1/5">
        <h1 className="text-3xl font-bold text-center block my-2">Task App</h1>

        <TaskProvider>
          <TasForm />
          <TaskList />
        </TaskProvider>
      </div>
    </div>
  );
}

export default App;
