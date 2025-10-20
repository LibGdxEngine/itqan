"use client";
import Navbar from "../components/Navbar";
import React, {useState} from "react";
import {
    Eye,
    EyeOff,
    User,
    Mail,
    Lock,
    Phone,
    Calendar,
    Globe,
} from "lucide-react";
import apiClient from "@/app/lib/api/client";
import {toast} from "react-toastify";

// Mock data for dropdowns
const nationalities = [
    "سعودي",
    "مصري",
    "إماراتي",
    "كويتي",
    "قطري",
    "بحريني",
    "عماني",
    "أردني",
    "لبناني",
    "سوري",
    "عراقي",
    "فلسطيني",
    "يمني",
    "مغربي",
    "جزائري",
    "تونسي",
    "ليبي",
    "سوداني",
    "موريتاني",
    "جيبوتي",
    "صومالي",
    "جزر القمر",
    "أمريكي",
    "بريطاني",
    "فرنسي",
    "ألماني",
    "كندي",
    "أسترالي",
    "تركي",
    "إيراني",
    "باكستاني",
    "هندي",
    "بنجلاديشي",
    "إندونيسي",
    "ماليزي",
    "أخرى",
];

const countries = [
    "السعودية",
    "الإمارات",
    "الكويت",
    "قطر",
    "البحرين",
    "عُمان",
    "الأردن",
    "لبنان",
    "سوريا",
    "العراق",
    "فلسطين",
    "اليمن",
    "مصر",
    "المغرب",
    "الجزائر",
    "تونس",
    "ليبيا",
    "السودان",
    "موريتانيا",
    "جيبوتي",
    "الصومال",
    "جزر القمر",
    "الولايات المتحدة",
    "كندا",
    "بريطانيا",
    "فرنسا",
    "ألمانيا",
    "أستراليا",
    "تركيا",
    "إيران",
    "باكستان",
    "الهند",
    "بنجلاديش",
    "إندونيسيا",
    "ماليزيا",
    "أخرى",
];

