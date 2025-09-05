"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { mockProducts } from "@/lib/mock-data"
import { QrCode, Download, Printer, Eye, Package } from "lucide-react"

export default function QRGeneratorPage() {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const [qrSize, setQrSize] = useState("medium")
  const [includeText, setIncludeText] = useState(true)

  const handleProductToggle = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    )
  }

  const handleSelectAll = () => {
    if (selectedProducts.length === mockProducts.length) {
      setSelectedProducts([])
    } else {
      setSelectedProducts(mockProducts.map((p) => p.id))
    }
  }

  const generateQRCodes = () => {
    // In a real app, this would generate actual QR codes
    console.log("Generating QR codes for products:", selectedProducts)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">QR Code Generator</h1>
          <p className="text-muted-foreground">Generate QR codes for product traceability and verification</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" disabled={selectedProducts.length === 0}>
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </Button>
          <Button disabled={selectedProducts.length === 0} onClick={generateQRCodes}>
            <QrCode className="mr-2 h-4 w-4" />
            Generate QR Codes
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Product Selection */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Select Products</CardTitle>
                  <CardDescription>Choose products to generate QR codes for</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={handleSelectAll}>
                  {selectedProducts.length === mockProducts.length ? "Deselect All" : "Select All"}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockProducts.map((product) => (
                  <div key={product.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                    <Checkbox
                      checked={selectedProducts.includes(product.id)}
                      onCheckedChange={() => handleProductToggle(product.id)}
                    />
                    <Package className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{product.name}</p>
                        <Badge variant={product.status === "active" ? "default" : "secondary"}>{product.status}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Batch: {product.batchId} • Stock: {product.stockLevel} units
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">${product.price}</p>
                      <p className="text-xs text-muted-foreground">{product.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* QR Code Settings */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>QR Code Settings</CardTitle>
              <CardDescription>Customize your QR code appearance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">QR Code Size</label>
                <Select value={qrSize} onValueChange={setQrSize}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small (100x100px)</SelectItem>
                    <SelectItem value="medium">Medium (200x200px)</SelectItem>
                    <SelectItem value="large">Large (300x300px)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="includeText" checked={includeText} onCheckedChange={setIncludeText} />
                <label htmlFor="includeText" className="text-sm font-medium">
                  Include product name below QR code
                </label>
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-medium mb-2">QR Code Preview</h4>
                <div className="bg-muted rounded-lg p-8 text-center">
                  <div className="w-32 h-32 bg-white border-2 border-dashed border-muted-foreground/30 rounded-lg mx-auto flex items-center justify-center">
                    <QrCode className="h-16 w-16 text-muted-foreground/50" />
                  </div>
                  {includeText && <p className="text-sm text-muted-foreground mt-2">Product Name</p>}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Download Options */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Download Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start bg-transparent"
                disabled={selectedProducts.length === 0}
              >
                <Download className="mr-2 h-4 w-4" />
                Download as PDF
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start bg-transparent"
                disabled={selectedProducts.length === 0}
              >
                <Download className="mr-2 h-4 w-4" />
                Download as PNG
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start bg-transparent"
                disabled={selectedProducts.length === 0}
              >
                <Printer className="mr-2 h-4 w-4" />
                Print QR Codes
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Selected Products Summary */}
      {selectedProducts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Selected Products Summary</CardTitle>
            <CardDescription>{selectedProducts.length} products selected for QR code generation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {selectedProducts.map((productId) => {
                const product = mockProducts.find((p) => p.id === productId)
                return product ? (
                  <Badge key={productId} variant="secondary">
                    {product.name} ({product.batchId})
                  </Badge>
                ) : null
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
