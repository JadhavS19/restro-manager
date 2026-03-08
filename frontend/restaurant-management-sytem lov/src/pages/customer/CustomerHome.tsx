import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Utensils, Clock, MapPin, Phone } from "lucide-react";
import { useRestaurant } from "@/contexts/RestaurantContext";
import CustomerNavbar from "@/components/customer/CustomerNavbar";

const CustomerHome = () => {
    const navigate = useNavigate();
    const { currentUser } = useRestaurant();

    return (
        <div className="min-h-screen bg-background">
            <CustomerNavbar />
            {/* Hero Section */}
            <section className="relative h-[80vh] flex items-center justify-center text-center px-4 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/hero.png"
                        alt="Restaurant Interior"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
                </div>

                <div className="relative z-10 max-w-3xl animate-in zoom-in duration-1000">
                    <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-6 text-white leading-tight">
                        Tanisha <span className="text-primary italic">Restaurant</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
                        Where every dish tells a story of tradition, taste, and timeless culinary artistry.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        {!currentUser ? (
                            <>
                                <Button
                                    size="lg"
                                    className="h-16 px-10 text-xl font-bold rounded-full shadow-2xl transition-transform hover:scale-105"
                                    onClick={() => navigate("/auth")}
                                >
                                    Login as Customer
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="h-16 px-10 text-xl font-bold rounded-full border-white text-white hover:bg-white/10 backdrop-blur-md"
                                    onClick={() => navigate("/staff/login")}
                                >
                                    Login as Staff
                                </Button>
                            </>
                        ) : (
                            <Button
                                size="lg"
                                className="h-16 px-10 text-xl font-bold rounded-full shadow-2xl transition-transform hover:scale-105"
                                onClick={() => {
                                    if (currentUser.role === 'admin') navigate("/admin");
                                    else if (currentUser.role === 'staff') navigate("/staff");
                                    else navigate("/menu");
                                }}
                            >
                                {currentUser.role === 'customer' ? "Go to Menu" : "Admin Panel"}
                            </Button>
                        )}
                    </div>
                </div>
            </section>

            {/* Info Section */}
            <section className="py-20 px-4 container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-muted/50 transition-all hover:shadow-lg">
                        <Utensils className="h-10 w-10 text-primary mb-4" />
                        <h3 className="font-semibold text-lg mb-2">Quality Food</h3>
                        <p className="text-muted-foreground">Made with locally sourced fresh ingredients.</p>
                    </div>
                    <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-muted/50 transition-all hover:shadow-lg">
                        <Clock className="h-10 w-10 text-primary mb-4" />
                        <h3 className="font-semibold text-lg mb-2">Opening Hours</h3>
                        <p className="text-muted-foreground">Mon - Sun: 10:00 AM - 11:00 PM</p>
                    </div>
                    <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-muted/50 transition-all hover:shadow-lg">
                        <MapPin className="h-10 w-10 text-primary mb-4" />
                        <h3 className="font-semibold text-lg mb-2">Location</h3>
                        <p className="text-muted-foreground">123 Street Ave, Culinary District</p>
                    </div>
                    <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-muted/50 transition-all hover:shadow-lg">
                        <Phone className="h-10 w-10 text-primary mb-4" />
                        <h3 className="font-semibold text-lg mb-2">Contact</h3>
                        <p className="text-muted-foreground">+1 (555) 123-4567</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CustomerHome;
