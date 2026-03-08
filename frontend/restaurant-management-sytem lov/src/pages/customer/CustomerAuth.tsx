import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRestaurant } from '@/contexts/RestaurantContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { User, LogIn, UserPlus, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

const CustomerAuth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);

    const { login, register } = useRestaurant();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            let success = false;
            if (isLogin) {
                const role = await login(email, password);
                success = role !== null; // login returns role string or null
            } else {
                success = await register(name, email, password);
            }

            if (success) {
                toast.success(isLogin ? 'Welcome back!' : 'Account created successfully!');
                navigate(-1); // Go back to where they were (usually checkout)
            } else {
                toast.error(isLogin ? 'Invalid credentials' : 'Registration failed. Email might already exist.');
            }
        } catch (err) {
            toast.error('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
            <Card className="w-full max-w-md shadow-2xl border-none overflow-hidden">
                <div className="bg-primary h-2" />
                <CardHeader className="space-y-1">
                    <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="w-fit mb-4 gap-2">
                        <ArrowLeft className="h-4 w-4" /> Back to Home
                    </Button>
                    <div className="flex justify-center mb-4">
                        <div className="p-3 bg-primary/10 rounded-full">
                            {isLogin ? <LogIn className="h-8 w-8 text-primary" /> : <UserPlus className="h-8 w-8 text-primary" />}
                        </div>
                    </div>
                    <CardTitle className="text-2xl text-center">
                        {isLogin ? 'Welcome Back' : 'Join Us Today'}
                    </CardTitle>
                    <CardDescription className="text-center">
                        {isLogin ? 'Sign in to place your gourmet order' : 'Create an account for a seamless dining experience'}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {!isLogin && (
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                    id="name"
                                    placeholder="John Doe"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                        )}
                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full h-12 text-lg font-bold mt-4" disabled={loading}>
                            {loading
                                ? (isLogin ? 'Signing In...' : 'Joining...')
                                : (isLogin ? 'Sign In' : 'Sign Up')}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4 pb-8">
                    <div className="relative w-full">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">Or</span>
                        </div>
                    </div>
                    <Button
                        variant="outline"
                        className="w-full h-11"
                        onClick={() => setIsLogin(!isLogin)}
                    >
                        {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default CustomerAuth;
