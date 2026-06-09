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
            <div className="bg-white border border-[#E2DDD5] p-4 rounded-2xl shadow-lg backdrop-blur-md">
                <div className="flex items-center gap-2 mb-3 border-b border-[#E2DDD5]/60 pb-2">
                    <div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: data.color || '#7A6E5D' }}
                    ></div>
                    <p className="text-[#2A2926] font-bold text-xs uppercase tracking-wider">{data.name}</p>
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between items-center gap-8">
                        <span className="text-[9px] font-bold text-[#7C756B] uppercase tracking-wider">Valor de Impacto</span>
                        <span className="text-[#7A6E5D] font-black text-sm">{data.x}</span>
                    </div>
                    <div className="flex justify-between items-center gap-8">
                        <span className="text-[9px] font-bold text-[#7C756B] uppercase tracking-wider">Esfuerzo Requerido</span>
                        <span className="text-[#B57C63] font-black text-sm">{data.y}</span>
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
            <circle cx={cx} cy={cy} r={20} fill={fill} fillOpacity={0.12} />
            <circle cx={cx} cy={cy} r={10} fill={fill} stroke="#ffffff" strokeWidth={2} />
        </g>
    );
};

const MatrixChart: React.FC<MatrixChartProps> = ({ tasks, themes }) => {
    return (
        <div className="w-full h-full flex items-center justify-center p-6">
            <div className="w-[90%] h-[90%]">
                <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart
                        margin={{ top: 20, right: 20, bottom: 75, left: 35 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#E2DDD5" opacity={0.6} vertical={true} horizontal={true} />

                        {/* Background de Cuadrantes */}
                        <ReferenceArea x1={0} x2={5} y1={5} y2={10} fill={themes.thanklessTasks} fillOpacity={0.06}  />
                        <ReferenceArea x1={5} x2={10} y1={5} y2={10} fill={themes.majorProjects} fillOpacity={0.06}  />
                        <ReferenceArea x1={0} x2={5} y1={0} y2={5} fill={themes.fillIns} fillOpacity={0.06} />
                        <ReferenceArea x1={5} x2={10} y1={0} y2={5} fill={themes.quickWins} fillOpacity={0.06}  />

                        {/* Etiquetas de Cuadrantes */}
                        <ReferenceArea x1={2.5} x2={2.5} y1={7.5} y2={7.5} stroke="none" fill="none">
                            <Label value="TAREAS INGRATAS" position="center" fill="#7C756B" style={{ fontSize: '15px', fontWeight: 700, opacity: 0.6, letterSpacing: '0.15em' }} />
                        </ReferenceArea>
                        <ReferenceArea x1={7.5} x2={7.5} y1={7.5} y2={7.5} stroke="none" fill="none">
                            <Label value="PROYECTOS ESTRATÉGICOS" position="center" fill="#7C756B" style={{ fontSize: '15px', fontWeight: 700, opacity: 0.6, letterSpacing: '0.15em' }} />
                        </ReferenceArea>
                        <ReferenceArea x1={2.5} x2={2.5} y1={2.5} y2={2.5} stroke="none" fill="none">
                            <Label value="RELLENO" position="center" fill="#7C756B" style={{ fontSize: '15px', fontWeight: 700, opacity: 0.6, letterSpacing: '0.15em' }} />
                        </ReferenceArea>
                        <ReferenceArea x1={7.5} x2={7.5} y1={2.5} y2={2.5} stroke="none" fill="none">
                            <Label value="ÉXITOS RÁPIDOS" position="center" fill="#7C756B" style={{ fontSize: '15px', fontWeight: 700, opacity: 0.6, letterSpacing: '0.15em' }} />
                        </ReferenceArea>

                        <XAxis
                            type="number"
                            dataKey="x"
                            name="Valor"
                            domain={[0, 10]}
                            tickCount={11}
                            stroke="#7C756B"
                            fontSize={12}
                            tick={{ fontWeight: 500, fill: '#7C756B' }}
                            axisLine={{ stroke: '#E2DDD5', strokeWidth: 1 }}
                        >
                            <Label value="VALOR ESTRATÉGICO / IMPACTO" offset={-55} position="insideBottom" fill="#7C756B" style={{ fontWeight: 700, fontSize: 15, letterSpacing: '0.2em' }} />
                        </XAxis>

                        <YAxis
                            type="number"
                            dataKey="y"
                            name="Esfuerzo"
                            domain={[0, 10]}
                            tickCount={11}
                            stroke="#7C756B"
                            fontSize={12}
                            tick={{ fontWeight: 500, fill: '#7C756B' }}
                            axisLine={{ stroke: '#E2DDD5', strokeWidth: 1 }}
                        >
                            <Label value="ESFUERZO DE EJECUCIÓN" angle={-90} position="insideLeft" offset={-20} fill="#7C756B" style={{ fontWeight: 700, fontSize: 15, letterSpacing: '0.2em' }} />
                        </YAxis>
                        <ZAxis type="number" range={[100, 100]} />

                        <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '4 4', stroke: '#C8C2B7', strokeWidth: 1 }} />

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
