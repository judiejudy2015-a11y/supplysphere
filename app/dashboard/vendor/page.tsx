"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { KPICard } from "@/components/dashboard/kpi-card"
import { mockVendorAnalytics, mockOrders, mockVerifications, mockSuppliers } from "@/lib/mock-data"
import {
  ShoppingCart,
  DollarSign,
  Shield,
  TrendingUp,
  Search,
  Plus,
  ArrowRight,
  CheckCircle,
  Clock,
  AlertTriangle,
  Star,
} from "lucide-react"

export default function VendorDashboard() {
  const recentOrders = mockOrders.slice(0, 5)
  const recentVerifications = mockVerifications.slice(0, 4)
  const topSuppliers = mockSuppliers.slice(0, 3)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Vendor Dashboard</h1>
          <p className="text-muted-foreground">Manage orders, verify products, and track supplier performance.</p>
        </div>
        <div className="flex gap-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Order
          </Button>
          <Button variant="outline">
            <Shield className="mr-2 h-4 w-4" />
            Verify Product
          </Button>
        </div>
      </div>

      {/* Quick Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search products, suppliers, or orders..." className="pl-10" />
            </div>
            <Button>Search Products</Button>
            <Button variant="outline">
              <Shield className="mr-2 h-4 w-4" />
              Scan QR Code
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Total Orders"
          value={mockVendorAnalytics.totalOrders}
          change={12.5}
          changeLabel="from last month"
          icon={<ShoppingCart className="h-4 w-4" />}
        />
        <KPICard
          title="Pending Orders"
          value={mockVendorAnalytics.pendingOrders}
          change={-8.2}
          changeLabel="from last week"
          icon={<Clock className="h-4 w-4" />}
        />
        <KPICard
          title="Monthly Spend"
          value={`$${mockVendorAnalytics.monthlySpend.toLocaleString()}`}
          change={15.3}
          changeLabel="from last month"
          icon={<DollarSign className="h-4 w-4" />}
        />
        <KPICard
          title="Verification Success"
          value={`${mockVendorAnalytics.verificationSuccess}%`}
          change={2.1}
          changeLabel="from last month"
          icon={<Shield className="h-4 w-4" />}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Orders */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Latest order updates and status</CardDescription>
            </div>
            <Button variant="ghost" size="sm">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                      {order.status === "delivered" && <CheckCircle className="h-5 w-5 text-green-500" />}
                      {order.status === "shipped" && <TrendingUp className="h-5 w-5 text-blue-500" />}
                      {order.status === "confirmed" && <CheckCircle className="h-5 w-5 text-green-500" />}
                      {order.status === "pending" && <Clock className="h-5 w-5 text-yellow-500" />}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{order.productName}</p>
                      <p className="text-xs text-muted-foreground">
                        {order.supplierName} • {order.quantity} units
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant={
                        order.status === "delivered" || order.status === "confirmed"
                          ? "default"
                          : order.status === "pending"
                            ? "outline"
                            : "secondary"
                      }
                    >
                      {order.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">${order.totalPrice.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Verifications */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Verifications</CardTitle>
              <CardDescription>Latest product verification results</CardDescription>
            </div>
            <Button variant="ghost" size="sm">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentVerifications.map((verification) => (
                <div key={verification.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                      {verification.status === "verified" && <CheckCircle className="h-5 w-5 text-green-500" />}
                      {verification.status === "failed" && <AlertTriangle className="h-5 w-5 text-red-500" />}
                      {verification.status === "suspicious" && <AlertTriangle className="h-5 w-5 text-yellow-500" />}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{verification.productName}</p>
                      <p className="text-xs text-muted-foreground">Batch: {verification.batchId}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant={
                        verification.status === "verified"
                          ? "default"
                          : verification.status === "suspicious"
                            ? "outline"
                            : "destructive"
                      }
                    >
                      {verification.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">
                      {verification.verificationDate.toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Suppliers */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Top Suppliers</CardTitle>
              <CardDescription>Your most reliable suppliers</CardDescription>
            </div>
            <Button variant="ghost" size="sm">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topSuppliers.map((supplier) => (
                <div key={supplier.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">{supplier.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">{supplier.name}</p>
                      <p className="text-xs text-muted-foreground">{supplier.location}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{supplier.rating}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{supplier.totalOrders} orders</p>
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
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              <Button variant="outline" className="justify-start h-12 bg-transparent">
                <Search className="mr-3 h-4 w-4" />
                Search Products
              </Button>
              <Button variant="outline" className="justify-start h-12 bg-transparent">
                <Plus className="mr-3 h-4 w-4" />
                Place New Order
              </Button>
              <Button variant="outline" className="justify-start h-12 bg-transparent">
                <Shield className="mr-3 h-4 w-4" />
                Verify Products
              </Button>
              <Button variant="outline" className="justify-start h-12 bg-transparent">
                <TrendingUp className="mr-3 h-4 w-4" />
                View Analytics
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
