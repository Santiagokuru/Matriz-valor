import React, { useState, useEffect } from "react";
import { type Task, type QuadrantThemes, DEFAULT_THEMES } from "./types";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import MatrixChart from "./components/MatrixChart";
import Settings from "./components/Settings";
import { Settings as SettingsIcon, BrainCircuit } from "lucide-react";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const saved = localStorage.getItem("matrix_tasks");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Error cargando tareas", e);
      return [];
    }
  });

  const [themes, setThemes] = useState<QuadrantThemes>(() => {
    try {
      const saved = localStorage.getItem("matrix_themes");
      return saved ? JSON.parse(saved) : DEFAULT_THEMES;
    } catch (e) {
      return DEFAULT_THEMES;
    }
  });

  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    localStorage.setItem("matrix_tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("matrix_themes", JSON.stringify(themes));
  }, [themes]);

  const addTask = (task: Omit<Task, "id">) => {
    const newTask = { ...task, id: crypto.randomUUID() };
    setTasks((prev) => [...prev, newTask]);
  };

  const updateTask = (updatedTask: Task) => {
    setTasks((prev) => prev.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
    setEditingTask(null);
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    if (editingTask?.id === id) setEditingTask(null);
  };

  return (
    <div className="flex h-screen w-full bg-[#FAF9F6] text-[#2A2926] overflow-hidden font-sans selection:bg-[#7A6E5D]/20">
      {/* Panel Lateral Izquierdo */}
      <aside className="w-[480px] shrink-0 border-r border-[#E2DDD5] bg-[#F4F1EA] flex flex-col z-10 shadow-sm">
        <header className="p-8 pb-6 flex justify-between items-center bg-[#F4F1EA]">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#7A6E5D] rounded-xl shadow-sm">
              <BrainCircuit size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight text-[#2A2926] uppercase">
                MATRIZ DE PRIORIZACIÓN
              </h1>
              <p className="text-[11px] text-[#7C756B] font-bold tracking-[0.2em] uppercase">Sistema de Priorización de tareas</p>
            </div>
          </div>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`p-2.5 rounded-xl transition-all duration-300 border ${showSettings ? 'bg-[#7A6E5D] border-[#7A6E5D] text-white rotate-90' : 'bg-white/85 border-[#E2DDD5] text-[#7C756B] hover:text-[#2A2926] hover:bg-white shadow-sm'}`}
            title="Configuración"
          >
            <SettingsIcon size={22} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-8 pt-4 space-y-10 custom-scrollbar">
          {showSettings ? (
            <div className="animate-in fade-in slide-in-from-left-4 duration-300">
              <Settings themes={themes} setThemes={setThemes} onClose={() => setShowSettings(false)} />
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-10">
              <section className="space-y-4">
                <div className="flex items-center justify-between px-1">
                  <h2 className="text-[13px] font-black uppercase tracking-[0.15em] text-[#7C756B]">
                    {editingTask ? "Modificación" : "Terminal de Entrada"}
                  </h2>
                  {editingTask && (
                    <span className="text-[11px] bg-[#7A6E5D]/10 text-[#7A6E5D] px-2 py-0.5 rounded-full font-bold uppercase">Modo: Edición</span>
                  )}
                </div>
                <TaskForm
                  onSubmit={editingTask ? updateTask : addTask}
                  initialData={editingTask}
                  onCancel={editingTask ? () => setEditingTask(null) : undefined}
                />
              </section>

              <section className="space-y-4">
                <div className="flex items-center justify-between px-1">
                  <h2 className="text-[13px] font-black uppercase tracking-[0.15em] text-[#7C756B]">
                    Inventario
                  </h2>
                  <span className="text-[11px] bg-white border border-[#E2DDD5] text-[#7C756B] px-2.5 py-1 rounded-full font-bold">
                    {tasks.length} {tasks.length === 1 ? 'TAREA' : 'TAREAS'}
                  </span>
                </div>
                <TaskList
                  tasks={tasks}
                  onEdit={setEditingTask}
                  onDelete={deleteTask}
                />
              </section>
            </div>
          )}
        </div>

        <footer className="p-6 border-t border-[#E2DDD5] text-center bg-[#F4F1EA]">
          <p className="text-[11px] text-[#7C756B] font-semibold font-mono uppercase tracking-widest">Motor de Cohete SimSkills</p>
        </footer>
      </aside>

      {/* Contenido Principal / Visualización */}
      <main className="flex-1 relative overflow-hidden bg-[#FAF9F6]">
        {/* Fondo de Cuadrícula Dotted Decorativo */}
        <div className="absolute inset-0 bg-[radial-gradient(#E2DDD5_1.2px,transparent_1.2px)] bg-[size:32px_32px] opacity-70"></div>

        <div className="relative z-10 w-full h-full flex flex-col p-8">
          <header className="flex justify-between items-end mb-6 px-4">
            <div>
              <h2 className="text-xl font-black text-[#2A2926] tracking-tight uppercase">Prioridad de Acción</h2>
              <p className="text-xs text-[#7C756B] font-medium">Mapeo estratégico de tareas basado en coordenadas de valor y esfuerzo</p>
            </div>
          </header>
          <div className="flex-1 bg-white border border-[#E2DDD5] rounded-[2rem] overflow-hidden shadow-sm">
            <MatrixChart tasks={tasks} themes={themes} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
