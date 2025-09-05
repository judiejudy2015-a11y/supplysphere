"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { mockMarketTrends, mockAnalystAnalytics } from "@/lib/mock-data"
import { TrendingUp, TrendingDown, Search, Filter, Download, AlertCircle } from "lucide-react"

export default function MarketAnalysisPage() {
  const { marketVolatility, demandForecast, regionalPerformance } = mockAnalystAnalytics

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Market Analysis</h1>
          <p className="text-muted-foreground">Market trends, price analysis, and demand forecasting</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Market Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Market Volatility</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{marketVolatility}%</div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <AlertCircle className="h-3 w-3" />
              Moderate volatility
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Demand Forecast</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">{demandForecast}</div>
            <div className="flex items-center gap-1 text-sm text-green-600">
              <TrendingUp className="h-3 w-3" />
              Steady growth expected
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Markets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{regionalPerformance.length}</div>
            <div className="text-sm text-muted-foreground">Global regions</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Market Trends</CardTitle>
          <CardDescription>Real-time market data and price movements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search categories..." className="pl-10" />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          <div className="space-y-4">
            {mockMarketTrends.map((trend) => (
              <div key={trend.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div>
                    <div className="font-medium">{trend.category}</div>
                    <div className="text-sm text-muted-foreground">Volume: {trend.volume.toLocaleString()} units</div>
                  </div>
                  <Badge
                    variant={
                      trend.forecast === "bullish"
                        ? "default"
                        : trend.forecast === "bearish"
                          ? "destructive"
                          : "secondary"
                    }
                  >
                    {trend.forecast}
                  </Badge>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="font-medium">${trend.currentPrice}</div>
                    <div className="text-sm text-muted-foreground">from ${trend.previousPrice}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    {trend.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    ) : trend.trend === "down" ? (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    ) : (
                      <div className="h-4 w-4" />
                    )}
                    <div
                      className={`font-medium ${
                        trend.changePercent > 0
                          ? "text-green-600"
                          : trend.changePercent < 0
                            ? "text-red-600"
                            : "text-muted-foreground"
                      }`}
                    >
                      {trend.changePercent > 0 ? "+" : ""}
                      {trend.changePercent}%
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Regional Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Regional Performance</CardTitle>
          <CardDescription>Market performance across different regions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {regionalPerformance.map((region) => (
              <div key={region.region} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{region.region}</div>
                  <Badge variant="outline">{region.efficiency}% efficiency</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Volume</span>
                    <span>{region.volume.toLocaleString()} units</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${region.efficiency}%` }}
                    />
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
