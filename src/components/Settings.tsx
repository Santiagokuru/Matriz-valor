import React from "react";
import type { QuadrantThemes } from "../types";
import { X, Palette } from "lucide-react";

interface SettingsProps {
    themes: QuadrantThemes;
    setThemes: (themes: QuadrantThemes) => void;
    onClose: () => void;
}

const Settings: React.FC<SettingsProps> = ({ themes, setThemes, onClose }) => {
    const handleColorChange = (key: keyof QuadrantThemes, color: string) => {
        setThemes({ ...themes, [key]: color });
    };

    const labels = {
        quickWins: "Éxitos Rápidos",
        majorProjects: "Proyectos Estratégicos",
        fillIns: "Tareas de Relleno",
        thanklessTasks: "Tareas Ingratas",
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center px-1">
                <div className="flex items-center gap-2">
                    <Palette size={16} className="text-indigo-400" />
                    <h3 className="text-sm font-black text-slate-200 uppercase tracking-widest">Configuración de Temas</h3>
                </div>
                <button onClick={onClose} className="p-2 text-slate-500 hover:text-white hover:bg-slate-800 rounded-lg transition-all">
                    <X size={18} />
                </button>
            </div>

            <div className="space-y-4">
                {(Object.keys(themes) as Array<keyof QuadrantThemes>).map((key) => (
                    <div key={key} className="group flex items-center justify-between bg-slate-950/40 p-4 rounded-2xl border border-slate-800/50 hover:border-slate-700/50 transition-all">
                        <div className="flex flex-col">
                            <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">{labels[key]}</span>
                            <span className="text-[9px] text-slate-600 font-mono">{themes[key].toUpperCase()}</span>
                        </div>
                        <div className="relative flex items-center justify-center">
                            <input
                                type="color"
                                value={themes[key]}
                                onChange={(e) => handleColorChange(key, e.target.value)}
                                className="w-12 h-12 bg-transparent rounded-xl cursor-pointer border-none scale-125 opacity-0 absolute inset-0 z-10"
                            />
                            <div
                                className="w-10 h-10 rounded-xl border-2 border-slate-800 transition-all group-hover:scale-110"
                                style={{ backgroundColor: themes[key], boxShadow: `0 0 15px ${themes[key]}30` }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={onClose}
                className="w-full bg-slate-800 hover:bg-slate-700 text-white font-black py-4 rounded-xl transition-all border border-slate-700/50 uppercase tracking-widest text-xs"
            >
                Guardar y Volver
            </button>
        </div>
    );
};

export default Settings;
