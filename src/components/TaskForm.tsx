import React, { useState, useEffect } from "react";
import type { Task } from "../types";
import { Plus, Check, X, Target, Zap, Palette } from "lucide-react";

interface TaskFormProps {
    onSubmit: (task: any) => void;
    initialData: Task | null;
    onCancel?: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, initialData, onCancel }) => {
    const [name, setName] = useState("");
    const [x, setX] = useState(5);
    const [y, setY] = useState(5);
    const [color, setColor] = useState(""); // Empty by default to use quadrant color

    useEffect(() => {
        if (initialData) {
            setName(initialData.name);
            setX(initialData.x);
            setY(initialData.y);
            setColor(initialData.color || "");
        } else {
            setName("");
            setX(5);
            setY(5);
            setColor("");
        }
    }, [initialData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;

        const taskData: any = { name, x: Number(x), y: Number(y) };
        if (color) taskData.color = color;

        if (initialData) {
            onSubmit({ ...initialData, ...taskData });
        } else {
            onSubmit(taskData);
            setName("");
            setX(5);
            setY(5);
            setColor("");
        }
    };

    const handleXChange = (val: string) => {
        const num = parseFloat(val);
        if (!isNaN(num)) setX(Math.min(10, Math.max(0, num)));
        else if (val === "") setX(0);
    };

    const handleYChange = (val: string) => {
        const num = parseFloat(val);
        if (!isNaN(num)) setY(Math.min(10, Math.max(0, num)));
        else if (val === "") setY(0);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-white p-6 rounded-[1.5rem] border border-[#E2DDD5] shadow-sm relative overflow-hidden group transition-all duration-300 hover:border-[#C8C2B7]"
        >
            <div className="absolute top-0 right-0 p-4 opacity-5 text-[#7A6E5D] group-hover:opacity-10 transition-opacity">
                <Target size={100} />
            </div>

            <div className="space-y-2 relative pt-2">
                <label htmlFor="name" className="text-[12px] font-bold text-[#7C756B] uppercase tracking-widest ml-1">Título / Identificador</label>
                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej: Lanzar nueva funcionalidad..."
                    className="w-full bg-[#FAF9F6] border border-[#E2DDD5] rounded-xl px-4 py-3.5 text-[#2A2926] focus:outline-none focus:ring-2 focus:ring-[#7A6E5D]/20 focus:border-[#7A6E5D] transition-all placeholder:text-[#A39A8E] font-medium text-base"
                    required
                />
            </div>

            <div className="grid grid-cols-1 gap-6">
                {/* Eje X: Valor / Impacto */}
                <div className="space-y-4 bg-[#FAF9F6]/50 p-4 rounded-2xl border border-[#E2DDD5]/60">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <Zap size={16} className="text-[#7A6E5D]" />
                            <label className="text-[12px] font-bold text-[#7C756B] uppercase tracking-widest">VALOR / IMPACTO (X)</label>
                        </div>
                        <input
                            type="number"
                            min="0"
                            max="10"
                            step="0.1"
                            value={x}
                            onChange={(e) => handleXChange(e.target.value)}
                            className="bg-white text-[#7A6E5D] font-bold text-sm w-16 py-1.5 text-center rounded-lg border border-[#E2DDD5] focus:outline-none focus:ring-1 focus:ring-[#7A6E5D]"
                        />
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="10"
                        step="0.1"
                        value={x}
                        onChange={(e) => setX(parseFloat(e.target.value))}
                        className="w-full accent-[#7A6E5D] cursor-pointer h-1.5 bg-[#E2DDD5] rounded-lg appearance-none transition-all"
                    />
                    <div className="flex justify-between px-1 text-[10px] font-bold text-[#A39A8E] uppercase tracking-wider">
                        <span>Mínimo</span>
                        <span>Máximo</span>
                    </div>
                </div>

                {/* Eje Y: Esfuerzo / Coste */}
                <div className="space-y-4 bg-[#FAF9F6]/50 p-4 rounded-2xl border border-[#E2DDD5]/60">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#B57C63]"></span>
                            <label className="text-[12px] font-bold text-[#7C756B] uppercase tracking-widest">ESFUERZO / COSTE (Y)</label>
                        </div>
                        <input
                            type="number"
                            min="0"
                            max="10"
                            step="0.1"
                            value={y}
                            onChange={(e) => handleYChange(e.target.value)}
                            className="bg-white text-[#B57C63] font-bold text-sm w-16 py-1.5 text-center rounded-lg border border-[#E2DDD5] focus:outline-none focus:ring-1 focus:ring-[#B57C63]"
                        />
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="10"
                        step="0.1"
                        value={y}
                        onChange={(e) => setY(parseFloat(e.target.value))}
                        className="w-full accent-[#B57C63] cursor-pointer h-1.5 bg-[#E2DDD5] rounded-lg appearance-none transition-all"
                    />
                    <div className="flex justify-between px-1 text-[10px] font-bold text-[#A39A8E] uppercase tracking-wider">
                        <span>Fácil</span>
                        <span>Difícil</span>
                    </div>
                </div>

                {/* Color de la Tarea */}
                <div className="bg-[#FAF9F6]/50 p-4 rounded-2xl border border-[#E2DDD5]/60 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Palette size={16} className="text-[#7C756B]" />
                        <label className="text-[12px] font-bold text-[#7C756B] uppercase tracking-widest">COLOR DE TAREA</label>
                    </div>
                    <div className="flex items-center gap-3">
                        <input
                            type="color"
                            value={color || "#7A6E5D"}
                            onChange={(e) => setColor(e.target.value)}
                            className="w-9 h-9 rounded-lg bg-transparent border-none cursor-pointer p-0.5 border border-[#E2DDD5]"
                        />
                        <button
                            type="button"
                            onClick={() => setColor("")}
                            className="text-[11px] font-bold text-[#7C756B] hover:text-[#2A2926] uppercase underline decoration-dotted"
                        >
                            Resetear
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex gap-3 pt-2">
                <button
                    type="submit"
                    className="flex-1 bg-[#7A6E5D] hover:bg-[#685D4E] text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-3 shadow-md shadow-[#7A6E5D]/10 active:scale-[0.98] text-base uppercase tracking-wider"
                >
                    {initialData ? (
                        <>
                            <Check size={18} />
                            CONFIRMAR CAMBIOS
                        </>
                    ) : (
                        <>
                            <Plus size={18} />
                            ACTIVAR TAREA
                        </>
                    )}
                </button>
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 bg-[#F4F1EA] hover:bg-[#EAE6DF] border border-[#E2DDD5] text-[#7C756B] hover:text-[#2A2926] rounded-xl transition-all active:scale-[0.98]"
                    >
                        <X size={20} />
                    </button>
                )}
            </div>
        </form>
    );
};

export default TaskForm;
