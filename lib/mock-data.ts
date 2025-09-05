export interface Product {
  id: string
  name: string
  description: string
  batchId: string
  productionDate: Date
  expiryDate: Date
  supplier: string
  category: string
  status: "active" | "expired" | "recalled"
  qrCode: string
  price: number
  stockLevel: number
  certifications: string[]
  blockchainHash: string
}

export interface Shipment {
  id: string
  productId: string
  productName: string
  status: "pending" | "in_transit" | "delivered" | "delayed"
  origin: string
  destination: string
  estimatedArrival: Date
  actualArrival?: Date
  carrier: string
  trackingNumber: string
  temperature?: number
  humidity?: number
  quantity: number
}

export interface BlockchainEntry {
  id: string
  timestamp: Date
  action: string
  location: string
  hash: string
}

export interface Order {
  id: string
  supplierId: string
  supplierName: string
  productId: string
  productName: string
  quantity: number
  unitPrice: number
  totalPrice: number
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled"
  orderDate: Date
  expectedDelivery: Date
  actualDelivery?: Date
  notes?: string
}

export interface Verification {
  id: string
  productId: string
  productName: string
  batchId: string
  qrCode: string
  verificationDate: Date
  status: "verified" | "failed" | "suspicious"
  blockchainHash: string
  verifiedBy: string
  location: string
  temperature?: number
  humidity?: number
  notes?: string
}

export interface Supplier {
  id: string
  name: string
  rating: number
  totalOrders: number
  onTimeDelivery: number
  qualityScore: number
  location: string
  specialties: string[]
  certifications: string[]
  contactEmail: string
  contactPhone: string
}

// Analyst-specific interfaces
export interface MarketTrend {
  id: string
  category: string
  trend: "up" | "down" | "stable"
  changePercent: number
  currentPrice: number
  previousPrice: number
  volume: number
  forecast: "bullish" | "bearish" | "neutral"
}

export interface SupplyChainMetric {
  id: string
  metric: string
  value: number
  unit: string
  trend: "up" | "down" | "stable"
  changePercent: number
  benchmark: number
  status: "good" | "warning" | "critical"
}

export interface NetworkNode {
  id: string
  name: string
  type: "supplier" | "warehouse" | "retailer" | "customer"
  location: { lat: number; lng: number }
  connections: string[]
  throughput: number
  efficiency: number
}

// Admin-specific interfaces
export interface User {
  id: string
  name: string
  email: string
  role: "supplier" | "vendor" | "analyst" | "admin"
  status: "active" | "inactive" | "suspended"
  lastLogin: Date
  createdDate: Date
  avatar?: string
  department?: string
  permissions: string[]
}

export interface SystemMetric {
  id: string
  name: string
  value: number
  unit: string
  status: "healthy" | "warning" | "critical"
  trend: "up" | "down" | "stable"
  changePercent: number
}

export interface AuditLog {
  id: string
  userId: string
  userName: string
  action: string
  resource: string
  timestamp: Date
  ipAddress: string
  userAgent: string
  status: "success" | "failed" | "warning"
  details?: string
}

// Mock Products Data
export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Organic Tomatoes",
    description: "Fresh organic tomatoes from local farms",
    batchId: "TOM-2024-001",
    productionDate: new Date("2024-01-15"),
    expiryDate: new Date("2024-02-15"),
    supplier: "Green Valley Farms",
    category: "Vegetables",
    status: "active",
    qrCode: "QR-TOM-001",
    price: 4.99,
    stockLevel: 150,
    certifications: ["Organic", "Non-GMO"],
    blockchainHash: "0x1a2b3c4d5e6f7g8h9i0j",
  },
  {
    id: "2",
    name: "Premium Beef",
    description: "Grass-fed premium beef cuts",
    batchId: "BEEF-2024-002",
    productionDate: new Date("2024-01-10"),
    expiryDate: new Date("2024-01-25"),
    supplier: "Ranch Prime",
    category: "Meat",
    status: "active",
    qrCode: "QR-BEEF-002",
    price: 24.99,
    stockLevel: 75,
    certifications: ["Grass-Fed", "Hormone-Free"],
    blockchainHash: "0x2b3c4d5e6f7g8h9i0j1k",
  },
  {
    id: "3",
    name: "Artisan Bread",
    description: "Handcrafted sourdough bread",
    batchId: "BREAD-2024-003",
    productionDate: new Date("2024-01-20"),
    expiryDate: new Date("2024-01-27"),
    supplier: "Artisan Bakery",
    category: "Bakery",
    status: "active",
    qrCode: "QR-BREAD-003",
    price: 6.99,
    stockLevel: 200,
    certifications: ["Artisan", "No Preservatives"],
    blockchainHash: "0x3c4d5e6f7g8h9i0j1k2l",
  },
  {
    id: "4",
    name: "Expired Milk",
    description: "Organic whole milk",
    batchId: "MILK-2024-004",
    productionDate: new Date("2024-01-01"),
    expiryDate: new Date("2024-01-15"),
    supplier: "Dairy Fresh",
    category: "Dairy",
    status: "expired",
    qrCode: "QR-MILK-004",
    price: 3.99,
    stockLevel: 0,
    certifications: ["Organic"],
    blockchainHash: "0x4d5e6f7g8h9i0j1k2l3m",
  },
]

