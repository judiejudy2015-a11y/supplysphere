"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { KPICard } from "@/components/dashboard/kpi-card"
import { mockVendorAnalytics, mockSuppliers } from "@/lib/mock-data"
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
import { ShoppingCart, DollarSign, Shield, Clock, Star, TrendingUp } from "lucide-react"

const COLORS = ["#0ea5e9", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"]

export default function VendorAnalyticsPage() {
  const supplierPerformance = mockSuppliers.map((supplier) => ({
    name: supplier.name,
    rating: supplier.rating,
    onTime: supplier.onTimeDelivery,
    orders: supplier.totalOrders,
  }))

  const categorySpending = [
    { name: "Vegetables", value: 35, amount: 5500 },
    { name: "Meat", value: 30, amount: 4700 },
    { name: "Bakery", value: 20, amount: 3100 },
    { name: "Dairy", value: 15, amount: 2370 },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Vendor Analytics</h1>
        <p className="text-muted-foreground">Track your purchasing performance and supplier relationships</p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        <KPICard
          title="Total Orders"
          value={mockVendorAnalytics.totalOrders}
          change={12.5}
          changeLabel="from last month"
          icon={<ShoppingCart className="h-4 w-4" />}
        />
        <KPICard
          title="Monthly Spend"
          value={`$${mockVendorAnalytics.monthlySpend.toLocaleString()}`}
          change={8.3}
          changeLabel="from last month"
          icon={<DollarSign className="h-4 w-4" />}
        />
        <KPICard
          title="Verification Rate"
          value={`${mockVendorAnalytics.verificationSuccess}%`}
          change={2.1}
          changeLabel="from last month"
          icon={<Shield className="h-4 w-4" />}
        />
        <KPICard
          title="Avg Delivery Time"
          value={`${mockVendorAnalytics.averageDeliveryTime} days`}
          change={-5.2}
          changeLabel="improvement"
          icon={<Clock className="h-4 w-4" />}
        />
        <KPICard
          title="Supplier Rating"
          value={`${mockVendorAnalytics.supplierRating}/5`}
          change={3.1}
          changeLabel="from last month"
          icon={<Star className="h-4 w-4" />}
        />
        <KPICard
          title="Growth Rate"
          value="15.2%"
          change={4.3}
          changeLabel="quarterly"
          icon={<TrendingUp className="h-4 w-4" />}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Monthly Spending */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Spending Trend</CardTitle>
            <CardDescription>Your purchasing spend over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockVendorAnalytics.monthlySpending}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, "Spending"]} />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#0ea5e9"
                  strokeWidth={3}
                  dot={{ fill: "#0ea5e9", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Verification Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Verification Performance</CardTitle>
            <CardDescription>Product verification success vs failures</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockVendorAnalytics.verificationStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="verified" fill="#10b981" name="Verified" />
                <Bar dataKey="failed" fill="#ef4444" name="Failed" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Spending */}
        <Card>
          <CardHeader>
            <CardTitle>Spending by Category</CardTitle>
            <CardDescription>Your purchasing distribution across product categories</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categorySpending}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categorySpending.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [`${value}%`, name]} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Supplier Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Supplier Performance</CardTitle>
            <CardDescription>Rating and on-time delivery performance</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={supplierPerformance} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip />
                <Bar dataKey="onTime" fill="#10b981" name="On-Time Delivery %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Supplier Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Supplier Analysis</CardTitle>
          <CardDescription>Detailed performance metrics for your suppliers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockSuppliers.map((supplier, index) => (
              <div key={supplier.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-lg font-medium text-primary">{supplier.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="font-medium">{supplier.name}</h3>
                    <p className="text-sm text-muted-foreground">{supplier.location}</p>
                    <div className="flex gap-2 mt-1">
                      {supplier.specialties.slice(0, 2).map((specialty) => (
                        <span key={specialty} className="text-xs bg-muted px-2 py-1 rounded">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-right space-y-2">
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="text-lg font-bold">{supplier.rating}</div>
                      <div className="text-xs text-muted-foreground">Rating</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold">{supplier.onTimeDelivery}%</div>
                      <div className="text-xs text-muted-foreground">On-Time</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold">{supplier.totalOrders}</div>
                      <div className="text-xs text-muted-foreground">Orders</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold">{supplier.qualityScore}</div>
                      <div className="text-xs text-muted-foreground">Quality</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
