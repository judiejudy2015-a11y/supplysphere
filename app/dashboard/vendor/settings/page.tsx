"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/contexts/auth-context"
import { useTheme } from "next-themes"
import { Save, Bell, Shield, User, ShoppingCart } from "lucide-react"

export default function VendorSettingsPage() {
  const { user } = useAuth()
  const { theme, setTheme } = useTheme()
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: false,
    orderUpdates: true,
    priceAlerts: true,
    supplierNews: true,
    verificationAlerts: true,
  })

  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    company: "Fresh Market Store",
    address: "456 Market Street, New York, NY 10001",
    timezone: "America/New_York",
    businessType: "retail",
  })

  const [preferences, setPreferences] = useState({
    autoVerify: true,
    preferredSuppliers: [] as string[],
    orderThreshold: 1000,
    qualityStandard: "high",
  })

  const handleSave = () => {
    // In a real app, this would save to the backend
    console.log("Saving settings:", { profile, notifications, preferences, theme })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Vendor Settings</h1>
        <p className="text-muted-foreground">Manage your vendor account preferences and configurations</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Business Information
            </CardTitle>
            <CardDescription>Update your business and contact information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="name">Contact Name</Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div>
                <Label htmlFor="businessType">Business Type</Label>
                <Select
                  value={profile.businessType}
                  onValueChange={(value) => setProfile({ ...profile, businessType: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="retail">Retail Store</SelectItem>
                    <SelectItem value="restaurant">Restaurant</SelectItem>
                    <SelectItem value="distributor">Distributor</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="company">Business Name</Label>
              <Input
                id="company"
                value={profile.company}
                onChange={(e) => setProfile({ ...profile, company: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="address">Business Address</Label>
              <Textarea
                id="address"
                value={profile.address}
                onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="timezone">Timezone</Label>
              <Select value={profile.timezone} onValueChange={(value) => setProfile({ ...profile, timezone: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                  <SelectItem value="America/Denver">Mountain Time</SelectItem>
                  <SelectItem value="America/Chicago">Central Time</SelectItem>
                  <SelectItem value="America/New_York">Eastern Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Purchasing Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Purchasing Preferences
            </CardTitle>
            <CardDescription>Configure your ordering and verification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="autoVerify">Auto-verify products</Label>
                <p className="text-sm text-muted-foreground">Automatically verify products upon delivery</p>
              </div>
              <Switch
                id="autoVerify"
                checked={preferences.autoVerify}
                onCheckedChange={(checked) => setPreferences({ ...preferences, autoVerify: checked })}
              />
            </div>

            <div>
              <Label htmlFor="orderThreshold">Order Threshold ($)</Label>
              <Input
                id="orderThreshold"
                type="number"
                value={preferences.orderThreshold}
                onChange={(e) =>
                  setPreferences({ ...preferences, orderThreshold: Number.parseInt(e.target.value) || 0 })
                }
              />
              <p className="text-sm text-muted-foreground mt-1">Minimum order amount for automatic approval</p>
            </div>

            <div>
              <Label htmlFor="qualityStandard">Quality Standard</Label>
              <Select
                value={preferences.qualityStandard}
                onValueChange={(value) => setPreferences({ ...preferences, qualityStandard: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic</SelectItem>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notification Preferences
            </CardTitle>
            <CardDescription>Choose how you want to be notified</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="font-medium mb-3">Notification Channels</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <Switch
                    id="email-notifications"
                    checked={notifications.email}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="push-notifications">Push Notifications</Label>
                  <Switch
                    id="push-notifications"
                    checked={notifications.push}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="sms-notifications">SMS Notifications</Label>
                  <Switch
                    id="sms-notifications"
                    checked={notifications.sms}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked })}
                  />
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">Notification Types</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="order-updates">Order Updates</Label>
                  <Switch
                    id="order-updates"
                    checked={notifications.orderUpdates}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, orderUpdates: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="price-alerts">Price Alerts</Label>
                  <Switch
                    id="price-alerts"
                    checked={notifications.priceAlerts}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, priceAlerts: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="supplier-news">Supplier News</Label>
                  <Switch
                    id="supplier-news"
                    checked={notifications.supplierNews}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, supplierNews: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="verification-alerts">Verification Alerts</Label>
                  <Switch
                    id="verification-alerts"
                    checked={notifications.verificationAlerts}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, verificationAlerts: checked })}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security & Appearance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security & Appearance
            </CardTitle>
            <CardDescription>Manage security settings and app appearance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="theme">Theme</Label>
              <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Button variant="outline" className="w-full bg-transparent">
                Change Password
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                Enable Two-Factor Authentication
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                Download Account Data
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="min-w-32">
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>
    </div>
  )
}
