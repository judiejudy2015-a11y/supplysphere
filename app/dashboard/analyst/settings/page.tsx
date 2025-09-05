"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { User, Bell, Database, Shield, Download, Mail } from "lucide-react"

export default function AnalystSettingsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Manage your analyst preferences and configurations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Settings */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Settings
            </CardTitle>
            <CardDescription>Update your personal information and preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <Input defaultValue="Sarah Analyst" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input defaultValue="sarah@supplysphere.com" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Department</label>
              <Input defaultValue="Supply Chain Analytics" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Specialization</label>
              <div className="flex gap-2">
                <Badge>Market Analysis</Badge>
                <Badge>Risk Assessment</Badge>
                <Badge>Performance Metrics</Badge>
              </div>
            </div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common analyst tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Database className="h-4 w-4 mr-2" />
              Refresh Cache
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Shield className="h-4 w-4 mr-2" />
              Security Audit
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Preferences
          </CardTitle>
          <CardDescription>Configure how you receive alerts and updates</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Market Alerts</div>
              <div className="text-sm text-muted-foreground">Receive notifications for significant market changes</div>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Risk Warnings</div>
              <div className="text-sm text-muted-foreground">Get alerted when risk thresholds are exceeded</div>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Report Completion</div>
              <div className="text-sm text-muted-foreground">Notify when scheduled reports are ready</div>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Weekly Summary</div>
              <div className="text-sm text-muted-foreground">Receive weekly performance summaries</div>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* Data Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Data Preferences
          </CardTitle>
          <CardDescription>Configure data sources and refresh intervals</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Default Time Range</label>
              <select className="w-full p-2 border rounded-md">
                <option>Last 30 days</option>
                <option>Last 90 days</option>
                <option>Last 6 months</option>
                <option>Last year</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Data Refresh Interval</label>
              <select className="w-full p-2 border rounded-md">
                <option>Real-time</option>
                <option>Every 5 minutes</option>
                <option>Every 15 minutes</option>
                <option>Every hour</option>
              </select>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Auto-refresh Dashboards</div>
              <div className="text-sm text-muted-foreground">Automatically refresh data on dashboard pages</div>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Cache Historical Data</div>
              <div className="text-sm text-muted-foreground">Store historical data locally for faster access</div>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Export Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Export & Sharing
          </CardTitle>
          <CardDescription>Configure default export formats and sharing options</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Default Export Format</label>
              <select className="w-full p-2 border rounded-md">
                <option>Excel (.xlsx)</option>
                <option>CSV (.csv)</option>
                <option>PDF Report</option>
                <option>JSON Data</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Chart Export Quality</label>
              <select className="w-full p-2 border rounded-md">
                <option>High (300 DPI)</option>
                <option>Medium (150 DPI)</option>
                <option>Low (72 DPI)</option>
              </select>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Include Raw Data</div>
              <div className="text-sm text-muted-foreground">Include raw data sheets in exports</div>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Auto-email Reports</div>
              <div className="text-sm text-muted-foreground">Automatically email completed reports to stakeholders</div>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
