import { useState } from "react";
import { Menu, X, Globe, User, LogOut, Settings, Heart, History } from "lucide-react";
import { Button } from "../components/ui/button";
import { useAuth } from "../auth/useAuth";
import { Link, useNavigate } from "react-router-dom";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    // Lấy user và isAuthenticated từ AuthContext
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    // Hàm bổ trợ lấy tên từ Email (Ví dụ: "quang@gmail.com" -> "quang")
    const getUserName = (email: string | undefined) => {
        if (!email) return "Người dùng";
        return email.split('@')[0];
    };

    return (
        <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
            <div className="section-padding">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
                        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                            <span className="text-primary-foreground font-bold text-sm">S</span>
                        </div>
                        <span className="text-xl font-bold text-foreground">StayVN</span>
                    </Link>

                    {/* Desktop nav */}
                    <div className="hidden md:flex items-center gap-8">
                        <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Khách sạn</a>
                        <a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Trọ thuê tháng</a>
                        <a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Khuyến mãi</a>
                    </div>

                    {/* Right side */}
                    <div className="hidden md:flex items-center gap-3">
                        <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
                            <Globe className="w-4 h-4" />
                            VI
                        </Button>

                        {isAuthenticated ? (
                            /* Đã đăng nhập: Hiển thị Avatar Dropdown dựa trên Email */
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className="outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-full transition-all">
                                        <Avatar className="h-9 w-9 border border-border">
                                            {/* Vì BE không trả về avatar, ta để trống để hiển thị Fallback */}
                                            <AvatarImage src="" alt={user?.email} />
                                            <AvatarFallback className="bg-primary/10 text-primary font-bold uppercase">
                                                {user?.email?.charAt(0)}
                                            </AvatarFallback>
                                        </Avatar>
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56 mt-2" align="end" forceMount>
                                    <DropdownMenuLabel className="font-normal">
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm font-bold leading-none">
                                                {getUserName(user?.email)}
                                            </p>
                                            <p className="text-xs leading-none text-muted-foreground">
                                                {user?.email}
                                            </p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="cursor-pointer gap-2">
                                        <User className="w-4 h-4" /> Hồ sơ cá nhân
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer gap-2">
                                        <History className="w-4 h-4" /> Lịch sử đặt phòng
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer gap-2">
                                        <Heart className="w-4 h-4" /> Yêu thích
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer gap-2 border-t mt-1 pt-1 text-destructive focus:text-destructive focus:bg-destructive/5" onClick={handleLogout}>
                                        <LogOut className="w-4 h-4" /> Đăng xuất
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            /* Chưa đăng nhập: Hiển thị nút Login/Register */
                            <div className="flex items-center gap-2">
                                <Button variant="ghost" size="sm" onClick={() => navigate("/login")}>
                                    Đăng nhập
                                </Button>
                                <Button size="sm" className="rounded-full bg-primary hover:bg-primary/90" onClick={() => navigate("/register")}>
                                    Đăng ký
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <button className="md:hidden p-2 text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
                        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile menu */}
                {mobileOpen && (
                    <div className="md:hidden py-4 border-t border-border animate-in slide-in-from-top duration-300">
                        <div className="flex flex-col gap-3">
                            <a href="#" className="text-sm font-medium py-2">Khách sạn</a>
                            <a href="#" className="text-sm font-medium py-2">Trọ thuê tháng</a>
                            <a href="#" className="text-sm font-medium py-2">Khuyến mãi</a>
                            <hr className="border-border my-1" />
                            {isAuthenticated ? (
                                <div className="space-y-3 px-2">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-primary">{getUserName(user?.email)}</span>
                                        <span className="text-xs text-muted-foreground">{user?.email}</span>
                                    </div>
                                    <Button variant="outline" className="w-full justify-start gap-2" onClick={handleLogout}>
                                        <LogOut className="w-4 h-4" /> Đăng xuất
                                    </Button>
                                </div>
                            ) : (
                                <Button size="sm" className="w-full rounded-full bg-primary" onClick={() => navigate("/login")}>
                                    Đăng nhập
                                </Button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;