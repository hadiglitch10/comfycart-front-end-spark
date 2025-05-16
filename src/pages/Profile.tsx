import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { User, Mail, Key, Loader2, Save, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Profile = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    email: ""
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  // Get authentication data
  const getAuthData = () => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    const userId = localStorage.getItem("userId") || sessionStorage.getItem("userId");
    return { token, userId };
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setError("");
        // Get token and userId from storage (set during login)
        const { token, userId } = getAuthData();
        
        if (!token || !userId) {
          // Redirect to login if not authenticated
          toast({
            title: "Authentication required",
            description: "Please log in to view your profile",
            variant: "destructive"
          });
          navigate("/login");
          return;
        }

        const response = await fetch(`http://localhost:5000/api/user/${userId}`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        if (response.status === 401) {
          // Token expired or invalid
          toast({
            title: "Session expired",
            description: "Please log in again",
            variant: "destructive"
          });
          handleLogout();
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const userData = await response.json();
        
        // Split the name into first and last name
        const nameParts = userData.name.split(" ");
        const firstName = nameParts[0] || "";
        const lastName = nameParts.slice(1).join(" ") || "";

        setPersonalInfo({
          firstName,
          lastName,
          email: userData.email
        });
      } catch (error) {
        setError(error.message || "Failed to load user data");
        toast({
          title: "Error",
          description: error.message || "Failed to load user data",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [toast, navigate]);

  const handleLogout = () => {
    // Clear auth data
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("userName");
    
    // Navigate to login
    navigate("/login");
  };

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const updatePersonalInfo = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    
    try {
      const { token, userId } = getAuthData();
      
      if (!token) {
        toast({
          title: "Authentication required",
          description: "Please log in to update your profile",
          variant: "destructive"
        });
        navigate("/login");
        return;
      }
      
      if (!personalInfo.firstName.trim() || !personalInfo.lastName.trim() || !personalInfo.email.trim()) {
        setError("All fields are required");
        toast({
          title: "Error",
          description: "All fields are required",
          variant: "destructive"
        });
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(personalInfo.email)) {
        setError("Please enter a valid email address");
        toast({
          title: "Error",
          description: "Please enter a valid email address",
          variant: "destructive"
        });
        return;
      }
      
      const response = await fetch("http://localhost:5000/api/user/edit", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          name: `${personalInfo.firstName} ${personalInfo.lastName}`,
          email: personalInfo.email,
          currPassword: passwordData.currentPassword
        })
      });
      
      if (response.status === 401) {
        toast({
          title: "Session expired",
          description: "Please log in again",
          variant: "destructive"
        });
        handleLogout();
        return;
      }
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Failed to update profile");
      }
      
      toast({
        title: "Profile updated",
        description: "Your personal information has been updated successfully."
      });
      
      // Update localStorage/sessionStorage with new name if it was changed
      const newName = `${personalInfo.firstName} ${personalInfo.lastName}`;
      if (localStorage.getItem("userName")) {
        localStorage.setItem("userName", newName);
      } else if (sessionStorage.getItem("userName")) {
        sessionStorage.setItem("userName", newName);
      }
      
      // Clear password field after successful update
      setPasswordData(prev => ({
        ...prev,
        currentPassword: ""
      }));
      
    } catch (error) {
      setError(error.message || "Failed to update profile");
      toast({
        title: "Error",
        description: error.message || "Failed to update profile",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const updatePassword = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    
    try {
      const { token } = getAuthData();
      
      if (!token) {
        toast({
          title: "Authentication required",
          description: "Please log in to update your password",
          variant: "destructive"
        });
        navigate("/login");
        return;
      }
      
      // Validate password
      if (passwordData.newPassword.length < 8) {
        setError("New password must be at least 8 characters");
        toast({
          title: "Error",
          description: "New password must be at least 8 characters",
          variant: "destructive"
        });
        return;
      }
      
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        setError("New passwords do not match");
        toast({
          title: "Error",
          description: "New passwords do not match",
          variant: "destructive"
        });
        return;
      }
      
      const response = await fetch("http://localhost:5000/api/user/edit", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          name: `${personalInfo.firstName} ${personalInfo.lastName}`,
          email: personalInfo.email,
          currPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
          confirmNewPassword: passwordData.confirmPassword
        })
      });
      
      if (response.status === 401) {
        toast({
          title: "Session expired",
          description: "Please log in again",
          variant: "destructive"
        });
        handleLogout();
        return;
      }
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Failed to update password");
      }
      
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
      
      toast({
        title: "Password updated",
        description: "Your password has been updated successfully."
      });
      
    } catch (error) {
      setError(error.message || "Failed to update password");
      toast({
        title: "Error",
        description: error.message || "Failed to update password",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
        <h2 className="text-xl font-medium">Loading profile...</h2>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="font-poppins font-bold text-3xl mb-2">My Profile</h1>
      <p className="text-gray-600 mb-8">Manage your account information</p>
      
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <Tabs defaultValue="personal">
        <TabsList className="grid w-full grid-cols-1">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
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
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={personalInfo.lastName}
                    onChange={handlePersonalInfoChange}
                    required
                  />
                </div>
              </div>
              
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
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password (required to save changes)</Label>
                <Input
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="bg-primary hover:bg-primary/90"
                disabled={saving}
              >
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </form>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm mt-6">
            <h2 className="font-semibold text-xl mb-6 flex items-center gap-2">
              <Key className="h-5 w-5 text-primary" /> Change Password
            </h2>
            
            <form onSubmit={updatePassword} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="currentPasswordForPwChange">Current Password</Label>
                <Input
                  id="currentPasswordForPwChange"
                  name="currentPassword"
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  required
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
                    required
                    minLength={8}
                  />
                  <p className="text-xs text-gray-500">Must be at least 8 characters</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="bg-primary hover:bg-primary/90"
                disabled={saving}
              >
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Key className="mr-2 h-4 w-4" />
                    Update Password
                  </>
                )}
              </Button>
            </form>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
