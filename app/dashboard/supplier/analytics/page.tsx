"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { KPICard } from "@/components/dashboard/kpi-card"
import { mockAnalytics } from "@/lib/mock-data"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { TrendingUp, DollarSign, Truck, Clock, Star } from "lucide-react"

const COLORS = ["#0ea5e9", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"]

export default function AnalyticsPage() {
  const categoryData = [
    { name: "Vegetables", value: 35, count: 45 },
    { name: "Meat", value: 25, count: 32 },
    { name: "Bakery", value: 20, count: 28 },
    { name: "Dairy", value: 15, count: 19 },
    { name: "Other", value: 5, count: 8 },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
        <p className="text-muted-foreground">Track performance metrics and business insights</p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
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
          icon={<Truck className="h-4 w-4" />}
        />
        <KPICard
          title="Avg Delivery Time"
          value={`${mockAnalytics.averageDeliveryTime} days`}
          change={-5.2}
          changeLabel="improvement"
          icon={<Clock className="h-4 w-4" />}
        />
        <KPICard
          title="Customer Rating"
          value={`${mockAnalytics.customerSatisfaction}/5`}
          change={3.1}
          changeLabel="from last month"
          icon={<Star className="h-4 w-4" />}
        />
        <KPICard
          title="Growth Rate"
          value="12.5%"
          change={2.3}
          changeLabel="quarterly"
          icon={<TrendingUp className="h-4 w-4" />}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue Trend</CardTitle>
            <CardDescription>Revenue performance over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockAnalytics.monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, "Revenue"]} />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#0ea5e9"
                  strokeWidth={3}
                  dot={{ fill: "#0ea5e9", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Delivery Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Delivery Performance</CardTitle>
            <CardDescription>Delivered vs delayed shipments by day</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockAnalytics.deliveryMetrics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="delivered" fill="#10b981" name="Delivered" />
                <Bar dataKey="delayed" fill="#ef4444" name="Delayed" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Product Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Product Distribution</CardTitle>
            <CardDescription>Products by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Performing Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Products</CardTitle>
            <CardDescription>Best selling products this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Organic Tomatoes", sales: 1250, growth: 15.2 },
                { name: "Premium Beef", sales: 980, growth: 8.7 },
                { name: "Artisan Bread", sales: 750, growth: 12.1 },
                { name: "Fresh Milk", sales: 650, growth: -2.3 },
                { name: "Free Range Eggs", sales: 580, growth: 6.8 },
              ].map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">{product.sales} units sold</p>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-medium ${product.growth > 0 ? "text-green-600" : "text-red-600"}`}>
                      {product.growth > 0 ? "+" : ""}
                      {product.growth}%
                    </div>
                    <div className="text-xs text-muted-foreground">vs last month</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
