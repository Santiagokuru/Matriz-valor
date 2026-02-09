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
            className="space-y-6 bg-slate-900/40 p-6 rounded-[1.5rem] border border-slate-700/50 shadow-2xl relative overflow-hidden group transition-all duration-500 hover:border-slate-600/50 ring-1 ring-slate-800"
        >
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Target size={100} />
            </div>

            <div className="space-y-2 relative pt-2">
                <label htmlFor="name" className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Título / Identificador</label>
                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej: Lanzar nueva funcionalidad..."
                    className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/50 transition-all placeholder:text-slate-700 font-medium"
                    required
                />
            </div>

            <div className="grid grid-cols-1 gap-6">
                {/* Eje X: Valor / Impacto */}
                <div className="space-y-4 bg-slate-950/30 p-4 rounded-2xl border border-slate-800/50">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <Zap size={14} className="text-indigo-400" />
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">VALOR / IMPACTO (X)</label>
                        </div>
                        <input
                            type="number"
                            min="0"
                            max="10"
                            step="0.1"
                            value={x}
                            onChange={(e) => handleXChange(e.target.value)}
                            className="bg-indigo-500/10 text-indigo-400 font-black text-xs w-14 py-1 text-center rounded-lg border border-indigo-500/20 focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
                        />
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="10"
                        step="0.1"
                        value={x}
                        onChange={(e) => setX(parseFloat(e.target.value))}
                        className="w-full accent-indigo-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none hover:accent-indigo-400 transition-all"
                    />
                    <div className="flex justify-between px-1 text-[8px] font-black text-slate-600 uppercase">
                        <span>Mínimo</span>
                        <span>Máximo</span>
                    </div>
                </div>

                {/* Eje Y: Esfuerzo / Coste */}
                <div className="space-y-4 bg-slate-950/30 p-4 rounded-2xl border border-slate-800/50">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">ESFUERZO / COSTE (Y)</label>
                        </div>
                        <input
                            type="number"
                            min="0"
                            max="10"
                            step="0.1"
                            value={y}
                            onChange={(e) => handleYChange(e.target.value)}
                            className="bg-rose-500/10 text-rose-400 font-black text-xs w-14 py-1 text-center rounded-lg border border-rose-500/20 focus:outline-none focus:ring-1 focus:ring-rose-500/50"
                        />
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="10"
                        step="0.1"
                        value={y}
                        onChange={(e) => setY(parseFloat(e.target.value))}
                        className="w-full accent-rose-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none hover:accent-rose-400 transition-all"
                    />
                    <div className="flex justify-between px-1 text-[8px] font-black text-slate-600 uppercase">
                        <span>Fácil</span>
                        <span>Difícil</span>
                    </div>
                </div>

                {/* Color de la Tarea */}
                <div className="bg-slate-950/30 p-4 rounded-2xl border border-slate-800/50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Palette size={14} className="text-slate-400" />
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">COLOR DE TAREA</label>
                    </div>
                    <div className="flex items-center gap-3">
                        <input
                            type="color"
                            value={color || "#6366f1"}
                            onChange={(e) => setColor(e.target.value)}
                            className="w-8 h-8 rounded-lg bg-transparent border-none cursor-pointer p-0.5 border border-slate-700"
                        />
                        <button
                            type="button"
                            onClick={() => setColor("")}
                            className="text-[9px] font-black text-slate-500 hover:text-slate-300 uppercase underline"
                        >
                            Resetear
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex gap-3 pt-2">
                <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-3 shadow-xl shadow-indigo-600/10 active:scale-[0.98]"
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
                        className="px-4 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-xl transition-all active:scale-[0.98] border border-slate-700/50"
                    >
                        <X size={20} />
                    </button>
                )}
            </div>
        </form>
    );
};

export default TaskForm;
