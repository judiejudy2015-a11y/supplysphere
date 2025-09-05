"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Settings, Database, Shield, Mail, Globe, Server } from "lucide-react"

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Platform Settings</h1>
        <p className="text-muted-foreground">Configure platform-wide settings and integrations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* General Settings */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              General Settings
            </CardTitle>
            <CardDescription>Basic platform configuration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Platform Name</label>
                <Input defaultValue="SupplySphere" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Admin Email</label>
                <Input defaultValue="admin@supplysphere.com" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Support URL</label>
              <Input defaultValue="https://support.supplysphere.com" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Maintenance Mode</label>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Enable Maintenance Mode</div>
                  <div className="text-sm text-muted-foreground">Temporarily disable user access</div>
                </div>
                <Switch />
              </div>
            </div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>System Actions</CardTitle>
            <CardDescription>Common admin tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Database className="h-4 w-4 mr-2" />
              Backup Database
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Shield className="h-4 w-4 mr-2" />
              Security Scan
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Server className="h-4 w-4 mr-2" />
              System Health Check
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security Settings
          </CardTitle>
          <CardDescription>Configure security policies and authentication</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Two-Factor Authentication</div>
                  <div className="text-sm text-muted-foreground">Require 2FA for all admin accounts</div>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Session Timeout</div>
                  <div className="text-sm text-muted-foreground">Auto-logout inactive users</div>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">IP Whitelist</div>
                  <div className="text-sm text-muted-foreground">Restrict access by IP address</div>
                </div>
                <Switch />
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Password Policy</label>
                <select className="w-full p-2 border rounded-md">
                  <option>Strong (12+ chars, mixed case, numbers, symbols)</option>
                  <option>Medium (8+ chars, mixed case, numbers)</option>
                  <option>Basic (6+ chars)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Session Duration</label>
                <select className="w-full p-2 border rounded-md">
                  <option>8 hours</option>
                  <option>4 hours</option>
                  <option>2 hours</option>
                  <option>1 hour</option>
                </select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Integration Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Integrations
          </CardTitle>
          <CardDescription>Configure external service integrations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Blockchain Integration</div>
                  <div className="text-sm text-muted-foreground">Enable blockchain verification</div>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Email Notifications</div>
                  <div className="text-sm text-muted-foreground">Send system notifications via email</div>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">SMS Alerts</div>
                  <div className="text-sm text-muted-foreground">Critical alerts via SMS</div>
                </div>
                <Switch />
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">SMTP Server</label>
                <Input defaultValue="smtp.supplysphere.com" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">API Rate Limit</label>
                <select className="w-full p-2 border rounded-md">
                  <option>1000 requests/hour</option>
                  <option>500 requests/hour</option>
                  <option>100 requests/hour</option>
                </select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Notification Settings
          </CardTitle>
          <CardDescription>Configure system-wide notification preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">System Alerts</div>
              <div className="text-sm text-muted-foreground">Critical system events and errors</div>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">User Activity</div>
              <div className="text-sm text-muted-foreground">New user registrations and activities</div>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Performance Alerts</div>
              <div className="text-sm text-muted-foreground">System performance and resource usage</div>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Security Events</div>
              <div className="text-sm text-muted-foreground">Failed logins and security incidents</div>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
