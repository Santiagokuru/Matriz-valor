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
                    <Palette size={16} className="text-[#7A6E5D]" />
                    <h3 className="text-xs font-bold text-[#2A2926] uppercase tracking-widest">Configuración de Temas</h3>
                </div>
                <button onClick={onClose} className="p-2 text-[#7C756B] hover:text-[#2A2926] hover:bg-white rounded-lg border border-transparent hover:border-[#E2DDD5] transition-all">
                    <X size={18} />
                </button>
            </div>

            <div className="space-y-4">
                {(Object.keys(themes) as Array<keyof QuadrantThemes>).map((key) => (
                    <div key={key} className="group flex items-center justify-between bg-white p-4 rounded-2xl border border-[#E2DDD5] hover:border-[#C8C2B7] transition-all shadow-sm">
                        <div className="flex flex-col">
                            <span className="text-[9px] text-[#7C756B] font-bold uppercase tracking-widest mb-1">{labels[key]}</span>
                            <span className="text-[9px] text-[#A39A8E] font-mono">{themes[key].toUpperCase()}</span>
                        </div>
                        <div className="relative flex items-center justify-center">
                            <input
                                type="color"
                                value={themes[key]}
                                onChange={(e) => handleColorChange(key, e.target.value)}
                                className="w-12 h-12 bg-transparent rounded-xl cursor-pointer border-none scale-125 opacity-0 absolute inset-0 z-10"
                            />
                            <div
                                className="w-10 h-10 rounded-xl border border-[#E2DDD5] transition-all group-hover:scale-105"
                                style={{ backgroundColor: themes[key] }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={onClose}
                className="w-full bg-[#7A6E5D] hover:bg-[#685D4E] text-white font-bold py-4 rounded-xl transition-all shadow-md shadow-[#7A6E5D]/10 uppercase tracking-widest text-xs border border-transparent"
            >
                Guardar y Volver
            </button>
        </div>
    );
};

export default Settings;
