"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { mockAnalystAnalytics, mockSupplyChainMetrics } from "@/lib/mock-data"
import { BarChart3, TrendingUp, TrendingDown, Download, RefreshCw, Zap, Globe } from "lucide-react"

export default function SupplyChainAnalyticsPage() {
  const { monthlyTrends, supplyChainHealth, networkEfficiency } = mockAnalystAnalytics

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Supply Chain Analytics</h1>
          <p className="text-muted-foreground">Flow visualization, bottleneck identification, and efficiency metrics</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Network Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Network Efficiency
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{networkEfficiency}%</div>
            <div className="flex items-center gap-1 text-sm text-green-600">
              <TrendingUp className="h-3 w-3" />
              +2.3% from last month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Active Nodes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">247</div>
            <div className="text-sm text-muted-foreground">Across 4 regions</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Throughput</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15.2K</div>
            <div className="text-sm text-muted-foreground">Units/day</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Bottlenecks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <div className="flex items-center gap-1 text-sm text-orange-600">
              <TrendingDown className="h-3 w-3" />
              -2 from last week
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Trends Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Trends</CardTitle>
          <CardDescription>Monthly efficiency, cost, and quality metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {monthlyTrends.map((month) => (
              <div key={month.month} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="font-medium">{month.month}</div>
                <div className="flex items-center gap-8">
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">Efficiency</div>
                    <div className="font-medium">{month.efficiency}%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">Cost</div>
                    <div className="font-medium">${month.cost.toLocaleString()}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">Quality</div>
                    <div className="font-medium">{month.quality}/5</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Supply Chain Health */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

        {/* Key Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Key Metrics</CardTitle>
            <CardDescription>Critical performance indicators</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockSupplyChainMetrics.map((metric) => (
              <div key={metric.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="font-medium">{metric.metric}</div>
                  <Badge
                    variant={
                      metric.status === "good" ? "default" : metric.status === "warning" ? "secondary" : "destructive"
                    }
                  >
                    {metric.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  {metric.trend === "up" ? (
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  ) : metric.trend === "down" ? (
                    <TrendingDown className="h-4 w-4 text-red-500" />
                  ) : (
                    <div className="h-4 w-4" />
                  )}
                  <div className="text-sm font-medium">
                    {metric.value}
                    {metric.unit}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Network Visualization Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Network Visualization</CardTitle>
          <CardDescription>Interactive supply chain network map</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
            <div className="text-center space-y-2">
              <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground" />
              <div className="text-sm text-muted-foreground">Interactive network visualization</div>
              <Button variant="outline" size="sm">
                View Full Network
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
