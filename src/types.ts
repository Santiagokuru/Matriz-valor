export interface Task {
    id: string;
    name: string;
    x: number; // Valor (Impacto)
    y: number; // Esfuerzo
    color?: string; // Color personalizado de la tarea
}

export interface QuadrantThemes {
    quickWins: string;
    majorProjects: string;
    fillIns: string;
    thanklessTasks: string;
}

export const DEFAULT_THEMES: QuadrantThemes = {
    quickWins: "#10b981", // Emerald 500 (Verde)
    majorProjects: "#f59e0b", // Amber 500 (Opciones de color mejoradas)
    fillIns: "#3b82f6", // Blue 500
    thanklessTasks: "#ef4444", // Red 500
};