// Mock Shipments Data
export const mockShipments: Shipment[] = [
  {
    id: "SH-001",
    productId: "1",
    productName: "Organic Tomatoes",
    status: "in_transit",
    origin: "Green Valley Farms, CA",
    destination: "Fresh Market, NY",
    estimatedArrival: new Date("2024-01-25"),
    carrier: "FreshLogistics",
    trackingNumber: "FL123456789",
    temperature: 4,
    humidity: 85,
    quantity: 100,
  },
  {
    id: "SH-002",
    productId: "2",
    productName: "Premium Beef",
    status: "delivered",
    origin: "Ranch Prime, TX",
    destination: "Gourmet Butcher, FL",
    estimatedArrival: new Date("2024-01-20"),
    actualArrival: new Date("2024-01-19"),
    carrier: "ColdChain Express",
    trackingNumber: "CCE987654321",
    temperature: -2,
    humidity: 75,
    quantity: 50,
  },
  {
    id: "SH-003",
    productId: "3",
    productName: "Artisan Bread",
    status: "pending",
    origin: "Artisan Bakery, OR",
    destination: "Local Cafe, WA",
    estimatedArrival: new Date("2024-01-26"),
    carrier: "Quick Delivery",
    trackingNumber: "QD456789123",
    quantity: 75,
  },
  {
    id: "SH-004",
    productId: "1",
    productName: "Organic Tomatoes",
    status: "delayed",
    origin: "Green Valley Farms, CA",
    destination: "Organic Store, NV",
    estimatedArrival: new Date("2024-01-24"),
    carrier: "FreshLogistics",
    trackingNumber: "FL789123456",
    temperature: 6,
    humidity: 90,
    quantity: 80,
  },
]

// Mock Orders Data
export const mockOrders: Order[] = [
  {
    id: "ORD-001",
    supplierId: "SUP-001",
    supplierName: "Green Valley Farms",
    productId: "1",
    productName: "Organic Tomatoes",
    quantity: 100,
    unitPrice: 4.99,
    totalPrice: 499.0,
    status: "delivered",
    orderDate: new Date("2024-01-15"),
    expectedDelivery: new Date("2024-01-20"),
    actualDelivery: new Date("2024-01-19"),
    notes: "High quality batch, excellent condition",
  },
  {
    id: "ORD-002",
    supplierId: "SUP-002",
    supplierName: "Ranch Prime",
    productId: "2",
    productName: "Premium Beef",
    quantity: 50,
    unitPrice: 24.99,
    totalPrice: 1249.5,
    status: "shipped",
    orderDate: new Date("2024-01-18"),
    expectedDelivery: new Date("2024-01-25"),
    notes: "Temperature controlled shipping required",
  },
  {
    id: "ORD-003",
    supplierId: "SUP-003",
    supplierName: "Artisan Bakery",
    productId: "3",
    productName: "Artisan Bread",
    quantity: 75,
    unitPrice: 6.99,
    totalPrice: 524.25,
    status: "confirmed",
    orderDate: new Date("2024-01-20"),
    expectedDelivery: new Date("2024-01-22"),
  },
  {
    id: "ORD-004",
    supplierId: "SUP-001",
    supplierName: "Green Valley Farms",
    productId: "1",
    productName: "Organic Tomatoes",
    quantity: 200,
    unitPrice: 4.99,
    totalPrice: 998.0,
    status: "pending",
    orderDate: new Date("2024-01-21"),
    expectedDelivery: new Date("2024-01-28"),
    notes: "Rush order for weekend promotion",
  },
]

