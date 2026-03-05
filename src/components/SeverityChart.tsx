"use client"

import * as React from "react"
import { Label, Pie, PieChart } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart"

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
  const chartData = React.useMemo(() => [
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
    <div className="flex flex-col h-full w-full">
      <div className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto w-full h-[140px]"
        >
          <PieChart>



            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="severity"
              innerRadius={35}
              outerRadius={65}

              strokeWidth={5}
              stroke="var(--bg-card)"
            >




              <Label
                content={({ viewBox }) => {
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
                          className="fill-text-primary text-2xl font-bold"
                        >
                          {stats.total.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 20}
                          className="fill-text-tertiary text-[11px] uppercase tracking-wider font-semibold"
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
    </div>
  )
}
