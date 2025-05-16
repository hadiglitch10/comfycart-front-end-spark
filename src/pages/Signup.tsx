import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

const Signup = () => {
    const { toast } = useToast();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (errors[name]) setErrors({ ...errors, [name]: "" });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors = { firstName: "", lastName: "", email: "", password: "", confirmPassword: "" };

        if (!formData.firstName) newErrors.firstName = "First name is required";
        if (!formData.lastName) newErrors.lastName = "Last name is required";
        if (!formData.email) newErrors.email = "Email is required";
        else if (!validateEmail(formData.email)) newErrors.email = "Please enter a valid email";

        if (!formData.password) newErrors.password = "Password is required";
        else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters";

        if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm your password";
        else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";

        setErrors(newErrors);

        if (!Object.values(newErrors).some(error => error)) {
            try {
                const response = await fetch("http://localhost:5000/api/user/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        name: `${formData.firstName} ${formData.lastName}`,
                        email: formData.email.toLowerCase(),
                        password: formData.password,
                        password2: formData.confirmPassword,
                    }),
                });

                const data = await response.json();

                if (response.ok) {
                    toast({ title: "Account created successfully", description: "You can now log in." });
                    navigate("/login");
                } else {
                    toast({ title: "Error", description: data.message || "Something went wrong.", variant: "destructive" });
                }
            } catch (error) {
                toast({ title: "Error", description: "Server error. Please try again.", variant: "destructive" });
            }
        }
    };

    return (
        <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
                <h1 className="font-poppins font-bold text-3xl mb-2">Create an Account</h1>
                <p className="text-gray-600">Join ComfyCart for a better shopping experience</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input
                                id="firstName"
                                name="firstName"
                                placeholder="First Name"
                                value={formData.firstName}
                                onChange={handleChange}
                                className={errors.firstName ? "border-red-500" : ""}
                            />
                            {errors.firstName && (
                                <p className="text-red-500 text-sm">{errors.firstName}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input
                                id="lastName"
                                name="lastName"
                                placeholder="Last Name"
                                value={formData.lastName}
                                onChange={handleChange}
                                className={errors.lastName ? "border-red-500" : ""}
                            />
                            {errors.lastName && (
                                <p className="text-red-500 text-sm">{errors.lastName}</p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="your@email.com"
                            value={formData.email}
                            onChange={handleChange}
                            className={errors.email ? "border-red-500" : ""}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm">{errors.email}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            className={errors.password ? "border-red-500" : ""}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm">{errors.password}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            placeholder="••••••••"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={errors.confirmPassword ? "border-red-500" : ""}
                        />
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-primary hover:bg-primary/90"
                    >
                        Sign Up
                    </Button>
                </form>

                <div className="mt-6 text-center text-sm">
                    <span className="text-gray-600">Already have an account? </span>
                    <Link
                        to="/login"
                        className="text-primary font-medium hover:underline"
                    >
                        Log in
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;
