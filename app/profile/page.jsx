"use client";
import { useState } from "react";
import { User, BookOpen, Shield, Settings, Menu, X } from "lucide-react";
import PersonalInfo from "../components/profile/PersonalInfo";
import MyCourses from "../components/profile/MyCourses";
import ChangePassword from "../components/profile/ChangePassword";
import SettingsSection from "../components/profile/Settings";

export default function ArabicDashboard() {
  const [activeSection, setActiveSection] = useState("personal");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [saveStates, setSaveStates] = useState({});

  const [userProfile, setUserProfile] = useState({
    fullName: "أحمد محمد علي",
    email: "ahmed.mohamed@example.com",
    phone: "+966501234567",
    gender: "ذكر",
    age: "28",
    nationality: "السعودية",
    currentCountry: "السعودية",
  });

  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    courseUpdates: true,
    systemAlerts: false,
  });

  const [selectedLanguage, setSelectedLanguage] = useState("ar");

  const enrolledCourses = [
    {
      id: "1",
      title: "أساسيات البرمجة بـ JavaScript",
      progress: 75,
      thumbnail: "/javascript-programming-course.png",
    },
    {
      id: "2",
      title: "تطوير المواقع باستخدام React",
      progress: 45,
      thumbnail: "/react-web-development-course.jpg",
    },
    {
      id: "3",
      title: "قواعد البيانات وSQL",
      progress: 90,
      thumbnail: "/database-sql-course.jpg",
    },
  ];

  const navigationItems = [
    { id: "personal", label: "البيانات الشخصية", icon: User },
    { id: "courses", label: "الدورات المسجلة", icon: BookOpen },
    { id: "security", label: "كلمة المرور / الأمان", icon: Shield },
    { id: "settings", label: "الإعدادات", icon: Settings },
  ];

  const handleSave = async (section) => {
    setSaveStates((prev) => ({ ...prev, [section]: "saving" }));
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const isSuccess = Math.random() > 0.2;
    setSaveStates((prev) => ({
      ...prev,
      [section]: isSuccess ? "success" : "error",
    }));
    setTimeout(
      () => setSaveStates((prev) => ({ ...prev, [section]: "idle" })),
      3000
    );
  };

  const renderContent = () => {
    switch (activeSection) {
      case "personal":
        return (
          <PersonalInfo
            userProfile={userProfile}
            setUserProfile={setUserProfile}
            handleSave={handleSave}
            saveStates={saveStates}
          />
        );
      case "courses":
        return <MyCourses enrolledCourses={enrolledCourses} />;
      case "security":
        return (
          <ChangePassword
            passwordForm={passwordForm}
            setPasswordForm={setPasswordForm}
            showPasswords={showPasswords}
            setShowPasswords={setShowPasswords}
            handleSave={handleSave}
            saveStates={saveStates}
          />
        );
      case "settings":
        return (
          <Settings
            notifications={notifications}
            setNotifications={setNotifications}
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
            handleSave={handleSave}
            saveStates={saveStates}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <header className="bg-gradient-to-l from-blue-600 via-blue-700 to-blue-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
              <h1 className="text-xl font-bold">منصة التعلم الإلكتروني</h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
              <span className="hidden sm:block font-medium">
                {userProfile.fullName}
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 space-y-2">
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
              <div className="text-center space-y-3">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <User className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {userProfile.fullName}
                  </h3>
                  <p className="text-sm text-gray-500">{userProfile.email}</p>
                </div>
              </div>

              <nav className="space-y-1">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-right transition-all duration-200 ${
                        activeSection === item.id
                          ? "bg-blue-600 text-white shadow-sm"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Mobile Tabs */}
          <div
            className={`lg:hidden ${
              isMobileMenuOpen ? "block" : "hidden"
            } mb-6`}
          >
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="grid grid-cols-2 gap-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveSection(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                        activeSection === item.id
                          ? "bg-blue-600 text-white"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <main className="flex-1">
            <div className="bg-white rounded-xl border border-gray-200 p-6 lg:p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2 text-gray-900">
                  {
                    navigationItems.find((item) => item.id === activeSection)
                      ?.label
                  }
                </h2>
                <div className="w-12 h-1 bg-blue-600 rounded-full" />
              </div>
              {renderContent()}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