export default function RegistrationForm() {
    // Form state
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        gender: "",
        age: "",
        nationality: "",
        currentCountry: "",
    });

    // Validation errors state
    const [errors, setErrors] = useState({});

    // Password visibility state
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Form submission state
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Handle input changes
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
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

        // Required field validation
        if (!formData.fullName.trim()) {
            newErrors.fullName = "الاسم الكامل مطلوب";
        }

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

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "تأكيد كلمة المرور مطلوب";
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "كلمة المرور غير متطابقة";
        }

        if (!formData.gender) {
            newErrors.gender = "الجنس مطلوب";
        }

        if (!formData.age) {
            newErrors.age = "العمر مطلوب";
        } else if (isNaN(formData.age) || formData.age < 13 || formData.age > 100) {
            newErrors.age = "يرجى إدخال عمر صحيح (13-100)";
        }

        if (!formData.nationality) {
            newErrors.nationality = "الجنسية مطلوبة";
        }

        if (!formData.currentCountry) {
            newErrors.currentCountry = "الدولة الحالية مطلوبة";
        }

        if (!formData.phone) {
            newErrors.phone = "رقم الهاتف مطلوب";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            // 1. Prepare username from full name
            const username = formData.fullName.trim().replace(/\s+/g, "_");

            // 2. Call signup endpoint
            const signupRes = await apiClient.post("/auth/signup/", {
                username,
                email: formData.email,
                password: formData.password,
            });
            // 3. Get token (if returned) or login after signup
            // Assuming your backend returns a token after signup
            const token = signupRes.data?.token;
            if (token) {
                localStorage.setItem("token", token);
                apiClient.defaults.headers.common["Authorization"] = `Token ${token}`;
            }

            // 4. Update profile with extra fields
            await apiClient.put("/auth/profile/", {
                full_name: formData.fullName,
                gender: formData.gender,
                phone_number: formData.phone,
                age: formData.age,
                nationality: formData.nationality,
                country: formData.currentCountry,
            });

            window.location.href = "/profile";

            // Reset form
            setFormData({
                fullName: "",
                email: "",
                password: "",
                confirmPassword: "",
                phone: "",
                gender: "",
                age: "",
                nationality: "",
                currentCountry: "",
            });
        } catch (error) {
            if (error.response?.data['email'][0] === "user with this email already exists.") {
                toast.error("هذا الحساب موجود بالفعل, جرب تسجيل الدخول");
            }

        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 "
            dir="rtl"
        >
               <Navbar />
            <div className="max-w-2xl mt-10 mx-auto">
         
                {/* Header Section */}
                <div className="bg-gradient-to-l from-blue-600 to-blue-800 rounded-t-2xl p-8 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="bg-white/20 p-4 rounded-full">
                            <User className="h-8 w-8 text-white"/>
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">
                        إنشاء حساب جديد
                    </h1>
                    <p className="text-blue-100">
                        انضم إلى منصتنا التعليمية وابدأ رحلتك في التعلم
                    </p>
                </div>

                {/* Registration Form */}
                <div className="bg-white rounded-b-2xl shadow-xl p-8">
                    <div className="space-y-6">
                        {/* Full Name Field */}
                        <div>
                            <label
                                htmlFor="fullName"
                                className="block text-sm font-semibold text-gray-700 mb-2 text-right"
                            >
                                الاسم الكامل *
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    placeholder="أدخل اسمك الكامل"
                                    className={`w-full px-4 py-3 pr-12 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right ${
                                        errors.fullName ? "border-red-500" : "border-gray-300"
                                    }`}
                                />
                                <User className="absolute right-4 top-3.5 h-5 w-5 text-gray-400"/>
                            </div>
                            {errors.fullName && (
                                <p className="mt-1 text-sm text-red-600 text-right">
                                    {errors.fullName}
                                </p>
                            )}
                        </div>

                        {/* Email Field */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-semibold text-gray-700 mb-2 text-right"
                            >
                                البريد الإلكتروني *
                            </label>
                            <div className="relative">
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="example@email.com"
                                    className={`w-full px-4 py-3 pr-12 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right ${
                                        errors.email ? "border-red-500" : "border-gray-300"
                                    }`}
                                />
                                <Mail className="absolute right-4 top-3.5 h-5 w-5 text-gray-400"/>
                            </div>
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600 text-right">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Password Fields Row */}
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Password Field */}
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-semibold text-gray-700 mb-2 text-right"
                                >
                                    كلمة المرور *
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
                                    <Lock className="absolute right-4 top-3.5 h-5 w-5 text-gray-400"/>
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute left-4 top-3.5 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-5 w-5"/>
                                        ) : (
                                            <Eye className="h-5 w-5"/>
                                        )}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="mt-1 text-sm text-red-600 text-right">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            {/* Confirm Password Field */}
                            <div>
                                <label
                                    htmlFor="confirmPassword"
                                    className="block text-sm font-semibold text-gray-700 mb-2 text-right"
                                >
                                    تأكيد كلمة المرور *
                                </label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        placeholder="أعد إدخال كلمة المرور"
                                        className={`w-full px-4 py-3 pr-12 pl-12 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right ${
                                            errors.confirmPassword
                                                ? "border-red-500"
                                                : "border-gray-300"
                                        }`}
                                    />
                                    <Lock className="absolute right-4 top-3.5 h-5 w-5 text-gray-400"/>
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute left-4 top-3.5 text-gray-400 hover:text-gray-600"
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff className="h-5 w-5"/>
                                        ) : (
                                            <Eye className="h-5 w-5"/>
                                        )}
                                    </button>
                                </div>
                                {errors.confirmPassword && (
                                    <p className="mt-1 text-sm text-red-600 text-right">
                                        {errors.confirmPassword}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Phone Number Field (Optional) */}
                        <div>
                            <label
                                htmlFor="phone"
                                className="block text-sm font-semibold text-gray-700 mb-2 text-right"
                            >
                                رقم الهاتف
                            </label>
                            <div className="relative">
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder="+966 50 123 4567"
                                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
                                />
                                <Phone className="absolute right-4 top-3.5 h-5 w-5 text-gray-400"/>
                            </div>
                        </div>

                        {/* Gender and Age Row */}
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Gender Field */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3 text-right">
                                    الجنس *
                                </label>
                                <div className="flex gap-3 space-x-reverse justify-start">
                                    <label className="flex gap-1 items-center">
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="M"
                                            checked={formData.gender === "male"}
                                            onChange={handleInputChange}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                        />
                                        <span className="text-gray-700">ذكر</span>
                                    </label>
                                    <label className="flex gap-1 items-center">
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="F"
                                            checked={formData.gender === "female"}
                                            onChange={handleInputChange}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                        />
                                        <span className="text-gray-700">أنثى</span>
                                    </label>
                                </div>
                                {errors.gender && (
                                    <p className="mt-1 text-sm text-red-600 text-right">
                                        {errors.gender}
                                    </p>
                                )}
                            </div>

                            {/* Age Field */}
                            <div>
                                <label
                                    htmlFor="age"
                                    className="block text-sm font-semibold text-gray-700 mb-2 text-right"
                                >
                                    العمر *
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        id="age"
                                        name="age"
                                        value={formData.age}
                                        onChange={handleInputChange}
                                        placeholder="25"
                                        min="13"
                                        max="100"
                                        className={`w-full px-4 py-3 pr-12 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right ${
                                            errors.age ? "border-red-500" : "border-gray-300"
                                        }`}
                                    />
                                    <Calendar className="absolute right-4 top-3.5 h-5 w-5 text-gray-400"/>
                                </div>
                                {errors.age && (
                                    <p className="mt-1 text-sm text-red-600 text-right">
                                        {errors.age}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Nationality and Country Row */}
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Nationality Field */}
                            <div>
                                <label
                                    htmlFor="nationality"
                                    className="block text-sm font-semibold text-gray-700 mb-2 text-right"
                                >
                                    الجنسية *
                                </label>
                                <div className="relative">
                                    <select
                                        id="nationality"
                                        name="nationality"
                                        value={formData.nationality}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 pr-12 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right appearance-none bg-white ${
                                            errors.nationality ? "border-red-500" : "border-gray-300"
                                        }`}
                                    >
                                        <option value="">اختر الجنسية</option>
                                        {nationalities.map((nationality) => (
                                            <option
                                                key={nationality}
                                                value={nationality}
                                                className="text-black"
                                            >
                                                {nationality}
                                            </option>
                                        ))}
                                    </select>
                                    <Globe
                                        className="absolute right-4 top-3.5 h-5 w-5 text-gray-400 pointer-events-none"/>
                                </div>
                                {errors.nationality && (
                                    <p className="mt-1 text-sm text-red-600 text-right">
                                        {errors.nationality}
                                    </p>
                                )}
                            </div>

                            {/* Current Country Field */}
                            <div>
                                <label
                                    htmlFor="currentCountry"
                                    className="block text-sm font-semibold text-gray-700 mb-2 text-right"
                                >
                                    الدولة الحالية *
                                </label>
                                <div className="relative">
                                    <select
                                        id="currentCountry"
                                        name="currentCountry"
                                        value={formData.currentCountry}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 pr-12 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right appearance-none bg-white ${
                                            errors.currentCountry
                                                ? "border-red-500"
                                                : "border-gray-300"
                                        }`}
                                    >
                                        <option value="">اختر الدولة الحالية</option>
                                        {countries.map((country) => (
                                            <option
                                                key={country}
                                                value={country}
                                                className="text-black"
                                            >
                                                {country}
                                            </option>
                                        ))}
                                    </select>
                                    <Globe
                                        className="absolute right-4 top-3.5 h-5 w-5 text-gray-400 pointer-events-none"/>
                                </div>
                                {errors.currentCountry && (
                                    <p className="mt-1 text-sm text-red-600 text-right">
                                        {errors.currentCountry}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-6">
                            <button
                                onClick={handleSubmit}
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full bg-gradient-to-l from-blue-600 to-blue-700 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg ${
                                    isSubmitting
                                        ? "opacity-75 cursor-not-allowed"
                                        : "hover:from-blue-700 hover:to-blue-800"
                                }`}
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center justify-center">
                                        <div
                                            className="animate-spin rounded-full h-5 w-5 border-b-2 border-white ml-2"></div>
                                        جارٍ التسجيل...
                                    </div>
                                ) : (
                                    "تسجيل"
                                )}
                            </button>
                        </div>

                        {/* Login Link */}
                        <div className="text-center pt-4">
                            <p className="text-gray-600">
                                لديك حساب بالفعل؟{" "}
                                <a
                                    href="/login"
                                    className="text-blue-600 hover:text-blue-800 font-semibold"
                                >
                                    تسجيل الدخول
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
