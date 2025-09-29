"use client";
import { Bell, BookOpen, Shield, Trash2 } from "lucide-react";
import SaveButton from "./SaveButton";

export default function SettingsSection({
  notifications,
  setNotifications,
  selectedLanguage,
  setSelectedLanguage,
  handleSave,
  saveStates,
}) {
  return (
    <div className="space-y-8">
      {/* Notification Preferences */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          إعدادات الإشعارات
        </h3>
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={notifications.emailNotifications}
              onChange={(e) =>
                setNotifications({
                  ...notifications,
                  emailNotifications: e.target.checked,
                })
              }
              className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            />
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-gray-600" />
              <span className="text-gray-700">إشعارات البريد الإلكتروني</span>
            </div>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={notifications.courseUpdates}
              onChange={(e) =>
                setNotifications({
                  ...notifications,
                  courseUpdates: e.target.checked,
                })
              }
              className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            />
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-gray-600" />
              <span className="text-gray-700">تحديثات الدورات</span>
            </div>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={notifications.systemAlerts}
              onChange={(e) =>
                setNotifications({
                  ...notifications,
                  systemAlerts: e.target.checked,
                })
              }
              className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            />
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-gray-600" />
              <span className="text-gray-700">تنبيهات النظام</span>
            </div>
          </label>
        </div>
      </div>

      {/* Language */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">اللغة</h3>
        <div className="max-w-xs">
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            <option value="ar">العربية</option>
            <option value="en">English</option>
            <option value="fr">Français</option>
          </select>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="space-y-4 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-red-600">المنطقة الخطرة</h3>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Trash2 className="w-5 h-5 text-red-600 mt-0.5" />
            <div className="space-y-2">
              <h4 className="font-medium text-red-600">حذف الحساب</h4>
              <p className="text-sm text-gray-600">
                سيتم حذف حسابك وجميع بياناتك نهائياً. هذا الإجراء لا يمكن
                التراجع عنه.
              </p>
              <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium">
                حذف الحساب
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <SaveButton
          section="settings"
          handleSave={handleSave}
          saveStates={saveStates}
        />
      </div>
    </div>
  );
}
