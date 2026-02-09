import React from "react";
import type { Task } from "../types";
import { Edit3, Trash2, Box, ChevronRight } from "lucide-react";

interface TaskListProps {
    tasks: Task[];
    onEdit: (task: Task) => void;
    onDelete: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onEdit, onDelete }) => {
    if (tasks.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 px-6 border-2 border-dashed border-slate-800/50 rounded-[2rem] text-slate-600 bg-slate-900/10">
                <Box size={40} className="mb-4 opacity-10" />
                <p className="text-sm font-bold uppercase tracking-widest text-slate-700">Base de Datos Vacía</p>
                <p className="text-[10px] mt-2 text-slate-700 font-medium">Asigna tus primeras tareas estratégicas</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {tasks.map((task) => (
                <div
                    key={task.id}
                    className="group relative bg-slate-950/20 hover:bg-slate-900/40 border border-slate-800/40 hover:border-slate-700/60 p-5 rounded-[1.25rem] transition-all duration-300 flex justify-between items-center overflow-hidden"
                >
                    {/* Subtle Accent Glow based on task color or indigo */}
                    <div
                        className="absolute left-0 top-0 bottom-0 w-1 transition-opacity opacity-0 group-hover:opacity-100"
                        style={{
                            background: `linear-gradient(to b, ${task.color || '#6366f1'}00, ${task.color || '#6366f1'}66, ${task.color || '#6366f1'}00)`
                        }}
                    ></div>

                    <div className="min-w-0 flex-1 px-1">
                        <div className="flex items-center gap-2 mb-2">
                            <span
                                className="w-2 h-2 rounded-full transition-shadow group-hover:shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                                style={{ backgroundColor: task.color || '#6366f1' }}
                            ></span>
                            <h3 className="font-bold text-slate-200 truncate tracking-tight uppercase text-sm">{task.name}</h3>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex flex-col">
                                <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Impacto</span>
                                <span className="text-xs font-black text-indigo-400">{task.x}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Esfuerzo</span>
                                <span className="text-xs font-black text-rose-400">{task.y}</span>
                            </div>
                            <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity flex items-center">
                                <ChevronRight size={14} className="text-slate-600" />
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-2 ml-4 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0 duration-300">
                        <button
                            onClick={() => onEdit(task)}
                            className="p-2.5 bg-slate-800/50 text-slate-400 hover:text-white hover:bg-indigo-600/20 rounded-xl transition-all border border-slate-700/30"
                            title="Editar Tarea"
                        >
                            <Edit3 size={16} />
                        </button>
                        <button
                            onClick={() => onDelete(task.id)}
                            className="p-2.5 bg-slate-800/50 text-slate-400 hover:text-rose-400 hover:bg-rose-600/20 rounded-xl transition-all border border-slate-700/30"
                            title="Eliminar Tarea"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TaskList;
