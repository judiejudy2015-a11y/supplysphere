"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { mockVerifications } from "@/lib/mock-data"
import { Scan, Shield, CheckCircle, AlertTriangle, X, Search, Camera, Upload } from "lucide-react"

export default function VerifyPage() {
  const [qrCode, setQrCode] = useState("")
  const [verificationResult, setVerificationResult] = useState<any>(null)
  const [isScanning, setIsScanning] = useState(false)

  const handleVerify = () => {
    setIsScanning(true)
    // Simulate verification process
    setTimeout(() => {
      // Mock verification result
      const mockResult = {
        success: true,
        product: {
          name: "Organic Tomatoes",
          batchId: "TOM-2024-001",
          supplier: "Green Valley Farms",
          productionDate: "2024-01-15",
          expiryDate: "2024-02-15",
          certifications: ["Organic", "Non-GMO"],
        },
        blockchain: {
          hash: "0x1a2b3c4d5e6f7g8h9i0j",
          verified: true,
          timestamp: new Date().toISOString(),
        },
        conditions: {
          temperature: 4,
          humidity: 85,
        },
      }
      setVerificationResult(mockResult)
      setIsScanning(false)
    }, 2000)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "failed":
        return <X className="h-4 w-4 text-red-500" />
      case "suspicious":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      default:
        return <Shield className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return <Badge variant="default">Verified</Badge>
      case "failed":
        return <Badge variant="destructive">Failed</Badge>
      case "suspicious":
        return (
          <Badge variant="outline" className="text-yellow-600 border-yellow-600">
            Suspicious
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Product Verification</h1>
        <p className="text-muted-foreground">Verify product authenticity using QR codes and blockchain technology</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* QR Code Scanner */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scan className="h-5 w-5" />
              QR Code Scanner
            </CardTitle>
            <CardDescription>Scan or enter QR code to verify product authenticity</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">QR Code</label>
              <Input
                placeholder="Enter QR code or scan using camera"
                value={qrCode}
                onChange={(e) => setQrCode(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={handleVerify} disabled={!qrCode || isScanning} className="flex-1">
                {isScanning ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <Shield className="mr-2 h-4 w-4" />
                    Verify Product
                  </>
                )}
              </Button>
              <Button variant="outline">
                <Camera className="mr-2 h-4 w-4" />
                Scan
              </Button>
              <Button variant="outline">
                <Upload className="h-4 w-4" />
              </Button>
            </div>

            {/* Camera Preview Placeholder */}
            <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-8 text-center">
              <Camera className="h-12 w-12 text-muted-foreground/50 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Camera preview will appear here</p>
            </div>
          </CardContent>
        </Card>

        {/* Verification Result */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Verification Result
            </CardTitle>
            <CardDescription>Product authenticity and blockchain verification status</CardDescription>
          </CardHeader>
          <CardContent>
            {verificationResult ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="font-medium text-green-800">Product Verified Successfully</span>
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium mb-2">Product Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Name:</span>
                        <span>{verificationResult.product.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Batch ID:</span>
                        <span className="font-mono">{verificationResult.product.batchId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Supplier:</span>
                        <span>{verificationResult.product.supplier}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Production:</span>
                        <span>{verificationResult.product.productionDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Expiry:</span>
                        <span>{verificationResult.product.expiryDate}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Blockchain Verification</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status:</span>
                        <Badge variant="default">Verified</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Hash:</span>
                        <span className="font-mono text-xs">{verificationResult.blockchain.hash}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Current Conditions</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Temperature:</span>
                        <span>{verificationResult.conditions.temperature}°C</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Humidity:</span>
                        <span>{verificationResult.conditions.humidity}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {verificationResult.product.certifications.map((cert: string) => (
                      <Badge key={cert} variant="outline">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Notes (Optional)</label>
                  <Textarea placeholder="Add verification notes..." rows={3} />
                </div>

                <Button className="w-full">Save Verification Record</Button>
              </div>
            ) : (
              <div className="text-center py-8">
                <Shield className="h-12 w-12 text-muted-foreground/50 mx-auto mb-2" />
                <p className="text-muted-foreground">Scan a QR code to verify product authenticity</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Verification History */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Verification History</CardTitle>
              <CardDescription>Recent product verification records</CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search verifications..." className="pl-10 w-64" />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Batch ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Verification Date</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Conditions</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockVerifications.map((verification) => (
                <TableRow key={verification.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {getStatusIcon(verification.status)}
                      <div>
                        <p className="font-medium">{verification.productName}</p>
                        <p className="text-sm text-muted-foreground">ID: {verification.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{verification.batchId}</TableCell>
                  <TableCell>{getStatusBadge(verification.status)}</TableCell>
                  <TableCell>{verification.verificationDate.toLocaleDateString()}</TableCell>
                  <TableCell>{verification.location}</TableCell>
                  <TableCell>
                    {verification.temperature !== undefined && (
                      <div className="text-sm">
                        <div>Temp: {verification.temperature}°C</div>
                        {verification.humidity && <div>Humidity: {verification.humidity}%</div>}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
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