// Mock Verifications Data
export const mockVerifications: Verification[] = [
  {
    id: "VER-001",
    productId: "1",
    productName: "Organic Tomatoes",
    batchId: "TOM-2024-001",
    qrCode: "QR-TOM-001",
    verificationDate: new Date("2024-01-19"),
    status: "verified",
    blockchainHash: "0x1a2b3c4d5e6f7g8h9i0j",
    verifiedBy: "Jane Vendor",
    location: "Fresh Market, NY",
    temperature: 4,
    humidity: 85,
    notes: "All certifications valid, product authentic",
  },
  {
    id: "VER-002",
    productId: "2",
    productName: "Premium Beef",
    batchId: "BEEF-2024-002",
    qrCode: "QR-BEEF-002",
    verificationDate: new Date("2024-01-20"),
    status: "verified",
    blockchainHash: "0x2b3c4d5e6f7g8h9i0j1k",
    verifiedBy: "Jane Vendor",
    location: "Fresh Market, NY",
    temperature: -2,
    humidity: 75,
    notes: "Grass-fed certification confirmed",
  },
  {
    id: "VER-003",
    productId: "4",
    productName: "Suspicious Milk",
    batchId: "MILK-2024-005",
    qrCode: "QR-MILK-005",
    verificationDate: new Date("2024-01-21"),
    status: "suspicious",
    blockchainHash: "0x5e6f7g8h9i0j1k2l3m4n",
    verifiedBy: "Jane Vendor",
    location: "Fresh Market, NY",
    notes: "Blockchain hash mismatch detected",
  },
]

// Mock Suppliers Data
export const mockSuppliers: Supplier[] = [
  {
    id: "SUP-001",
    name: "Green Valley Farms",
    rating: 4.8,
    totalOrders: 156,
    onTimeDelivery: 94.2,
    qualityScore: 4.7,
    location: "California, USA",
    specialties: ["Organic Vegetables", "Fruits", "Herbs"],
    certifications: ["USDA Organic", "Non-GMO", "Fair Trade"],
    contactEmail: "orders@greenvalleyfarms.com",
    contactPhone: "+1 (555) 123-4567",
  },
  {
    id: "SUP-002",
    name: "Ranch Prime",
    rating: 4.6,
    totalOrders: 89,
    onTimeDelivery: 91.5,
    qualityScore: 4.8,
    location: "Texas, USA",
    specialties: ["Premium Beef", "Grass-Fed Meat", "Poultry"],
    certifications: ["Grass-Fed", "Hormone-Free", "Animal Welfare"],
    contactEmail: "sales@ranchprime.com",
    contactPhone: "+1 (555) 234-5678",
  },
  {
    id: "SUP-003",
    name: "Artisan Bakery",
    rating: 4.9,
    totalOrders: 234,
    onTimeDelivery: 96.8,
    qualityScore: 4.9,
    location: "Oregon, USA",
    specialties: ["Artisan Bread", "Pastries", "Gluten-Free"],
    certifications: ["Artisan", "No Preservatives", "Local Sourced"],
    contactEmail: "hello@artisanbakery.com",
    contactPhone: "+1 (555) 345-6789",
  },
]

// Mock Market Trends Data
export const mockMarketTrends: MarketTrend[] = [
  {
    id: "MT-001",
    category: "Organic Vegetables",
    trend: "up",
    changePercent: 8.5,
    currentPrice: 4.99,
    previousPrice: 4.6,
    volume: 15670,
    forecast: "bullish",
  },
  {
    id: "MT-002",
    category: "Premium Meat",
    trend: "down",
    changePercent: -3.2,
    currentPrice: 24.99,
    previousPrice: 25.81,
    volume: 8920,
    forecast: "bearish",
  },
  {
    id: "MT-003",
    category: "Artisan Bakery",
    trend: "stable",
    changePercent: 1.1,
    currentPrice: 6.99,
    previousPrice: 6.91,
    volume: 12340,
    forecast: "neutral",
  },
  {
    id: "MT-004",
    category: "Dairy Products",
    trend: "up",
    changePercent: 5.7,
    currentPrice: 3.99,
    previousPrice: 3.77,
    volume: 23450,
    forecast: "bullish",
  },
]

