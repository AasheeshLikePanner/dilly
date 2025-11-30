"use client"

import { Bar, BarChart as RechartsBarChart, ResponsiveContainer, XAxis, Tooltip } from "recharts"

export function StackedBarChart({ data, className }: { data: any[], className?: string }) {
    return (
        <ResponsiveContainer width="100%" height="100%" className={className}>
            <RechartsBarChart data={data}>
                <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                />
                <Tooltip
                    cursor={{ fill: 'transparent' }}
                    contentStyle={{
                        backgroundColor: '#18181b',
                        border: '1px solid #27272a',
                        borderRadius: '6px',
                        fontSize: '12px'
                    }}
                />
                <Bar dataKey="open" stackId="a" fill="#3b82f6" radius={[0, 0, 4, 4]} />
                <Bar dataKey="closed" stackId="a" fill="#10b981" radius={[4, 4, 0, 0]} />
            </RechartsBarChart>
        </ResponsiveContainer>
    )
}
