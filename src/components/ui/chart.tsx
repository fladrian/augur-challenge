"use client"

import { 
  createContext, 
  useContext, 
  useId, 
  ComponentType, 
  ReactNode, 
  ComponentProps, 
  CSSProperties 
} from "react"
import * as RechartsPrimitive from "recharts"

import { cn } from '../../utils/cn';

// Format: { [key: string]: { label: string; color?: string; icon?: ComponentType } }
export type ChartConfig = {
  [k: string]: {
    label: ReactNode
    icon?: ComponentType
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<string, string> }
  )
}

type ChartContextProps = {
  config: ChartConfig
}

const ChartContext = createContext<ChartContextProps | null>(null)

function useChart() {
  const context = useContext(ChartContext)
  if (!context) {
    throw new Error("useChart must be used within a ChartContainer")
  }
  return context
}

export function ChartContainer({
  id,
  className,
  config,
  children,
  ...props
}: ComponentProps<"div"> & {
  config: ChartConfig
  children: ComponentProps<
    typeof RechartsPrimitive.ResponsiveContainer
  >["children"]
}) {
  const uniqueId = useId()
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        style={
          {
            "--chart-style-id": chartId,
          } as CSSProperties
        }

        className={cn(
          "flex justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
          className
        )}

        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer width="100%" height="100%">
          {children}
        </RechartsPrimitive.ResponsiveContainer>

      </div>
    </ChartContext.Provider>
  )
}

export function ChartStyle({ id, config }: { id: string; config: ChartConfig }) {
  const colorConfig = Object.entries(config).filter(
    ([_, config]) => config.theme || config.color
  )

  if (!colorConfig.length) {
    return null
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(config)
          .map(([key, item]) => {
            const color = item.color || item.theme?.["dark"]
            return color ? `[data-chart="${id}"] { --color-${key}: ${color}; }` : null
          })
          .filter(Boolean)
          .join("\n"),
      }}
    />
  )
}

export const ChartTooltip = RechartsPrimitive.Tooltip

export function ChartTooltipContent({
  active,
  payload,
  label,
  className,
  hideLabel = false,
  indicator = "dot",
  labelFormatter,
  labelClassName,
}: any) {
  const { config } = useChart()

  if (!active || !payload?.length) {
    return null
  }

  return (
    <div
      className={cn(
        "grid min-w-32 items-start gap-1.5 rounded-lg border bg-bg-card px-2.5 py-1.5 text-xs shadow-xl",
        className
      )}
    >
      {!hideLabel && (
        <div className={cn("font-medium", labelClassName)}>
          {labelFormatter ? labelFormatter(label, payload) : label}
        </div>
      )}
      <div className="grid gap-1.5">
        {payload.map((item: any, index: number) => {
          const key = `${item.dataKey || item.name || "value"}`
          const itemConfig = config[key] || config[item.name as string]
          const color = item.payload?.fill || item.color

          return (
            <div
              key={item.dataKey || index}
              className="flex items-center gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-text-tertiary"
            >
              {itemConfig?.icon ? (
                <itemConfig.icon />
              ) : (
                <div
                  className={cn(
                    "size-2 shrink-0 rounded-full border border-border-subtle/50",
                    {
                      "bg-[--color-bg]": indicator === "dot",
                      "border-b-2 border-dashed bg-transparent": indicator === "dashed",
                      "w-1": indicator === "line",
                    }
                  )}
                  style={
                    {
                      backgroundColor: color,
                    } as CSSProperties
                  }
                />

              )}

              <div className="flex flex-1 justify-between leading-none gap-4">
                <div className="grid gap-0.5">
                  <span className="text-text-tertiary">
                    {itemConfig?.label || item.name}
                  </span>
                </div>
                {item.value && (
                  <span className="font-mono font-medium tabular-nums text-text-primary">
                    {item.value.toLocaleString()}
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}


export const ChartLegend = RechartsPrimitive.Legend