// Mock Supply Chain Metrics
export const mockSupplyChainMetrics: SupplyChainMetric[] = [
  {
    id: "SCM-001",
    metric: "Average Delivery Time",
    value: 3.2,
    unit: "days",
    trend: "down",
    changePercent: -8.5,
    benchmark: 3.5,
    status: "good",
  },
  {
    id: "SCM-002",
    metric: "On-Time Delivery Rate",
    value: 94.2,
    unit: "%",
    trend: "up",
    changePercent: 2.1,
    benchmark: 95.0,
    status: "warning",
  },
  {
    id: "SCM-003",
    metric: "Quality Score",
    value: 4.7,
    unit: "/5",
    trend: "stable",
    changePercent: 0.5,
    benchmark: 4.5,
    status: "good",
  },
  {
    id: "SCM-004",
    metric: "Cost Efficiency",
    value: 87.3,
    unit: "%",
    trend: "up",
    changePercent: 4.2,
    benchmark: 85.0,
    status: "good",
  },
]

// Mock Network Nodes
export const mockNetworkNodes: NetworkNode[] = [
  {
    id: "N-001",
    name: "Green Valley Farms",
    type: "supplier",
    location: { lat: 36.7783, lng: -119.4179 },
    connections: ["N-003", "N-004"],
    throughput: 1500,
    efficiency: 94.2,
  },
  {
    id: "N-002",
    name: "Ranch Prime",
    type: "supplier",
    location: { lat: 31.9686, lng: -99.9018 },
    connections: ["N-003", "N-005"],
    throughput: 800,
    efficiency: 91.5,
  },
  {
    id: "N-003",
    name: "Central Warehouse",
    type: "warehouse",
    location: { lat: 39.8283, lng: -98.5795 },
    connections: ["N-001", "N-002", "N-006", "N-007"],
    throughput: 2500,
    efficiency: 88.7,
  },
  {
    id: "N-004",
    name: "West Coast Distribution",
    type: "warehouse",
    location: { lat: 34.0522, lng: -118.2437 },
    connections: ["N-001", "N-008"],
    throughput: 1200,
    efficiency: 92.1,
  },
]

// Mock Users Data
export const mockUsers: User[] = [
  {
    id: "USR-001",
    name: "John Supplier",
    email: "john@supplysphere.com",
    role: "supplier",
    status: "active",
    lastLogin: new Date("2024-01-21T10:30:00"),
    createdDate: new Date("2023-12-01"),
    avatar: "/supplier-avatar.png",
    department: "Production",
    permissions: ["products:read", "products:write", "shipments:read", "shipments:write"],
  },
  {
    id: "USR-002",
    name: "Jane Vendor",
    email: "jane@supplysphere.com",
    role: "vendor",
    status: "active",
    lastLogin: new Date("2024-01-21T14:15:00"),
    createdDate: new Date("2023-11-15"),
    avatar: "/vendor-avatar.png",
    department: "Procurement",
    permissions: ["orders:read", "orders:write", "verification:read", "verification:write"],
  },
  {
    id: "USR-003",
    name: "Sarah Analyst",
    email: "sarah@supplysphere.com",
    role: "analyst",
    status: "active",
    lastLogin: new Date("2024-01-21T09:45:00"),
    createdDate: new Date("2023-10-20"),
    department: "Analytics",
    permissions: ["analytics:read", "reports:read", "reports:write", "market:read"],
  },
  {
    id: "USR-004",
    name: "Mike Admin",
    email: "mike@supplysphere.com",
    role: "admin",
    status: "active",
    lastLogin: new Date("2024-01-21T08:00:00"),
    createdDate: new Date("2023-09-01"),
    department: "IT Administration",
    permissions: ["*"],
  },
  {
    id: "USR-005",
    name: "Lisa Vendor",
    email: "lisa@supplysphere.com",
    role: "vendor",
    status: "suspended",
    lastLogin: new Date("2024-01-18T16:20:00"),
    createdDate: new Date("2023-12-10"),
    department: "Procurement",
    permissions: [],
  },
]

