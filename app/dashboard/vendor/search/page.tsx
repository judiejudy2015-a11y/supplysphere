"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { mockProducts, mockSuppliers } from "@/lib/mock-data"
import { Search, Filter, Star, MapPin, ShoppingCart, Eye, Compass as Compare } from "lucide-react"

export default function ProductSearchPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [supplierFilter, setSupplierFilter] = useState("all")
  const [priceRange, setPriceRange] = useState("all")
  const [certificationFilter, setCertificationFilter] = useState<string[]>([])
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])

  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter
    const matchesSupplier = supplierFilter === "all" || product.supplier === supplierFilter
    const matchesPrice =
      priceRange === "all" ||
      (priceRange === "under-10" && product.price < 10) ||
      (priceRange === "10-25" && product.price >= 10 && product.price <= 25) ||
      (priceRange === "over-25" && product.price > 25)
    const matchesCertifications =
      certificationFilter.length === 0 || certificationFilter.some((cert) => product.certifications.includes(cert))

    return matchesSearch && matchesCategory && matchesSupplier && matchesPrice && matchesCertifications
  })

  const handleCertificationToggle = (certification: string) => {
    setCertificationFilter((prev) =>
      prev.includes(certification) ? prev.filter((c) => c !== certification) : [...prev, certification],
    )
  }

  const handleProductSelect = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    )
  }

  const getSupplierInfo = (supplierName: string) => {
    return mockSuppliers.find((s) => s.name === supplierName)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Product Search</h1>
          <p className="text-muted-foreground">Find and compare products from verified suppliers</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" disabled={selectedProducts.length < 2}>
            <Compare className="mr-2 h-4 w-4" />
            Compare ({selectedProducts.length})
          </Button>
          <Button disabled={selectedProducts.length === 0}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Filters Sidebar */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Search */}
            <div>
              <label className="text-sm font-medium mb-2 block">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="text-sm font-medium mb-2 block">Category</label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Vegetables">Vegetables</SelectItem>
                  <SelectItem value="Meat">Meat</SelectItem>
                  <SelectItem value="Bakery">Bakery</SelectItem>
                  <SelectItem value="Dairy">Dairy</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Supplier */}
            <div>
              <label className="text-sm font-medium mb-2 block">Supplier</label>
              <Select value={supplierFilter} onValueChange={setSupplierFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Suppliers</SelectItem>
                  {mockSuppliers.map((supplier) => (
                    <SelectItem key={supplier.id} value={supplier.name}>
                      {supplier.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Price Range */}
            <div>
              <label className="text-sm font-medium mb-2 block">Price Range</label>
              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="under-10">Under $10</SelectItem>
                  <SelectItem value="10-25">$10 - $25</SelectItem>
                  <SelectItem value="over-25">Over $25</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Certifications */}
            <div>
              <label className="text-sm font-medium mb-2 block">Certifications</label>
              <div className="space-y-2">
                {["Organic", "Non-GMO", "Fair Trade", "Grass-Fed", "Hormone-Free", "Artisan"].map((cert) => (
                  <div key={cert} className="flex items-center space-x-2">
                    <Checkbox
                      id={cert}
                      checked={certificationFilter.includes(cert)}
                      onCheckedChange={() => handleCertificationToggle(cert)}
                    />
                    <label htmlFor={cert} className="text-sm">
                      {cert}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full bg-transparent"
              onClick={() => {
                setSearchTerm("")
                setCategoryFilter("all")
                setSupplierFilter("all")
                setPriceRange("all")
                setCertificationFilter([])
              }}
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>

        {/* Products Grid */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Products</CardTitle>
                  <CardDescription>
                    {filteredProducts.length} of {mockProducts.length} products found
                  </CardDescription>
                </div>
                <Select defaultValue="relevance">
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {filteredProducts.map((product) => {
                  const supplier = getSupplierInfo(product.supplier)
                  const isSelected = selectedProducts.includes(product.id)

                  return (
                    <div
                      key={product.id}
                      className={`border rounded-lg p-4 transition-colors ${
                        isSelected ? "border-primary bg-primary/5" : "hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-medium text-sm mb-1">{product.name}</h3>
                          <p className="text-xs text-muted-foreground mb-2">{product.description}</p>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant={product.status === "active" ? "default" : "secondary"}>
                              {product.status}
                            </Badge>
                            <Badge variant="outline">{product.category}</Badge>
                          </div>
                        </div>
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => handleProductSelect(product.id)}
                          className="ml-2"
                        />
                      </div>

                      <div className="space-y-2 mb-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Price:</span>
                          <span className="font-medium">${product.price}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Stock:</span>
                          <span className={product.stockLevel > 50 ? "text-green-600" : "text-yellow-600"}>
                            {product.stockLevel} units
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Batch:</span>
                          <span className="font-mono text-xs">{product.batchId}</span>
                        </div>
                      </div>

                      {supplier && (
                        <div className="border-t pt-3 mb-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">{supplier.name}</span>
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 text-yellow-500 fill-current" />
                              <span className="text-xs">{supplier.rating}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            {supplier.location}
                          </div>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-1 mb-3">
                        {product.certifications.map((cert) => (
                          <Badge key={cert} variant="outline" className="text-xs">
                            {cert}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1">
                          <ShoppingCart className="mr-1 h-3 w-3" />
                          Order
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No products found</h3>
                  <p className="text-muted-foreground">Try adjusting your search criteria or filters</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
