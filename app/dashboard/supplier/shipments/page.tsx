"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockShipments } from "@/lib/mock-data"
import { Search, Plus, Truck, CheckCircle, Clock, AlertTriangle, MapPin } from "lucide-react"

export default function ShipmentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredShipments = mockShipments.filter((shipment) => {
    const matchesSearch =
      shipment.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.destination.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || shipment.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "in_transit":
        return <Truck className="h-4 w-4 text-blue-500" />
      case "delayed":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-gray-500" />
      default:
        return <Truck className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "delivered":
        return <Badge variant="default">Delivered</Badge>
      case "in_transit":
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            In Transit
          </Badge>
        )
      case "delayed":
        return <Badge variant="destructive">Delayed</Badge>
      case "pending":
        return <Badge variant="outline">Pending</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Shipments</h1>
          <p className="text-muted-foreground">Track and manage your product shipments</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Shipment
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-muted-foreground">Pending</span>
            </div>
            <div className="text-2xl font-bold mt-2">{mockShipments.filter((s) => s.status === "pending").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium text-muted-foreground">In Transit</span>
            </div>
            <div className="text-2xl font-bold mt-2">
              {mockShipments.filter((s) => s.status === "in_transit").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium text-muted-foreground">Delivered</span>
            </div>
            <div className="text-2xl font-bold mt-2">
              {mockShipments.filter((s) => s.status === "delivered").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium text-muted-foreground">Delayed</span>
            </div>
            <div className="text-2xl font-bold mt-2">{mockShipments.filter((s) => s.status === "delayed").length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 flex-wrap">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search shipments, tracking numbers, or destinations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in_transit">In Transit</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="delayed">Delayed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Shipments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Shipment Tracking</CardTitle>
          <CardDescription>
            {filteredShipments.length} of {mockShipments.length} shipments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Tracking Number</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Route</TableHead>
                <TableHead>Carrier</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Estimated Arrival</TableHead>
                <TableHead>Conditions</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredShipments.map((shipment) => (
                <TableRow key={shipment.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {getStatusIcon(shipment.status)}
                      <div>
                        <p className="font-medium">{shipment.productName}</p>
                        <p className="text-sm text-muted-foreground">ID: {shipment.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{shipment.trackingNumber}</TableCell>
                  <TableCell>{getStatusBadge(shipment.status)}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <MapPin className="h-3 w-3" />
                        <span className="text-muted-foreground">From:</span>
                        <span>{shipment.origin}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <MapPin className="h-3 w-3" />
                        <span className="text-muted-foreground">To:</span>
                        <span>{shipment.destination}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{shipment.carrier}</TableCell>
                  <TableCell>{shipment.quantity} units</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">
                        {shipment.status === "delivered" && shipment.actualArrival
                          ? shipment.actualArrival.toLocaleDateString()
                          : shipment.estimatedArrival.toLocaleDateString()}
                      </div>
                      {shipment.status === "delivered" && shipment.actualArrival && (
                        <div className="text-xs text-green-600">
                          Delivered {shipment.actualArrival.toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {shipment.temperature !== undefined && (
                      <div className="space-y-1">
                        <div className="text-sm">
                          <span className="text-muted-foreground">Temp:</span> {shipment.temperature}°C
                        </div>
                        {shipment.humidity && (
                          <div className="text-sm">
                            <span className="text-muted-foreground">Humidity:</span> {shipment.humidity}%
                          </div>
                        )}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        Track
                      </Button>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
