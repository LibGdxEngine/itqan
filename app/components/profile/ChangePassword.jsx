"use client";
import { Eye, EyeOff } from "lucide-react";
import SaveButton from "./SaveButton";

export default function ChangePassword({
  passwordForm,
  setPasswordForm,
  showPasswords,
  setShowPasswords,
  handleSave,
  saveStates,
}) {
  return (
    <div className="space-y-6">
      <div className="max-w-md space-y-4">
        {["oldPassword", "newPassword", "confirmPassword"].map((field, idx) => {
          const labels = [
            "كلمة المرور الحالية",
            "كلمة المرور الجديدة",
            "تأكيد كلمة المرور الجديدة",
          ];
          const keys = ["old", "new", "confirm"];
          return (
            <div key={field}>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                {labels[idx]}
              </label>
              <div className="relative">
                <input
                  type={showPasswords[keys[idx]] ? "text" : "password"}
                  value={passwordForm[field]}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      [field]: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPasswords({
                      ...showPasswords,
                      [keys[idx]]: !showPasswords[keys[idx]],
                    })
                  }
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPasswords[keys[idx]] ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-end">
        <SaveButton
          section="security"
          handleSave={handleSave}
          saveStates={saveStates}
        />
      </div>
    </div>
  );
}
