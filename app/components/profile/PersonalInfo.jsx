"use client";
import SaveButton from "./SaveButton";

export default function PersonalInfo({
  userProfile,
  setUserProfile,
  handleSave,
  saveStates,
}) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            الاسم الكامل
          </label>
          <input
            type="text"
            value={userProfile.full_name}
            onChange={(e) =>
              setUserProfile({ ...userProfile, full_name: e.target.value })
            }
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            البريد الإلكتروني
          </label>
          <input
            type="email"
            value={userProfile.email}
            readOnly
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-500 cursor-not-allowed"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            رقم الهاتف (اختياري)
          </label>
          <input
            type="tel"
            value={userProfile.phone_number}
            onChange={(e) =>
              setUserProfile({ ...userProfile, phone_number: e.target.value })
            }
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            الجنس
          </label>
          <select
            value={userProfile.gender}
            onChange={(e) =>
              setUserProfile({ ...userProfile, gender: e.target.value })
            }
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            <option value="ذكر">ذكر</option>
            <option value="أنثى">أنثى</option>
          </select>
        </div>

        {/* Age */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            العمر
          </label>
          <input
            type="number"
            value={userProfile.age}
            onChange={(e) =>
              setUserProfile({ ...userProfile, age: e.target.value })
            }
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Nationality */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            الجنسية
          </label>
          <input
            type="text"
            value={userProfile.nationality}
            onChange={(e) =>
              setUserProfile({ ...userProfile, nationality: e.target.value })
            }
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Current Country */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            البلد الحالي
          </label>
          <input
            type="text"
            value={userProfile.country}
            onChange={(e) =>
              setUserProfile({ ...userProfile, country: e.target.value })
            }
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/*<div className="flex justify-end">*/}
      {/*  <SaveButton*/}
      {/*    section="personal"*/}
      {/*    handleSave={handleSave}*/}
      {/*    saveStates={saveStates}*/}
      {/*  />*/}
      {/*</div>*/}
    </div>
  );
}
