"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { mockAuditLogs } from "@/lib/mock-data"
import { Search, Filter, Download, Calendar, Shield, AlertTriangle, CheckCircle } from "lucide-react"

export default function AuditLogsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Audit Logs</h1>
          <p className="text-muted-foreground">Activity tracking, compliance monitoring, and security audit trail</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Date Range
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Audit Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAuditLogs.length}</div>
            <div className="text-sm text-muted-foreground">Last 24 hours</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Successful</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAuditLogs.filter((log) => log.status === "success").length}</div>
            <div className="text-sm text-muted-foreground">Completed actions</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Failed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAuditLogs.filter((log) => log.status === "failed").length}</div>
            <div className="text-sm text-muted-foreground">Failed attempts</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Security Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <div className="text-sm text-muted-foreground">Requires review</div>
          </CardContent>
        </Card>
      </div>

      {/* Audit Log List */}
      <Card>
        <CardHeader>
          <CardTitle>Activity Log</CardTitle>
          <CardDescription>Detailed audit trail of all system activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search audit logs..." className="pl-10" />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>

          <div className="space-y-4">
            {mockAuditLogs.map((log) => (
              <div key={log.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <div>
                    <div className="font-medium">{log.action.replace(/_/g, " ").toLowerCase()}</div>
                    <div className="text-sm text-muted-foreground">
                      {log.userName} • {log.resource}
                    </div>
                    {log.details && <div className="text-xs text-muted-foreground mt-1">{log.details}</div>}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right text-sm">
                    <div className="text-muted-foreground">
                      {log.timestamp.toLocaleDateString()} {log.timestamp.toLocaleTimeString()}
                    </div>
                    <div className="text-xs text-muted-foreground">{log.ipAddress}</div>
                  </div>
                  <Badge
                    variant={
                      log.status === "success" ? "default" : log.status === "failed" ? "destructive" : "secondary"
                    }
                  >
                    {log.status === "success" && <CheckCircle className="h-3 w-3 mr-1" />}
                    {log.status === "failed" && <AlertTriangle className="h-3 w-3 mr-1" />}
                    {log.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Security Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security Summary
          </CardTitle>
          <CardDescription>Security-related events and compliance status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="font-medium">Login Attempts</div>
              <div className="text-2xl font-bold">47</div>
              <div className="text-sm text-muted-foreground">2 failed attempts</div>
            </div>
            <div className="space-y-2">
              <div className="font-medium">Permission Changes</div>
              <div className="text-2xl font-bold">3</div>
              <div className="text-sm text-muted-foreground">Admin actions</div>
            </div>
            <div className="space-y-2">
              <div className="font-medium">Data Access</div>
              <div className="text-2xl font-bold">156</div>
              <div className="text-sm text-muted-foreground">Authorized requests</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
