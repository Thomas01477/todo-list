import { useState, useEffect } from "react";
import Button from "./Button.jsx";
import TaskList from "./TaskList.jsx";

const API_URL = import.meta.env.VITE_API_URL;

function Form() {
  const [categories, setCategories] = useState([]);
  const [tasks, setTasks] = useState([]);

  const [categoryInput, setCategoryInput] = useState("");
  const [taskInput, setTaskInput] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [filterCategoryId, setFilterCategoryId] = useState("");

  const [loading, setLoading] = useState(true);
  const [categoryError, setCategoryError] = useState("");
  const [taskError, setTaskError] = useState("");

  useEffect(() => {
    Promise.all([
      fetch(`${API_URL}/categories/`).then((res) => res.json()),
      fetch(`${API_URL}/tasks/`).then((res) => res.json()),
    ])
      .then(([categoriesData, tasksData]) => {
        setCategories(categoriesData);
        setTasks(tasksData);
        if (categoriesData.length > 0) {
          setSelectedCategoryId(String(categoriesData[0].id));
        }
        setLoading(false);
      })
      .catch(() => {
        setTaskError("Impossible de contacter le serveur. Vérifiez que le backend Django est démarré.");
        setLoading(false);
      });
  }, []);

  const handleAddCategory = () => {
    if (categoryInput.trim() === "") return;
    setCategoryError("");

    fetch(`${API_URL}/categories/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: categoryInput.trim() }),
    })
      .then((res) => res.json().then((data) => ({ ok: res.ok, data })))
      .then(({ ok, data }) => {
        if (ok) {
          const updated = [...categories, data];
          setCategories(updated);
          setCategoryInput("");
          if (categories.length === 0) {
            setSelectedCategoryId(String(data.id));
          }
        } else {
          // Affichage de l'erreur renvoyée par Django (ex: nom déjà existant)
          if (data.name) {
            setCategoryError(data.name[0]);
          } else {
            setCategoryError("Erreur lors de l'ajout de la catégorie.");
          }
        }
      })
      .catch(() => setCategoryError("Erreur réseau."));
  };

  const handleAddTask = () => {
    if (taskInput.trim() === "" || !selectedCategoryId) return;
    setTaskError("");

    fetch(`${API_URL}/tasks/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        description: taskInput.trim(),
        category: parseInt(selectedCategoryId),
      }),
    })
      .then((res) => res.json().then((data) => ({ ok: res.ok, data })))
      .then(({ ok, data }) => {
        if (ok) {
          setTasks([...tasks, data]);
          setTaskInput("");
        } else {
          // Affichage des erreurs de validation Django
          if (data.description) {
            setTaskError(data.description[0]);
          } else if (data.category) {
            setTaskError(data.category[0]);
          } else {
            setTaskError("Erreur lors de l'ajout de la tâche.");
          }
        }
      })
      .catch(() => setTaskError("Erreur réseau."));
  };

  const handleToggleTask = (taskId, currentStatus) => {
    fetch(`${API_URL}/tasks/${taskId}/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_completed: !currentStatus }),
    })
      .then((res) => res.json())
      .then((data) => {
        setTasks(tasks.map((t) => (t.id === taskId ? data : t)));
      })
      .catch(() => {});
  };

  const handleDeleteTask = (taskId) => {
    fetch(`${API_URL}/tasks/${taskId}/`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        setTasks(tasks.filter((t) => t.id !== taskId));
      }
    }).catch(() => {});
  };

  const filteredTasks = filterCategoryId
    ? tasks.filter((t) => t.category === parseInt(filterCategoryId))
    : tasks;

  if (loading) {
    return <p className="taskListNoData">Chargement...</p>;
  }

  return (
    <>
      <form>
        <div className="newCategory">
          <input
            type="text"
            placeholder="Nouvelle catégorie"
            onChange={(e) => setCategoryInput(e.target.value)}
            value={categoryInput}
          />
          <Button onClick={handleAddCategory} label="Ajouter catégorie" />
        </div>
        {categoryError && <p className="error">{categoryError}</p>}

        <div className="categoriesFilters">
          <select
            value={filterCategoryId}
            onChange={(e) => setFilterCategoryId(e.target.value)}
          >
            <option value="">Toutes les catégories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="newTask">
          <input
            type="text"
            placeholder="Nouvelle tâche"
            onChange={(e) => setTaskInput(e.target.value)}
            value={taskInput}
          />
          <select
            onChange={(e) => setSelectedCategoryId(e.target.value)}
            value={selectedCategoryId}
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <Button onClick={handleAddTask} label="Ajouter" />
        </div>
        {taskError && <p className="error">{taskError}</p>}
      </form>

      <TaskList
        tasks={filteredTasks}
        onToggleTask={handleToggleTask}
        onDeleteTask={handleDeleteTask}
      />

      <button
        type="button"
        onClick={() => {
          const user = undefined;
          console.log(user.name);
        }}
        style={{ marginTop: "20px", display: "block", marginLeft: "auto", marginRight: "auto" }}
      >
        Crash Test
      </button>
    </>
  );
}

export default Form;
