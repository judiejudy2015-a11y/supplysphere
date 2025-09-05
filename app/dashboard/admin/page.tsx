"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { KpiCard } from "@/components/dashboard/kpi-card"
import { mockAdminAnalytics, mockSystemMetrics, mockAuditLogs } from "@/lib/mock-data"
import { Users, Activity, Shield, Server, AlertTriangle, CheckCircle, TrendingUp } from "lucide-react"

export default function AdminDashboard() {
  const { totalUsers, activeUsers, totalTransactions, systemUptime, dataProcessed, securityAlerts, systemHealth } =
    mockAdminAnalytics

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">System Administration</h1>
          <p className="text-muted-foreground">Platform overview and system management</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Activity className="h-4 w-4 mr-2" />
            System Status
          </Button>
          <Button>
            <Shield className="h-4 w-4 mr-2" />
            Security Center
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard
          title="Total Users"
          value={totalUsers.toString()}
          change={8.2}
          icon={<Users className="h-4 w-4" />}
          trend="up"
        />
        <KpiCard
          title="Active Users"
          value={activeUsers.toString()}
          change={5.7}
          icon={<Activity className="h-4 w-4" />}
          trend="up"
        />
        <KpiCard
          title="System Uptime"
          value={`${systemUptime}%`}
          change={0.1}
          icon={<Server className="h-4 w-4" />}
          trend="up"
        />
        <KpiCard
          title="Security Alerts"
          value={securityAlerts.toString()}
          change={-25.0}
          icon={<AlertTriangle className="h-4 w-4" />}
          trend="down"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Health */}
        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
            <CardDescription>Real-time status of platform components</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {systemHealth.map((component) => (
              <div key={component.component} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="font-medium">{component.component}</div>
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
                </div>
                <div className="text-sm text-muted-foreground">{component.uptime}% uptime</div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest system events and user actions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockAuditLogs.slice(0, 5).map((log) => (
              <div key={log.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <div>
                    <div className="font-medium text-sm">{log.action.replace(/_/g, " ").toLowerCase()}</div>
                    <div className="text-xs text-muted-foreground">{log.userName}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      log.status === "success" ? "default" : log.status === "failed" ? "destructive" : "secondary"
                    }
                  >
                    {log.status}
                  </Badge>
                  <div className="text-xs text-muted-foreground">{log.timestamp.toLocaleTimeString()}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* System Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>System Performance</CardTitle>
          <CardDescription>Real-time system metrics and resource usage</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockSystemMetrics.map((metric) => (
              <div key={metric.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">{metric.name}</div>
                  <Badge
                    variant={
                      metric.status === "healthy"
                        ? "default"
                        : metric.status === "warning"
                          ? "secondary"
                          : "destructive"
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
                    <TrendingUp className="h-3 w-3 text-red-500 rotate-180" />
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
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-start gap-2 bg-transparent">
              <Users className="h-5 w-5" />
              <div className="text-left">
                <div className="font-medium">User Management</div>
                <div className="text-sm text-muted-foreground">Manage user accounts and permissions</div>
              </div>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-start gap-2 bg-transparent">
              <Server className="h-5 w-5" />
              <div className="text-left">
                <div className="font-medium">System Monitor</div>
                <div className="text-sm text-muted-foreground">View system performance metrics</div>
              </div>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-start gap-2 bg-transparent">
              <Shield className="h-5 w-5" />
              <div className="text-left">
                <div className="font-medium">Security Audit</div>
                <div className="text-sm text-muted-foreground">Review security logs and alerts</div>
              </div>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-start gap-2 bg-transparent">
              <Activity className="h-5 w-5" />
              <div className="text-left">
                <div className="font-medium">Audit Logs</div>
                <div className="text-sm text-muted-foreground">View detailed activity logs</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
