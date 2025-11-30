"use client"

import { PolarAngleAxis, PolarGrid, Radar, RadarChart as RechartsRadarChart, ResponsiveContainer } from "recharts"

export function RadarChart({ data, className }: { data: any[], className?: string }) {
    return (
        <ResponsiveContainer width="100%" height="100%" className={className}>
            <RechartsRadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                <PolarGrid stroke="#52525b" strokeOpacity={0.2} />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#71717a', fontSize: 10 }} />
                <Radar
                    name="Metrics"
                    dataKey="A"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    fill="#8b5cf6"
                    fillOpacity={0.2}
                />
            </RechartsRadarChart>
        </ResponsiveContainer>
    )
}
