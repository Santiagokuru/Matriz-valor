import React from "react";
import {
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    ZAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Label,
    ReferenceArea,
    Cell,
} from "recharts";
import type { Task, QuadrantThemes } from "../types";

interface MatrixChartProps {
    tasks: Task[];
    themes: QuadrantThemes;
}

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="bg-slate-900 border border-slate-700/50 p-4 rounded-2xl shadow-2xl backdrop-blur-xl ring-1 ring-white/10">
                <div className="flex items-center gap-2 mb-3 border-b border-slate-800 pb-2">
                    <div
                        className="w-2 h-2 rounded-full animate-pulse"
                        style={{ backgroundColor: data.color || '#6366f1' }}
                    ></div>
                    <p className="text-white font-black text-xs uppercase tracking-widest">{data.name}</p>
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between items-center gap-8">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">Valor de Impacto</span>
                        <span className="text-indigo-400 font-black text-sm">{data.x}</span>
                    </div>
                    <div className="flex justify-between items-center gap-8">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">Esfuerzo Requerido</span>
                        <span className="text-rose-400 font-black text-sm">{data.y}</span>
                    </div>
                </div>
            </div>
        );
    }
    return null;
};

const RenderDot = (props: any) => {
    const { cx, cy, fill } = props;
    return (
        <g>
            <circle cx={cx} cy={cy} r={12} fill={fill} fillOpacity={0.15} />
            <circle cx={cx} cy={cy} r={6} fill={fill} stroke="white" strokeWidth={1.5} style={{ filter: `drop-shadow(0 0 8px ${fill})` }} />
        </g>
    );
};

const MatrixChart: React.FC<MatrixChartProps> = ({ tasks, themes }) => {
    return (
        <div className="w-full h-full flex flex-col pt-4 pr-4">
            <div className="flex-1 w-full h-full">
                <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart
                        margin={{ top: 20, right: 20, bottom: 60, left: 20 }}
                    >
                        <CartesianGrid strokeDasharray="4 4" stroke="#1e293b" opacity={0.3} vertical={true} horizontal={true} />

                        {/* Background de Cuadrantes */}
                        <ReferenceArea x1={0} x2={5} y1={5} y2={10} fill={themes.thanklessTasks} fillOpacity={0.03}  />
                        <ReferenceArea x1={5} x2={10} y1={5} y2={10} fill={themes.majorProjects} fillOpacity={0.03}  />
                        <ReferenceArea x1={0} x2={5} y1={0} y2={5} fill={themes.fillIns} fillOpacity={0.03} />
                        <ReferenceArea x1={5} x2={10} y1={0} y2={5} fill={themes.quickWins} fillOpacity={0.03}  />

                        {/* Etiquetas de Cuadrantes */}
                        <ReferenceArea x1={2.5} x2={2.5} y1={7.5} y2={7.5} stroke="none" fill="none">
                            <Label value="TAREAS INGRATAS" position="center" fill="#64748b" style={{ fontSize: '10px', fontWeight: 900, opacity: 0.3, letterSpacing: '0.2em' }} />
                        </ReferenceArea>
                        <ReferenceArea x1={7.5} x2={7.5} y1={7.5} y2={7.5} stroke="none" fill="none">
                            <Label value="PROYECTOS ESTRATÉGICOS" position="center" fill="#64748b" style={{ fontSize: '10px', fontWeight: 900, opacity: 0.3, letterSpacing: '0.2em' }} />
                        </ReferenceArea>
                        <ReferenceArea x1={2.5} x2={2.5} y1={2.5} y2={2.5} stroke="none" fill="none">
                            <Label value="RELLENO" position="center" fill="#64748b" style={{ fontSize: '10px', fontWeight: 900, opacity: 0.3, letterSpacing: '0.2em' }} />
                        </ReferenceArea>
                        <ReferenceArea x1={7.5} x2={7.5} y1={2.5} y2={2.5} stroke="none" fill="none">
                            <Label value="ÉXITOS RÁPIDOS" position="center" fill="#64748b" style={{ fontSize: '10px', fontWeight: 900, opacity: 0.3, letterSpacing: '0.2em' }} />
                        </ReferenceArea>

                        <XAxis
                            type="number"
                            dataKey="x"
                            name="Valor"
                            domain={[0, 10]}
                            tickCount={11}
                            stroke="#475569"
                            fontSize={10}
                            tick={{ fontWeight: 600 }}
                            axisLine={{ stroke: '#334155', strokeWidth: 1 }}
                        >
                            <Label value="VALOR ESTRATÉGICO / IMPACTO" offset={-40} position="insideBottom" fill="#94a3b8" style={{ fontWeight: 900, fontSize: 9, letterSpacing: '0.3em' }} />
                        </XAxis>

                        <YAxis
                            type="number"
                            dataKey="y"
                            name="Esfuerzo"
                            domain={[0, 10]}
                            tickCount={11}
                            stroke="#475569"
                            fontSize={10}
                            tick={{ fontWeight: 600 }}
                            axisLine={{ stroke: '#334155', strokeWidth: 1 }}
                        >
                            <Label value="ESFUERZO DE EJECUCIÓN" angle={-90} position="insideLeft" offset={0} fill="#94a3b8" style={{ fontWeight: 900, fontSize: 9, letterSpacing: '0.3em' }} />
                        </YAxis>
                        <ZAxis type="number" range={[100, 100]} />

                        <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '5 5', stroke: '#334155', strokeWidth: 1 }} />

                        <Scatter
                            name="Tareas"
                            data={tasks}
                            shape={<RenderDot />}
                            animationDuration={800}
                            animationEasing="ease-in-out"
                        >
                            {tasks.map((task, index) => {
                                // If custom color exists, use it, otherwise use quadrant color
                                let color = task.color;
                                if (!color) {
                                    if (task.x > 5 && task.y <= 5) color = themes.quickWins;
                                    else if (task.x > 5 && task.y > 5) color = themes.majorProjects;
                                    else if (task.x <= 5 && task.y <= 5) color = themes.fillIns;
                                    else color = themes.thanklessTasks;
                                }

                                return (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={color}
                                        stroke={color}
                                    />
                                );
                            })}
                        </Scatter>
                    </ScatterChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default MatrixChart;
