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
    <div className="flex h-screen w-full bg-[#020617] text-slate-100 overflow-hidden font-sans selection:bg-indigo-500/30">
      {/* Panel Lateral Izquierdo */}
      <aside className="w-[450px] shrink-0 border-r border-slate-800/60 bg-slate-900/20 backdrop-blur-3xl flex flex-col z-10 shadow-2xl">
        <header className="p-8 pb-6 flex justify-between items-center bg-gradient-to-b from-slate-900/50 to-transparent">
          <div className="flex items-center gap-4">
            <div className="p-2.5 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg shadow-indigo-500/20 animate-pulse-slow">
              <BrainCircuit size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 uppercase">
                MATRIZ DE PRIORIZACIÓN
              </h1>
              <p className="text-[10px] text-slate-500 font-bold tracking-[0.2em] uppercase">Sistema de Priorización DE tareas</p>
            </div>
          </div>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`p-2 rounded-xl transition-all duration-300 ${showSettings ? 'bg-indigo-500 text-white rotate-90' : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'}`}
            title="Configuración"
          >
            <SettingsIcon size={20} />
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
                  <h2 className="text-[11px] font-black uppercase tracking-[0.15em] text-slate-500">
                    {editingTask ? "Modificación" : "Terminal de Entrada"}
                  </h2>
                  {editingTask && (
                    <span className="text-[10px] bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded-full font-bold uppercase">Modo: Edición</span>
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
                  <h2 className="text-[11px] font-black uppercase tracking-[0.15em] text-slate-500">
                    Inventario
                  </h2>
                  <span className="text-[10px] bg-slate-800 text-slate-400 px-2.5 py-1 rounded-full font-bold">
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

        <footer className="p-6 border-t border-slate-800/40 text-center">
          <p className="text-[10px] text-slate-600 font-medium font-mono uppercase tracking-widest">Motor de Cohete SimSkills</p>
        </footer>
      </aside>

      {/* Contenido Principal / Visualización */}
      <main className="flex-1 relative overflow-hidden bg-[#020617]">
        {/* Fondo de Cuadrícula Decorativo */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b11_1px,transparent_1px),linear-gradient(to_bottom,#1e293b11_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

        <div className="absolute inset-0 z-0 flex items-center justify-center opacity-30 blur-[100px]">
          <div className="w-[500px] h-[500px] bg-indigo-600/20 rounded-full animate-pulse-slow"></div>
          <div className="w-[400px] h-[400px] bg-purple-600/10 rounded-full animate-pulse-slow ml-[-200px]"></div>
        </div>

        <div className="relative z-10 w-full h-full flex flex-col p-8">
          <header className="flex justify-between items-end mb-6 px-4">
            <div>
              <h2 className="text-2xl font-black text-white tracking-tight">PRIORIDAD DE ACCIÓN</h2>
              <p className="text-sm text-slate-400 font-medium italic">Mapeo estratégico de tareas basado en coordenadas</p>
            </div>
          </header>
          <div className="flex-1 bg-slate-900/10 backdrop-blur-sm border border-slate-800/50 rounded-[2rem] overflow-hidden shadow-inner">
            <MatrixChart tasks={tasks} themes={themes} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
