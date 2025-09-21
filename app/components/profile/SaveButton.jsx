"use client";
import { Save, CheckCircle, AlertCircle } from "lucide-react";

export default function SaveButton({ section, handleSave, saveStates }) {
  const state = saveStates[section] || "idle";

  return (
    <button
      onClick={() => handleSave(section)}
      disabled={state === "saving"}
      className={`
        flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200
        ${
          state === "saving"
            ? "bg-gray-100 text-gray-500 cursor-not-allowed"
            : ""
        }
        ${state === "success" ? "bg-green-600 text-white" : ""}
        ${state === "error" ? "bg-red-600 text-white" : ""}
        ${state === "idle" ? "bg-blue-600 text-white hover:bg-blue-700" : ""}
      `}
    >
      {state === "saving" && (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {state === "success" && <CheckCircle className="w-4 h-4" />}
      {state === "error" && <AlertCircle className="w-4 h-4" />}
      <Save className="w-4 h-4" />
      {state === "saving"
        ? "جاري الحفظ..."
        : state === "success"
        ? "تم الحفظ بنجاح"
        : state === "error"
        ? "خطأ في الحفظ"
        : "حفظ التغييرات"}
    </button>
  );
}
