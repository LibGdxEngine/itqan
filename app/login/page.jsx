"use client";
import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock, LogIn, User } from "lucide-react";
import Link from "next/link";
import { useAuth } from "../hooks/useAuth"; // 👈 import the auth hook

export default function LoginPage() {
    const { login } = useAuth(); // 👈 hook
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: false,
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.email.trim()) {
            newErrors.email = "البريد الإلكتروني مطلوب";
        } else if (!validateEmail(formData.email)) {
            newErrors.email = "يرجى إدخال بريد إلكتروني صحيح";
        }
        if (!formData.password) {
            newErrors.password = "كلمة المرور مطلوبة";
        } else if (formData.password.length < 6) {
            newErrors.password = "كلمة المرور يجب أن تكون 6 أحرف على الأقل";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setIsSubmitting(true);

        try {
            // 👇 call your login hook (with backend request inside)
            await login(formData.email, formData.password);

            // redirect after success
            window.location.href = "/";
        } catch (error) {
            console.error("Login error:", error);
            setErrors({ general: "خطأ في البريد الإلكتروني أو كلمة المرور" });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
            dir="rtl"
        >
            <div className="max-w-md w-full space-y-8">
                {/* Header */}
                <div className="bg-gradient-to-l from-blue-600 to-blue-800 rounded-t-2xl p-8 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="bg-white/20 p-4 rounded-full">
                            <LogIn className="h-8 w-8 text-white" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">تسجيل الدخول</h1>
                    <p className="text-blue-100">مرحباً بك مرة أخرى في منصتنا التعليمية</p>
                </div>

                {/* Form */}
                <div className="bg-white rounded-b-2xl shadow-xl p-8">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {errors.general && (
                            <p className="text-red-600 text-center">{errors.general}</p>
                        )}

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2 text-right">
                                البريد الإلكتروني
                            </label>
                            <div className="relative">
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="أدخل بريدك الإلكتروني"
                                    className={`w-full px-4 py-3 pr-12 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right ${
                                        errors.email ? "border-red-500" : "border-gray-300"
                                    }`}
                                />
                                <Mail className="absolute right-4 top-3.5 h-5 w-5 text-gray-400" />
                            </div>
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600 text-right">{errors.email}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2 text-right">
                                كلمة المرور
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="أدخل كلمة المرور"
                                    className={`w-full px-4 py-3 pr-12 pl-12 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right ${
                                        errors.password ? "border-red-500" : "border-gray-300"
                                    }`}
                                />
                                <Lock className="absolute right-4 top-3.5 h-5 w-5 text-gray-400" />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute left-4 top-3.5 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-600 text-right">{errors.password}</p>
                            )}
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex flex-row-reverse items-center justify-between">
                            <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800">
                                نسيت كلمة المرور؟
                            </Link>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="rememberMe"
                                    checked={formData.rememberMe}
                                    onChange={handleInputChange}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <span className="mr-2 text-sm text-gray-700">تذكرني</span>
                            </label>
                        </div>

                        {/* Submit */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full bg-gradient-to-l from-blue-600 to-blue-700 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg ${
                                    isSubmitting ? "opacity-75 cursor-not-allowed" : "hover:from-blue-700 hover:to-blue-800"
                                }`}
                            >
                                {isSubmitting ? "جارٍ تسجيل الدخول..." : "تسجيل الدخول"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
