"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { mockSystemMetrics, mockAdminAnalytics } from "@/lib/mock-data"
import {
  Server,
  Activity,
  RefreshCw,
  Download,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  TrendingDown,
} from "lucide-react"

export default function SystemMonitoringPage() {
  const { systemHealth } = mockAdminAnalytics

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">System Monitoring</h1>
          <p className="text-muted-foreground">Real-time system performance and health monitoring</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export Logs
          </Button>
        </div>
      </div>

      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Server className="h-4 w-4" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Healthy</div>
            <div className="text-sm text-muted-foreground">All systems operational</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Uptime</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.8%</div>
            <div className="text-sm text-muted-foreground">Last 30 days</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <div className="text-sm text-muted-foreground">Requires attention</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Data Processed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4TB</div>
            <div className="text-sm text-muted-foreground">Today</div>
          </CardContent>
        </Card>
      </div>

      {/* System Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
          <CardDescription>Real-time system resource usage and performance indicators</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockSystemMetrics.map((metric) => (
              <div key={metric.id} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{metric.name}</div>
                  <Badge
                    variant={
                      metric.status === "healthy"
                        ? "default"
                        : metric.status === "warning"
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    {metric.status === "healthy" && <CheckCircle className="h-3 w-3 mr-1" />}
                    {metric.status === "warning" && <AlertTriangle className="h-3 w-3 mr-1" />}
                    {metric.status}
                  </Badge>
                </div>
                <div className="text-3xl font-bold">
                  {metric.value}
                  {metric.unit}
                </div>
                <div className="space-y-2">
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        metric.status === "healthy"
                          ? "bg-green-500"
                          : metric.status === "warning"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                      }`}
                      style={{ width: `${Math.min(metric.value, 100)}%` }}
                    />
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
                    <span className="text-muted-foreground">vs last hour</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Component Health */}
      <Card>
        <CardHeader>
          <CardTitle>Component Health</CardTitle>
          <CardDescription>Status and uptime of individual system components</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {systemHealth.map((component) => (
            <div key={component.component} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <div>
                  <div className="font-medium">{component.component}</div>
                  <div className="text-sm text-muted-foreground">Uptime: {component.uptime}%</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge
                  variant={
                    component.status === "healthy"
                      ? "default"
                      : component.status === "warning"
                        ? "secondary"
                        : "destructive"
                  }
                >
                  {component.status === "healthy" && <CheckCircle className="h-3 w-3 mr-1" />}
                  {component.status === "warning" && <AlertTriangle className="h-3 w-3 mr-1" />}
                  {component.status}
                </Badge>
                <Button variant="outline" size="sm">
                  <Activity className="h-4 w-4 mr-2" />
                  Details
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* System Actions */}
      <Card>
        <CardHeader>
          <CardTitle>System Actions</CardTitle>
          <CardDescription>Common system maintenance and monitoring tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-start gap-2 bg-transparent">
              <RefreshCw className="h-5 w-5" />
              <div className="text-left">
                <div className="font-medium">Restart Services</div>
                <div className="text-sm text-muted-foreground">Restart system services</div>
              </div>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-start gap-2 bg-transparent">
              <Download className="h-5 w-5" />
              <div className="text-left">
                <div className="font-medium">Download Logs</div>
                <div className="text-sm text-muted-foreground">Export system logs</div>
              </div>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-start gap-2 bg-transparent">
              <AlertTriangle className="h-5 w-5" />
              <div className="text-left">
                <div className="font-medium">Alert Settings</div>
                <div className="text-sm text-muted-foreground">Configure system alerts</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
