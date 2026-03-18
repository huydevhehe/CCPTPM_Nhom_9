import { createContext, useState, useEffect } from "react"
import axiosClient from "../api/axiosClient"
import type { AuthContextType, User } from "../types/auth"

export const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const isAuthenticated = !!user;
    const login = async (email: string, password: string) => {
        const res = await axiosClient.post("/auth/login", {
            email,
            password
        })
        localStorage.setItem("token", res.data.token)
        const me = await axiosClient.get("/auth/me")
        setUser({ email: me.data })
    }

    // Thêm hàm register ở đây
    const register = async (name: string, email: string, password: string) => {
        await axiosClient.post("/auth/register", {
            name,
            email,
            password
        })
        // Không cần navigate ở đây, mình sẽ navigate ở trang Register.tsx
    }

    const logout = () => {
        localStorage.removeItem("token")
        setUser(null)
    }

    const fetchUser = async () => {
        try {
            const token = localStorage.getItem("token")
            if (!token) {
                setLoading(false)
                return
            }
            const res = await axiosClient.get("/auth/me")
            setUser({ email: res.data })
        } catch {
            logout()
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchUser()
    }, [])

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated, // Truyền xuống cho Navbar dùng
            login,
            register,
            logout,
            loading
        }}>
            {children}
        </AuthContext.Provider>
    )
}