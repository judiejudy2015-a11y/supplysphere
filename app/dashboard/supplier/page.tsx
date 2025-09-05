"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { KPICard } from "@/components/dashboard/kpi-card"
import { mockAnalytics, mockShipments, mockProducts } from "@/lib/mock-data"
import {
  Package,
  Truck,
  DollarSign,
  TrendingUp,
  Clock,
  AlertTriangle,
  CheckCircle,
  Plus,
  ArrowRight,
} from "lucide-react"

export default function SupplierDashboard() {
  const recentShipments = mockShipments.slice(0, 5)
  const lowStockProducts = mockProducts.filter((p) => p.stockLevel < 100)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard Overview</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening with your supply chain.</p>
        </div>
        <div className="flex gap-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
          <Button variant="outline">
            <Truck className="mr-2 h-4 w-4" />
            Create Shipment
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Total Products"
          value={mockAnalytics.totalProducts}
          change={8.2}
          changeLabel="from last month"
          icon={<Package className="h-4 w-4" />}
        />
        <KPICard
          title="Active Shipments"
          value={mockAnalytics.activeShipments}
          change={-2.1}
          changeLabel="from last week"
          icon={<Truck className="h-4 w-4" />}
        />
        <KPICard
          title="Monthly Revenue"
          value={`$${mockAnalytics.revenue.toLocaleString()}`}
          change={mockAnalytics.revenueGrowth}
          changeLabel="from last month"
          icon={<DollarSign className="h-4 w-4" />}
        />
        <KPICard
          title="Delivery Success"
          value={`${mockAnalytics.deliverySuccess}%`}
          change={1.8}
          changeLabel="from last month"
          icon={<TrendingUp className="h-4 w-4" />}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Shipments */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Shipments</CardTitle>
              <CardDescription>Latest shipment updates and status</CardDescription>
            </div>
            <Button variant="ghost" size="sm">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentShipments.map((shipment) => (
                <div key={shipment.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                      {shipment.status === "delivered" && <CheckCircle className="h-5 w-5 text-green-500" />}
                      {shipment.status === "in_transit" && <Truck className="h-5 w-5 text-blue-500" />}
                      {shipment.status === "delayed" && <AlertTriangle className="h-5 w-5 text-yellow-500" />}
                      {shipment.status === "pending" && <Clock className="h-5 w-5 text-gray-500" />}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{shipment.productName}</p>
                      <p className="text-xs text-muted-foreground">{shipment.trackingNumber}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant={
                        shipment.status === "delivered"
                          ? "default"
                          : shipment.status === "delayed"
                            ? "destructive"
                            : "secondary"
                      }
                    >
                      {shipment.status.replace("_", " ")}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">
                      {shipment.status === "delivered" && shipment.actualArrival
                        ? shipment.actualArrival.toLocaleDateString()
                        : shipment.estimatedArrival.toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Low Stock Alert */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Inventory Alerts</CardTitle>
              <CardDescription>Products requiring attention</CardDescription>
            </div>
            <Button variant="ghost" size="sm">
              Manage Inventory
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lowStockProducts.map((product) => (
                <div key={product.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-sm">{product.name}</p>
                      <p className="text-xs text-muted-foreground">Batch: {product.batchId}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                      {product.stockLevel} units
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">Low Stock</p>
                  </div>
                </div>
              ))}
              {lowStockProducts.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <CheckCircle className="h-12 w-12 mx-auto mb-2 text-green-500" />
                  <p>All products are well stocked!</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
              <Package className="h-6 w-6" />
              <span>Add New Product</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
              <Truck className="h-6 w-6" />
              <span>Create Shipment</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
              <TrendingUp className="h-6 w-6" />
              <span>View Analytics</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
              <CheckCircle className="h-6 w-6" />
              <span>Generate QR Codes</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