// Mock System Metrics
export const mockSystemMetrics: SystemMetric[] = [
  {
    id: "SYS-001",
    name: "CPU Usage",
    value: 67.5,
    unit: "%",
    status: "healthy",
    trend: "stable",
    changePercent: 2.1,
  },
  {
    id: "SYS-002",
    name: "Memory Usage",
    value: 84.2,
    unit: "%",
    status: "warning",
    trend: "up",
    changePercent: 8.7,
  },
  {
    id: "SYS-003",
    name: "Database Connections",
    value: 156,
    unit: "",
    status: "healthy",
    trend: "stable",
    changePercent: -1.2,
  },
  {
    id: "SYS-004",
    name: "API Response Time",
    value: 245,
    unit: "ms",
    status: "healthy",
    trend: "down",
    changePercent: -12.5,
  },
  {
    id: "SYS-005",
    name: "Storage Usage",
    value: 72.8,
    unit: "%",
    status: "healthy",
    trend: "up",
    changePercent: 5.3,
  },
  {
    id: "SYS-006",
    name: "Active Sessions",
    value: 89,
    unit: "",
    status: "healthy",
    trend: "up",
    changePercent: 15.2,
  },
]

// Mock Audit Logs
export const mockAuditLogs: AuditLog[] = [
  {
    id: "AUD-001",
    userId: "USR-001",
    userName: "John Supplier",
    action: "CREATE_PRODUCT",
    resource: "products/PRD-123",
    timestamp: new Date("2024-01-21T10:30:00"),
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    status: "success",
    details: "Created new product: Organic Tomatoes",
  },
  {
    id: "AUD-002",
    userId: "USR-002",
    userName: "Jane Vendor",
    action: "VERIFY_PRODUCT",
    resource: "verifications/VER-456",
    timestamp: new Date("2024-01-21T14:15:00"),
    ipAddress: "192.168.1.101",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    status: "success",
    details: "Verified product authenticity via QR code scan",
  },
  {
    id: "AUD-003",
    userId: "USR-005",
    userName: "Lisa Vendor",
    action: "LOGIN_ATTEMPT",
    resource: "auth/login",
    timestamp: new Date("2024-01-21T16:20:00"),
    ipAddress: "192.168.1.102",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15",
    status: "failed",
    details: "Account suspended - login denied",
  },
  {
    id: "AUD-004",
    userId: "USR-003",
    userName: "Sarah Analyst",
    action: "GENERATE_REPORT",
    resource: "reports/RPT-789",
    timestamp: new Date("2024-01-21T09:45:00"),
    ipAddress: "192.168.1.103",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    status: "success",
    details: "Generated monthly supply chain performance report",
  },
  {
    id: "AUD-005",
    userId: "USR-004",
    userName: "Mike Admin",
    action: "UPDATE_USER_PERMISSIONS",
    resource: "users/USR-005",
    timestamp: new Date("2024-01-21T08:00:00"),
    ipAddress: "192.168.1.104",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    status: "success",
    details: "Suspended user account due to policy violation",
  },
]

// Analytics Mock Data
export const mockAnalytics = {
  totalProducts: 156,
  activeShipments: 23,
  deliveredThisMonth: 89,
  revenue: 45670,
  revenueGrowth: 12.5,
  deliverySuccess: 94.2,
  averageDeliveryTime: 3.2,
  customerSatisfaction: 4.7,
  monthlyRevenue: [
    { month: "Jan", revenue: 45670 },
    { month: "Feb", revenue: 52340 },
    { month: "Mar", revenue: 48920 },
    { month: "Apr", revenue: 61250 },
    { month: "May", revenue: 58730 },
    { month: "Jun", revenue: 67890 },
  ],
  deliveryMetrics: [
    { day: "Mon", delivered: 12, delayed: 2 },
    { day: "Tue", delivered: 15, delayed: 1 },
    { day: "Wed", delivered: 18, delayed: 3 },
    { day: "Thu", delivered: 14, delayed: 1 },
    { day: "Fri", delivered: 20, delayed: 2 },
    { day: "Sat", delivered: 16, delayed: 0 },
    { day: "Sun", delivered: 10, delayed: 1 },
  ],
}

