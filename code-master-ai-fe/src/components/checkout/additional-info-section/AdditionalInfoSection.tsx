import React from "react";
import { NotebookPen } from "lucide-react";
import type { CheckoutFormData } from "../../../types/checkout/checkout";

interface AdditionalInfoSectionProps {
  note: string;
  onChange: (field: keyof CheckoutFormData, value: string) => void;
}

const AdditionalInfoSection = ({
  note,
  onChange,
}: AdditionalInfoSectionProps) => {
  return (
    <section className="bg-white p-8 rounded-lg border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
      <div className="flex items-center gap-3 mb-8">
        <span className="material-symbols-outlined text-[#4a5d4e]">
          <NotebookPen />
        </span>
        <h2 className="text-xl font-bold text-slate-900">Thông tin bổ sung</h2>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Ghi chú đơn hàng (tùy chọn)
        </label>
        <textarea
          className="w-full rounded-lg border border-slate-200 focus:border-[#4a5d4e] focus:ring-2 focus:ring-[#4a5d4e]/10 p-4 bg-slate-50/50 outline-none"
          placeholder="Lưu ý về thời gian kích hoạt hoặc yêu cầu đặc biệt..."
          rows={3}
          value={note}
          onChange={(e) => onChange("note", e.target.value)}
        />
      </div>
    </section>
  );
};

export default AdditionalInfoSection;
