import { useState, useEffect } from 'react';
import { useRestaurant } from '@/contexts/RestaurantContext';
import AdminLayout from '@/components/restaurant/AdminLayout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Users, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const UserManagement = () => {
    const { staffMembers } = useRestaurant(); // This currently fetches all users from the backend
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState<'all' | 'admin' | 'staff' | 'customer'>('all');

    const filteredUsers = staffMembers.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = roleFilter === 'all' || user.role === roleFilter;
        return matchesSearch && matchesRole;
    });

    const getRoleBadge = (role: string) => {
        switch (role) {
            case 'admin': return <Badge variant="default" className="bg-red-500 hover:bg-red-600">Admin</Badge>;
            case 'staff': return <Badge variant="secondary" className="bg-orange-500 text-white hover:bg-orange-600">Staff</Badge>;
            case 'customer': return <Badge variant="outline" className="border-primary text-primary">Customer</Badge>;
            default: return <Badge>{role}</Badge>;
        }
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold flex items-center gap-2">
                            <Users className="h-6 w-6 text-primary" />
                            User Management
                        </h1>
                        <p className="text-muted-foreground mt-1">
                            View and manage all registered users (Admins, Staff, and Customers)
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-card p-4 rounded-xl border shadow-sm">
                    <div className="relative col-span-2">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search by name or email..."
                            className="pl-10"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Select value={roleFilter} onValueChange={(v: any) => setRoleFilter(v)}>
                        <SelectTrigger>
                            <div className="flex items-center gap-2">
                                <Filter className="h-4 w-4" />
                                <SelectValue placeholder="Filter by Role" />
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Roles</SelectItem>
                            <SelectItem value="admin">Admins</SelectItem>
                            <SelectItem value="staff">Staff</SelectItem>
                            <SelectItem value="customer">Customers</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="bg-card rounded-xl border shadow-xl overflow-hidden">
                    <Table>
                        <TableHeader className="bg-muted/50">
                            <TableRow>
                                <TableHead className="w-[80px]">Avatar</TableHead>
                                <TableHead>User Details</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Joined Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredUsers.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
                                        No users found matching your criteria.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredUsers.map(user => (
                                    <TableRow key={user.id} className="hover:bg-muted/30 transition-colors">
                                        <TableCell>
                                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                                                {user.name.charAt(0).toUpperCase()}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="font-bold">{user.name}</span>
                                                <span className="text-xs text-muted-foreground">{user.email}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>{getRoleBadge(user.role)}</TableCell>
                                        <TableCell>
                                            <Badge variant={user.active !== false ? 'default' : 'secondary'} className={user.active !== false ? 'bg-green-100 text-green-700 hover:bg-green-200 border-none' : ''}>
                                                {user.active !== false ? 'Active' : 'Inactive'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-muted-foreground text-sm">
                                            {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AdminLayout>
    );
};

export default UserManagement;
