"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FileText, Download, Calendar, Search, Plus, Clock, CheckCircle } from "lucide-react"

const mockReports = [
  {
    id: "RPT-001",
    name: "Monthly Supply Chain Performance",
    type: "Performance",
    status: "completed",
    createdDate: new Date("2024-01-20"),
    lastRun: new Date("2024-01-20"),
    nextRun: new Date("2024-02-20"),
    frequency: "Monthly",
    description: "Comprehensive analysis of supply chain efficiency and performance metrics",
  },
  {
    id: "RPT-002",
    name: "Market Trends Analysis",
    type: "Market",
    status: "running",
    createdDate: new Date("2024-01-18"),
    lastRun: new Date("2024-01-21"),
    nextRun: new Date("2024-01-28"),
    frequency: "Weekly",
    description: "Weekly market trends and price analysis across all product categories",
  },
  {
    id: "RPT-003",
    name: "Risk Assessment Report",
    type: "Risk",
    status: "scheduled",
    createdDate: new Date("2024-01-15"),
    lastRun: new Date("2024-01-15"),
    nextRun: new Date("2024-01-22"),
    frequency: "Weekly",
    description: "Identification and analysis of supply chain risks and mitigation strategies",
  },
  {
    id: "RPT-004",
    name: "Compliance Audit",
    type: "Compliance",
    status: "completed",
    createdDate: new Date("2024-01-10"),
    lastRun: new Date("2024-01-19"),
    nextRun: new Date("2024-04-19"),
    frequency: "Quarterly",
    description: "Quarterly compliance audit across all suppliers and processes",
  },
]

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports</h1>
          <p className="text-muted-foreground">Custom report generation, scheduled reports, and data export</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Report
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockReports.length}</div>
            <div className="text-sm text-muted-foreground">Active reports</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockReports.filter((r) => r.status === "scheduled").length}</div>
            <div className="text-sm text-muted-foreground">Pending execution</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Running</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockReports.filter((r) => r.status === "running").length}</div>
            <div className="text-sm text-muted-foreground">Currently processing</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockReports.filter((r) => r.status === "completed").length}</div>
            <div className="text-sm text-muted-foreground">Ready for download</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Report Library</CardTitle>
          <CardDescription>Manage and access all your reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search reports..." className="pl-10" />
            </div>
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Date Range
            </Button>
          </div>

          <div className="space-y-4">
            {mockReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <FileText className="h-8 w-8 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{report.name}</div>
                    <div className="text-sm text-muted-foreground">{report.description}</div>
                    <div className="flex items-center gap-4 mt-2">
                      <Badge variant="outline">{report.type}</Badge>
                      <Badge
                        variant={
                          report.status === "completed"
                            ? "default"
                            : report.status === "running"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {report.status === "completed" && <CheckCircle className="h-3 w-3 mr-1" />}
                        {report.status === "running" && <Clock className="h-3 w-3 mr-1" />}
                        {report.status}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {report.frequency} • Next: {report.nextRun.toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {report.status === "completed" && (
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Report Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Report Templates</CardTitle>
          <CardDescription>Quick start templates for common reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-start gap-2 bg-transparent">
              <FileText className="h-5 w-5" />
              <div className="text-left">
                <div className="font-medium">Performance Dashboard</div>
                <div className="text-sm text-muted-foreground">KPIs and performance metrics</div>
              </div>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-start gap-2 bg-transparent">
              <FileText className="h-5 w-5" />
              <div className="text-left">
                <div className="font-medium">Market Analysis</div>
                <div className="text-sm text-muted-foreground">Market trends and forecasts</div>
              </div>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-start gap-2 bg-transparent">
              <FileText className="h-5 w-5" />
              <div className="text-left">
                <div className="font-medium">Risk Assessment</div>
                <div className="text-sm text-muted-foreground">Risk analysis and mitigation</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
