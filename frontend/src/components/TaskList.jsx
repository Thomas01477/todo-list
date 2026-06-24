import Button from "./Button.jsx";

function TaskList({ tasks, onToggleTask, onDeleteTask }) {
  if (tasks.length === 0)
    return <p className="taskListNoData">Aucune tâche à afficher.</p>;

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <input
            type="checkbox"
            checked={task.is_completed}
            onChange={() => onToggleTask(task.id, task.is_completed)}
          />
          <p style={{ textDecoration: task.is_completed ? "line-through" : "none", color: task.is_completed ? "#999" : "inherit" }}>
            {task.description} ({task.category_name})
          </p>
          <Button onClick={() => onDeleteTask(task.id)} label="Supprimer" />
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
