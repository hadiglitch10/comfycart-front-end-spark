import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { User, Mail, Key, Loader2, Save, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "../context/AuthContext";
import { Formik, Form, Field, ErrorMessage } from "formik";

const Profile = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [profilePic, setProfilePic] = useState<string | null>(null);

  useEffect(() => {
    // Load profile picture from storage
    const pic = localStorage.getItem("profilePic") || sessionStorage.getItem("profilePic");
    setProfilePic(pic);
  }, []);

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result as string);
        // Save to storage
        if (localStorage.getItem("token")) {
          localStorage.setItem("profilePic", reader.result as string);
        } else {
          sessionStorage.setItem("profilePic", reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-md mx-auto py-8">
      <h1 className="font-poppins font-bold text-3xl mb-6">My Profile</h1>
      <div className="flex flex-col items-center mb-6">
        <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-200 mb-2">
          {profilePic ? (
            <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <User className="w-full h-full text-gray-400" />
          )}
                </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleProfilePicChange}
          className="mb-2"
                  />
                </div>
      <Formik
        initialValues={{
          firstName: user?.name.split(" ")[0] || "",
          lastName: user?.name.split(" ").slice(1).join(" ") || "",
          email: user?.email || "",
        }}
        validate={values => {
          const errors: any = {};
          if (!values.firstName) errors.firstName = "First name is required";
          if (!values.lastName) errors.lastName = "Last name is required";
          if (!values.email) errors.email = "Email is required";
          else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = "Invalid email address";
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setLoading(true);
          setError("");
          setTimeout(() => {
            // Save to storage (simulate API)
            if (localStorage.getItem("token")) {
              localStorage.setItem("userName", `${values.firstName} ${values.lastName}`);
              localStorage.setItem("userEmail", values.email);
            } else {
              sessionStorage.setItem("userName", `${values.firstName} ${values.lastName}`);
              sessionStorage.setItem("userEmail", values.email);
            }
            toast({ title: "Profile updated", description: "Your profile has been updated." });
            setLoading(false);
            setSubmitting(false);
          }, 1000);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Field as={Input} name="firstName" id="firstName" />
              <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm" />
              </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Field as={Input} name="lastName" id="lastName" />
              <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm" />
              </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Field as={Input} name="email" id="email" type="email" />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
              </div>
            <Button type="submit" className="w-full" disabled={isSubmitting || loading}>
              {isSubmitting || loading ? <Loader2 className="animate-spin h-5 w-5 mr-2" /> : <Save className="h-5 w-5 mr-2" />}
                    Save Changes
              </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Profile;
