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
            <div className="flex flex-col items-center justify-center py-16 px-6 border border-dashed border-[#E2DDD5] rounded-[2rem] text-[#7C756B] bg-[#FAF9F6]">
                <Box size={32} className="mb-3 opacity-30 text-[#7C756B]" />
                <p className="text-xs font-bold uppercase tracking-wider text-[#7C756B]">Base de Datos Vacía</p>
                <p className="text-[9px] mt-1 text-[#A39A8E] font-medium">Asigna tus primeras tareas estratégicas</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {tasks.map((task) => (
                <div
                    key={task.id}
                    className="group relative bg-white hover:bg-[#FAF9F6]/40 border border-[#E2DDD5] hover:border-[#C8C2B7] p-5 rounded-[1.25rem] transition-all duration-300 flex justify-between items-center overflow-hidden shadow-sm"
                >
                    {/* Subtle Accent Line based on task color or default taupe */}
                    <div
                        className="absolute left-0 top-0 bottom-0 w-1 transition-opacity opacity-0 group-hover:opacity-100"
                        style={{
                            backgroundColor: task.color || '#7A6E5D'
                        }}
                    ></div>

                    <div className="min-w-0 flex-1 px-1">
                        <div className="flex items-center gap-2 mb-2">
                            <span
                                className="w-2 h-2 rounded-full transition-shadow"
                                style={{ backgroundColor: task.color || '#7A6E5D' }}
                            ></span>
                            <h3 className="font-bold text-[#2A2926] truncate tracking-tight uppercase text-sm">{task.name}</h3>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-[#A39A8E] uppercase tracking-wider">Impacto</span>
                                <span className="text-sm font-bold text-[#7A6E5D]">{task.x}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-[#A39A8E] uppercase tracking-wider">Esfuerzo</span>
                                <span className="text-sm font-bold text-[#B57C63]">{task.y}</span>
                            </div>
                            <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity flex items-center">
                                <ChevronRight size={14} className="text-[#A39A8E]" />
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-2 ml-4 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0 duration-300">
                        <button
                            onClick={() => onEdit(task)}
                            className="p-2.5 bg-[#FAF9F6] text-[#7C756B] hover:text-[#7A6E5D] hover:bg-[#7A6E5D]/10 rounded-xl transition-all border border-[#E2DDD5]"
                            title="Editar Tarea"
                        >
                            <Edit3 size={16} />
                        </button>
                        <button
                            onClick={() => onDelete(task.id)}
                            className="p-2.5 bg-[#FAF9F6] text-[#7C756B] hover:text-[#A25E5E] hover:bg-[#A25E5E]/10 rounded-xl transition-all border border-[#E2DDD5]"
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
