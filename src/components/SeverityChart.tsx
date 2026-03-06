"use client"

import { useMemo } from "react"

import { Label, Pie, PieChart } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui"


interface SeverityChartProps {
  stats: {
    total: number
    critical: number
    high: number
    medium: number
    low: number
  }
}

export function SeverityChart({ stats }: SeverityChartProps) {
  const chartData = useMemo(() => [
    { severity: "critical", count: stats.critical, fill: "var(--severity-critical)" },
    { severity: "high", count: stats.high, fill: "var(--severity-high)" },
    { severity: "medium", count: stats.medium, fill: "var(--severity-medium)" },
    { severity: "low", count: stats.low, fill: "var(--severity-low)" },
  ], [stats])

  const chartConfig = {

    critical: {
      label: "Critical",
      color: "var(--severity-critical)",
    },
    high: {
      label: "High",
      color: "var(--severity-high)",
    },
    medium: {
      label: "Medium",
      color: "var(--severity-medium)",
    },
    low: {
      label: "Low",
      color: "var(--severity-low)",
    },
  } satisfies ChartConfig

  return (
    <div className="flex items-center gap-12 h-full w-full px-8 py-2">
      <div className="flex-1 max-w-[300px] h-full flex items-center justify-center overflow-visible">
        <ChartContainer
          config={chartConfig}
          className="w-full h-full"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            / >
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="severity"
              innerRadius={58}
              outerRadius={88}
              strokeWidth={7}
              stroke="var(--bg-card)"
            >
              <Label
                content={({ viewBox }: { viewBox?: any }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-text-primary text-3xl font-bold"
                        >
                          {stats.total.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-text-tertiary text-[10px] uppercase tracking-[1.5px] font-bold"
                        >
                          Total
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </div>

      <div className="flex flex-col gap-3 justify-center py-2 grow min-w-[180px]">
        {chartData.map((item) => {
          const percentage = stats.total > 0 
            ? Math.round((item.count / stats.total) * 100) 
            : 0;
          
          return (
            <div key={item.severity} className="flex items-center justify-between group py-1.5 border-b border-border-subtle/20 last:border-0 px-2 -mx-2">
              <div className="flex items-center gap-3">
                <div 
                  className="w-3 h-3 rounded-sm" 
                  style={{ backgroundColor: item.fill }}
                />
                <span className="text-[12.5px] font-bold text-text-secondary capitalize tracking-tight">
                  {chartConfig[item.severity as keyof typeof chartConfig].label}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[14px] font-black text-text-primary tabular-nums">
                  {item.count}
                </span>
                <span className="text-[11px] font-bold text-text-tertiary w-10 text-center bg-bg-elevated/50 px-1.5 py-0.5 rounded-full border border-border-subtle/50">
                  {percentage}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
