"use client";
import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock, LogIn, User } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  // Form state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  // Validation errors state
  const [errors, setErrors] = useState({});

  // Password visibility state
  const [showPassword, setShowPassword] = useState(false);

  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "البريد الإلكتروني مطلوب";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "يرجى إدخال بريد إلكتروني صحيح";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "كلمة المرور مطلوبة";
    } else if (formData.password.length < 6) {
      newErrors.password = "كلمة المرور يجب أن تكون 6 أحرف على الأقل";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Here you would typically send the data to your backend
      console.log("Login data:", formData);
      alert("تم تسجيل الدخول بنجاح! مرحباً بك في المنصة التعليمية.");

      // In a real app, you would redirect to dashboard
      // window.location.href = '/dashboard';
    } catch (error) {
      console.error("Login error:", error);
      alert("خطأ في البريد الإلكتروني أو كلمة المرور. يرجى المحاولة مرة أخرى.");
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
        {/* Header Section */}
        <div className="bg-gradient-to-l from-blue-600 to-blue-800 rounded-t-2xl p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-white/20 p-4 rounded-full">
              <LogIn className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">تسجيل الدخول</h1>
          <p className="text-blue-100">
            مرحباً بك مرة أخرى في منصتنا التعليمية
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-b-2xl shadow-xl p-8">
          <div className="space-y-6">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-2 text-right"
              >
                البريد الإلكتروني
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
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
                <p className="mt-1 text-sm text-red-600 text-right">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 mb-2 text-right"
              >
                كلمة المرور
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
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
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600 text-right">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Remember Me and Forgot Password */}
            <div className="flex flex-row-reverse items-center justify-between">
              <Link
                href="/forgot-password"
                className="text-sm text-blue-600 hover:text-blue-800"
              >
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

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`w-full bg-gradient-to-l from-blue-600 to-blue-700 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg ${
                  isSubmitting
                    ? "opacity-75 cursor-not-allowed"
                    : "hover:from-blue-700 hover:to-blue-800"
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white ml-2"></div>
                    جارٍ تسجيل الدخول...
                  </div>
                ) : (
                  "تسجيل الدخول"
                )}
              </button>
            </div>

            {/* Social Login Section */}
            {/* <div className="pt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">
                    أو تسجيل الدخول باستخدام
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors duration-200"
                >
                  <span>جوجل</span>
                  <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                </button>

                <button
                  type="button"
                  className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors duration-200"
                >
                  <span>فيسبوك</span>
                  <svg
                    className="mr-2 h-5 w-5 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </button>
              </div>
            </div> */}

            {/* Registration Link */}
            <div className="text-center pt-6 border-t border-gray-200">
              <p className="text-gray-600">
                ليس لديك حساب؟{" "}
                <Link
                  href="/sign-up"
                  className="text-blue-600 hover:text-blue-800 font-semibold"
                >
                  إنشاء حساب جديد
                </Link>
              </p>
            </div>

            {/* Additional Links */}
            <div className="text-center space-y-2">
              <Link
                href="/help"
                className="block text-sm text-gray-500 hover:text-gray-700"
              >
                هل تحتاج مساعدة؟
              </Link>
              <Link
                href="/terms"
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                شروط الاستخدام
              </Link>
              <Link
                href="/privacy"
                className="text-sm text-gray-500 hover:text-gray-700 mr-4"
              >
                سياسة الخصوصية
              </Link>
            </div>
          </div>
        </div>

        {/* Platform Features */}
        <div className="bg-gradient-to-l from-blue-50 to-blue-100 rounded-2xl p-6 mt-8">
          <h3 className="font-bold text-gray-900 mb-4 text-right">
            لماذا تختار منصتنا؟
          </h3>
          <div className="space-y-3">
            <div className="flex flex-row-reverse items-center justify-end">
              <span className="text-gray-700 text-sm">
                دورات معتمدة من خبراء متخصصين
              </span>
              <div className="bg-blue-500 p-1 rounded-full ml-3">
                <User className="h-3 w-3 text-white" />
              </div>
            </div>
            <div className="flex flex-row-reverse items-center justify-end">
              <span className="text-gray-700 text-sm">شهادات معترف بها</span>
              <div className="bg-blue-500 p-1 rounded-full ml-3">
                <svg
                  className="h-3 w-3 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="flex flex-row-reverse items-center justify-end">
              <span className="text-gray-700 text-sm">
                تعلم بالوتيرة التي تناسبك
              </span>
              <div className="bg-blue-500 p-1 rounded-full ml-3">
                <svg
                  className="h-3 w-3 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
