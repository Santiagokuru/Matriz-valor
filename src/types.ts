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
    quickWins: "#6B7F67", // Sage Green
    majorProjects: "#B57C63", // Terracotta
    fillIns: "#5A7A8C", // Dusty Blue
    thanklessTasks: "#A25E5E", // Muted Rose
};
