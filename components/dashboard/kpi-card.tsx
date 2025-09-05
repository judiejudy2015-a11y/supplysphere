import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown } from "lucide-react"

interface KPICardProps {
  title: string
  value: string | number
  change?: number
  changeLabel?: string
  icon?: React.ReactNode
  className?: string
  trend?: "up" | "down" | "stable"
}

export function KPICard({ title, value, change, changeLabel, icon, className, trend }: KPICardProps) {
  const isPositive = change && change > 0
  const isNegative = change && change < 0

  return (
    <Card className={cn("kpi-card card-hover transition-all duration-300", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold animated-value">{value}</div>
        {change !== undefined && (
          <div className="flex items-center gap-1 mt-1">
            {isPositive && <TrendingUp className="h-3 w-3 text-green-500" />}
            {isNegative && <TrendingDown className="h-3 w-3 text-red-500" />}
            <Badge variant={isPositive ? "default" : isNegative ? "destructive" : "secondary"} className="text-xs">
              {change > 0 ? "+" : ""}
              {change}%
            </Badge>
            {changeLabel && <span className="text-xs text-muted-foreground ml-1">{changeLabel}</span>}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export { KPICard as KpiCard }
