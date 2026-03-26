import React from "react";
import { User } from "lucide-react";
import type { CheckoutFormData } from "../../../types/checkout/checkout";

interface CustomerInfoSectionProps {
  formData: CheckoutFormData;
  onChange: (field: keyof CheckoutFormData, value: string) => void;
}

const CustomerInfoSection = ({
  formData,
  onChange,
}: CustomerInfoSectionProps) => {
  return (
    <section className="bg-white p-8 rounded-lg border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
      <div className="flex items-center gap-3 mb-8">
        <span className="material-symbols-outlined text-[#4a5d4e]">
          <User />
        </span>
        <h2 className="text-xl font-bold text-slate-900">
          Thông tin khách hàng
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Họ và tên
          </label>
          <input
            className="w-full rounded-lg border border-slate-200 focus:border-[#4a5d4e] focus:ring-2 focus:ring-[#4a5d4e]/10 p-4 bg-slate-50/50 outline-none"
            placeholder="Nguyễn Văn A"
            type="text"
            value={formData.fullName}
            onChange={(e) => onChange("fullName", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Email
          </label>
          <input
            className="w-full rounded-lg border border-slate-200 focus:border-[#4a5d4e] focus:ring-2 focus:ring-[#4a5d4e]/10 p-4 bg-slate-50/50 outline-none"
            placeholder="email@vi-du.com"
            type="email"
            value={formData.email}
            onChange={(e) => onChange("email", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Số điện thoại
          </label>
          <input
            className="w-full rounded-lg border border-slate-200 focus:border-[#4a5d4e] focus:ring-2 focus:ring-[#4a5d4e]/10 p-4 bg-slate-50/50 outline-none"
            placeholder="090 123 4567"
            type="tel"
            value={formData.phone}
            onChange={(e) => onChange("phone", e.target.value)}
          />
        </div>
      </div>
    </section>
  );
};

export default CustomerInfoSection;
