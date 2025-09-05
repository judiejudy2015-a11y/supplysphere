export interface User {
  id: string
  name: string
  email: string
  role: "supplier" | "vendor" | "analyst" | "admin"
  avatar?: string
  preferences: {
    theme: "light" | "dark"
    notifications: boolean
  }
}

export const mockUsers: User[] = [
  {
    id: "1",
    email: "supplier@test.com",
    role: "supplier",
    name: "John Supplier",
    avatar: "/supplier-avatar.png",
    preferences: { theme: "light", notifications: true },
  },
  {
    id: "2",
    email: "vendor@test.com",
    role: "vendor",
    name: "Jane Vendor",
    avatar: "/vendor-avatar.png",
    preferences: { theme: "light", notifications: true },
  },
  {
    id: "3",
    email: "analyst@test.com",
    role: "analyst",
    name: "Mike Analyst",
    avatar: "/analyst-avatar.png",
    preferences: { theme: "dark", notifications: false },
  },
  {
    id: "4",
    email: "admin@test.com",
    role: "admin",
    name: "Admin User",
    avatar: "/admin-avatar.png",
    preferences: { theme: "dark", notifications: true },
  },
]

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  register: (email: string, password: string, name: string, role: User["role"]) => Promise<boolean>
}

// Mock authentication functions
export const authenticateUser = async (email: string, password: string): Promise<User | null> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const user = mockUsers.find((u) => u.email === email)
  if (user && password === "password") {
    return user
  }
  return null
}

export const registerUser = async (
  email: string,
  password: string,
  name: string,
  role: User["role"],
): Promise<User | null> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Check if user already exists
  if (mockUsers.find((u) => u.email === email)) {
    return null
  }

  const newUser: User = {
    id: Date.now().toString(),
    email,
    name,
    role,
    preferences: { theme: "light", notifications: true },
  }

  mockUsers.push(newUser)
  return newUser
}
