import { useNavigate, Link } from "react-router-dom";
import { useRestaurant } from "@/contexts/RestaurantContext";
import { Button } from "@/components/ui/button";
import {
    LogOut,
    User,
    History,
    Utensils,
    Home,
    ChefHat
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const CustomerNavbar = () => {
    const { currentUser, logout } = useRestaurant();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg">
                        <Utensils className="h-5 w-5" />
                    </div>
                    <div>
                        <span className="text-xl font-bold font-serif leading-none block">Savory Spirits</span>
                        <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Restaurant</span>
                    </div>
                </Link>

                {/* Navigation Links */}
                <nav className="hidden md:flex items-center gap-6 mx-8">
                    <Link to="/" className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-2">
                        <Home className="h-4 w-4" /> Home
                    </Link>
                    <Link to="/menu" className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-2">
                        <Utensils className="h-4 w-4" /> Menu
                    </Link>
                    {currentUser && (
                        <Link to="/history" className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-2">
                            <History className="h-4 w-4" /> My Orders
                        </Link>
                    )}
                </nav>

                {/* User Menu */}
                <div className="flex items-center gap-4">
                    {currentUser ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-10 w-full md:w-auto px-4 gap-3 bg-muted/50 rounded-full hover:bg-muted transition-all">
                                    <div className="h-7 w-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs shadow-inner">
                                        {currentUser.name.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="hidden sm:inline font-semibold">
                                        Hi, {currentUser.name.split(' ')[0]}
                                    </span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56 mt-2 rounded-2xl p-2 shadow-2xl border-muted-foreground/10" align="end">
                                <DropdownMenuLabel className="p-3">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-bold leading-none">{currentUser.name}</p>
                                        <p className="text-xs leading-none text-muted-foreground">{currentUser.email}</p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => navigate("/history")} className="rounded-xl gap-2 p-3 cursor-pointer">
                                    <History className="h-4 w-4" /> Order History
                                </DropdownMenuItem>
                                {currentUser.role !== 'customer' && (
                                    <DropdownMenuItem onClick={() => navigate("/staff")} className="rounded-xl gap-2 p-3 cursor-pointer">
                                        <ChefHat className="h-4 w-4" /> Dashboard
                                    </DropdownMenuItem>
                                )}
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={handleLogout} className="rounded-xl gap-2 p-3 text-destructive cursor-pointer hover:bg-destructive/10 focus:bg-destructive/10">
                                    <LogOut className="h-4 w-4" /> Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Button
                            variant="default"
                            className="rounded-full px-6 font-bold shadow-lg shadow-primary/20"
                            onClick={() => navigate("/auth")}
                        >
                            Sign In
                        </Button>
                    )}
                </div>
            </div>
        </header>
    );
};

export default CustomerNavbar;
