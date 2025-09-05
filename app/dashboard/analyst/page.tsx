"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { KpiCard } from "@/components/dashboard/kpi-card"
import { mockAnalystAnalytics, mockSupplyChainMetrics, mockMarketTrends } from "@/lib/mock-data"
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, BarChart3, Globe, Target, Zap } from "lucide-react"

export default function AnalystDashboard() {
  const {
    totalSuppliers,
    totalVendors,
    totalProducts,
    networkEfficiency,
    costSavings,
    riskScore,
    complianceRate,
    supplyChainHealth,
  } = mockAnalystAnalytics

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Supply Chain Analytics</h1>
          <p className="text-muted-foreground">Comprehensive insights and performance metrics</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <BarChart3 className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
          <Button>
            <Target className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard
          title="Network Efficiency"
          value={`${networkEfficiency}%`}
          change={2.3}
          icon={<Zap className="h-4 w-4" />}
          trend="up"
        />
        <KpiCard
          title="Cost Savings"
          value={`$${costSavings.toLocaleString()}`}
          change={8.7}
          icon={<TrendingUp className="h-4 w-4" />}
          trend="up"
        />
        <KpiCard
          title="Risk Score"
          value={riskScore.toString()}
          change={-12.5}
          icon={<AlertTriangle className="h-4 w-4" />}
          trend="down"
        />
        <KpiCard
          title="Compliance Rate"
          value={`${complianceRate}%`}
          change={1.2}
          icon={<CheckCircle className="h-4 w-4" />}
          trend="up"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Supply Chain Health */}
        <Card>
          <CardHeader>
            <CardTitle>Supply Chain Health</CardTitle>
            <CardDescription>Performance across key categories</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {supplyChainHealth.map((item) => (
              <div key={item.category} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="font-medium">{item.category}</div>
                  <Badge variant={item.status === "excellent" ? "default" : "secondary"}>{item.status}</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-sm text-muted-foreground">{item.score}%</div>
                  <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Market Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Market Trends</CardTitle>
            <CardDescription>Current market conditions and forecasts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockMarketTrends.slice(0, 4).map((trend) => (
              <div key={trend.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="font-medium">{trend.category}</div>
                  <Badge
                    variant={
                      trend.forecast === "bullish"
                        ? "default"
                        : trend.forecast === "bearish"
                          ? "destructive"
                          : "secondary"
                    }
                  >
                    {trend.forecast}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  {trend.trend === "up" ? (
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  ) : trend.trend === "down" ? (
                    <TrendingDown className="h-4 w-4 text-red-500" />
                  ) : (
                    <div className="h-4 w-4" />
                  )}
                  <div className="text-sm font-medium">
                    {trend.changePercent > 0 ? "+" : ""}
                    {trend.changePercent}%
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Supply Chain Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Key Performance Indicators</CardTitle>
          <CardDescription>Critical metrics for supply chain optimization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockSupplyChainMetrics.map((metric) => (
              <div key={metric.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">{metric.metric}</div>
                  <Badge
                    variant={
                      metric.status === "good" ? "default" : metric.status === "warning" ? "secondary" : "destructive"
                    }
                  >
                    {metric.status}
                  </Badge>
                </div>
                <div className="text-2xl font-bold">
                  {metric.value}
                  {metric.unit}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  {metric.trend === "up" ? (
                    <TrendingUp className="h-3 w-3 text-green-500" />
                  ) : metric.trend === "down" ? (
                    <TrendingDown className="h-3 w-3 text-red-500" />
                  ) : (
                    <div className="h-3 w-3" />
                  )}
                  <span
                    className={
                      metric.changePercent > 0
                        ? "text-green-600"
                        : metric.changePercent < 0
                          ? "text-red-600"
                          : "text-muted-foreground"
                    }
                  >
                    {metric.changePercent > 0 ? "+" : ""}
                    {metric.changePercent}%
                  </span>
                  <span className="text-muted-foreground">vs benchmark</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common analyst tasks and reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-start gap-2 bg-transparent">
              <BarChart3 className="h-5 w-5" />
              <div className="text-left">
                <div className="font-medium">Market Analysis</div>
                <div className="text-sm text-muted-foreground">Analyze market trends and forecasts</div>
              </div>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-start gap-2 bg-transparent">
              <Globe className="h-5 w-5" />
              <div className="text-left">
                <div className="font-medium">Supply Chain Map</div>
                <div className="text-sm text-muted-foreground">Visualize network connections</div>
              </div>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-start gap-2 bg-transparent">
              <Target className="h-5 w-5" />
              <div className="text-left">
                <div className="font-medium">Performance Report</div>
                <div className="text-sm text-muted-foreground">Generate comprehensive reports</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
