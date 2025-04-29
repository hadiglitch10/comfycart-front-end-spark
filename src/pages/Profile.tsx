
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { User, Mail, MapPin, Phone, Key, ShoppingBag, CreditCard } from "lucide-react";

const Profile = () => {
  const { toast } = useToast();
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "Jane",
    lastName: "Doe",
    email: "jane.doe@example.com",
    phone: "(555) 123-4567"
  });

  const [address, setAddress] = useState({
    street: "123 Comfort Street",
    city: "Cozy Town",
    state: "CA",
    zipCode: "12345",
    country: "United States"
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  // Mock order history
  const orders = [
    { id: "ORD-2023-001", date: "2023-04-10", status: "Delivered", total: 125.95 },
    { id: "ORD-2023-002", date: "2023-03-22", status: "Delivered", total: 89.99 },
    { id: "ORD-2023-003", date: "2023-02-15", status: "Delivered", total: 210.50 }
  ];

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const updatePersonalInfo = (e) => {
    e.preventDefault();
    toast({
      title: "Profile updated",
      description: "Your personal information has been updated successfully.",
    });
  };

  const updateAddress = (e) => {
    e.preventDefault();
    toast({
      title: "Address updated",
      description: "Your shipping address has been updated successfully.",
    });
  };

  const updatePassword = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match.",
        variant: "destructive",
      });
      return;
    }
    
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
    
    toast({
      title: "Password updated",
      description: "Your password has been updated successfully.",
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="font-poppins font-bold text-3xl mb-2">My Profile</h1>
      <p className="text-gray-600 mb-8">Manage your account information and track your orders</p>
      
      <Tabs defaultValue="personal">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="address">Address</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>
        
        {/* Personal Info Tab */}
        <TabsContent value="personal">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="font-semibold text-xl mb-6 flex items-center gap-2">
              <User className="h-5 w-5 text-primary" /> Personal Information
            </h2>
            
            <form onSubmit={updatePersonalInfo} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={personalInfo.firstName}
                    onChange={handlePersonalInfoChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={personalInfo.lastName}
                    onChange={handlePersonalInfoChange}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-1">
                    <Mail className="h-4 w-4" /> Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={personalInfo.email}
                    onChange={handlePersonalInfoChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-1">
                    <Phone className="h-4 w-4" /> Phone Number
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={personalInfo.phone}
                    onChange={handlePersonalInfoChange}
                  />
                </div>
              </div>
              
              <Button type="submit" className="bg-primary hover:bg-primary/90">
                Save Changes
              </Button>
            </form>
          </div>
        </TabsContent>
        
        {/* Address Tab */}
        <TabsContent value="address">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="font-semibold text-xl mb-6 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" /> Shipping Address
            </h2>
            
            <form onSubmit={updateAddress} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="street">Street Address</Label>
                <Input
                  id="street"
                  name="street"
                  value={address.street}
                  onChange={handleAddressChange}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    value={address.city}
                    onChange={handleAddressChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    name="state"
                    value={address.state}
                    onChange={handleAddressChange}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input
                    id="zipCode"
                    name="zipCode"
                    value={address.zipCode}
                    onChange={handleAddressChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    name="country"
                    value={address.country}
                    onChange={handleAddressChange}
                  />
                </div>
              </div>
              
              <Button type="submit" className="bg-primary hover:bg-primary/90">
                Update Address
              </Button>
            </form>
          </div>
        </TabsContent>
        
        {/* Password Tab */}
        <TabsContent value="password">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="font-semibold text-xl mb-6 flex items-center gap-2">
              <Key className="h-5 w-5 text-primary" /> Change Password
            </h2>
            
            <form onSubmit={updatePassword} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                  />
                </div>
              </div>
              
              <Button type="submit" className="bg-primary hover:bg-primary/90">
                Update Password
              </Button>
            </form>
          </div>
        </TabsContent>
        
        {/* Orders Tab */}
        <TabsContent value="orders">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="font-semibold text-xl mb-6 flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-primary" /> Order History
            </h2>
            
            {orders.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Order ID</th>
                      <th className="text-left py-3 px-4">Date</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-right py-3 px-4">Total</th>
                      <th className="text-right py-3 px-4">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} className="border-b hover:bg-gray-50">
                        <td className="py-4 px-4">{order.id}</td>
                        <td className="py-4 px-4">{order.date}</td>
                        <td className="py-4 px-4">
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                            {order.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right">${order.total.toFixed(2)}</td>
                        <td className="py-4 px-4 text-right">
                          <Button variant="outline" size="sm">Details</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12">
                <ShoppingBag className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <h3 className="font-medium text-lg mb-1">No orders yet</h3>
                <p className="text-gray-500 mb-4">When you place orders, they'll appear here</p>
                <Button asChild>
                  <Link to="/products">Start Shopping</Link>
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