// Vendor Analytics Mock Data
export const mockVendorAnalytics = {
  totalOrders: 89,
  pendingOrders: 12,
  monthlySpend: 15670,
  verificationSuccess: 96.8,
  averageDeliveryTime: 2.8,
  supplierRating: 4.7,
  monthlySpending: [
    { month: "Jan", amount: 15670 },
    { month: "Feb", amount: 18340 },
    { month: "Mar", amount: 16920 },
    { month: "Apr", amount: 21250 },
    { month: "May", amount: 19730 },
    { month: "Jun", amount: 23890 },
  ],
  verificationStats: [
    { day: "Mon", verified: 15, failed: 1 },
    { day: "Tue", verified: 18, failed: 0 },
    { day: "Wed", verified: 22, failed: 2 },
    { day: "Thu", verified: 19, failed: 1 },
    { day: "Fri", verified: 25, failed: 1 },
    { day: "Sat", verified: 20, failed: 0 },
    { day: "Sun", verified: 12, failed: 0 },
  ],
}

// Analyst Analytics Mock Data
export const mockAnalystAnalytics = {
  totalSuppliers: 156,
  totalVendors: 89,
  totalProducts: 1247,
  totalShipments: 3456,
  networkEfficiency: 91.3,
  costSavings: 234567,
  riskScore: 23,
  complianceRate: 97.8,
  marketVolatility: 15.6,
  demandForecast: "stable",
  supplyChainHealth: [
    { category: "Suppliers", score: 94.2, status: "excellent" },
    { category: "Logistics", score: 87.5, status: "good" },
    { category: "Quality", score: 96.1, status: "excellent" },
    { category: "Compliance", score: 89.3, status: "good" },
    { category: "Cost", score: 91.7, status: "excellent" },
  ],
  regionalPerformance: [
    { region: "North America", efficiency: 94.2, volume: 45670 },
    { region: "Europe", efficiency: 91.8, volume: 38920 },
    { region: "Asia Pacific", efficiency: 88.5, volume: 52340 },
    { region: "Latin America", efficiency: 86.3, volume: 23450 },
  ],
  monthlyTrends: [
    { month: "Jan", efficiency: 89.2, cost: 234567, quality: 4.6 },
    { month: "Feb", efficiency: 91.1, cost: 245890, quality: 4.7 },
    { month: "Mar", efficiency: 88.7, cost: 256780, quality: 4.5 },
    { month: "Apr", efficiency: 92.3, cost: 243210, quality: 4.8 },
    { month: "May", efficiency: 94.1, cost: 238900, quality: 4.9 },
    { month: "Jun", efficiency: 91.3, cost: 251670, quality: 4.7 },
  ],
}

// Admin Analytics Mock Data
export const mockAdminAnalytics = {
  totalUsers: mockUsers.length,
  activeUsers: mockUsers.filter((u) => u.status === "active").length,
  totalTransactions: 15670,
  systemUptime: 99.8,
  dataProcessed: 2.4,
  securityAlerts: 3,
  userGrowth: [
    { month: "Jan", users: 45, active: 42 },
    { month: "Feb", users: 52, active: 48 },
    { month: "Mar", users: 48, active: 45 },
    { month: "Apr", users: 61, active: 58 },
    { month: "May", users: 58, active: 55 },
    { month: "Jun", users: 67, active: 63 },
  ],
  roleDistribution: [
    { role: "Supplier", count: mockUsers.filter((u) => u.role === "supplier").length },
    { role: "Vendor", count: mockUsers.filter((u) => u.role === "vendor").length },
    { role: "Analyst", count: mockUsers.filter((u) => u.role === "analyst").length },
    { role: "Admin", count: mockUsers.filter((u) => u.role === "admin").length },
  ],
  systemHealth: [
    { component: "API Gateway", status: "healthy", uptime: 99.9 },
    { component: "Database", status: "healthy", uptime: 99.8 },
    { component: "Authentication", status: "healthy", uptime: 100.0 },
    { component: "File Storage", status: "warning", uptime: 98.5 },
    { component: "Analytics Engine", status: "healthy", uptime: 99.7 },
  ],
}
