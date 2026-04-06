import React from "react";

type Props = {
  status: "pending" | "paid" | "cancelled";
};

const OrderTimeline: React.FC<Props> = ({ status }) => {
  const isPaid = status === "paid";

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm">
      <h3 className="text-sm font-semibold text-[#6b7280] uppercase tracking-widest mb-8">
        Tiến trình đơn hàng
      </h3>

      <div className="flex items-center justify-between relative px-4">
        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-[#e5e7eb] -translate-y-1/2 z-0" />
        <div
          className={`absolute top-1/2 left-0 h-[2px] -translate-y-1/2 z-0 bg-[#23422a] ${
            isPaid ? "w-full" : "w-1/2"
          }`}
        />

        <div className="relative z-10 flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#23422a] flex items-center justify-center text-white">
            ✓
          </div>
          <span className="text-xs font-bold text-[#23422a]">Đã đặt hàng</span>
        </div>

        <div className="relative z-10 flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#23422a] flex items-center justify-center text-white">
            $
          </div>
          <span className="text-xs font-bold text-[#23422a]">
            {status === "cancelled" ? "Đã hủy" : "Đã thanh toán"}
          </span>
        </div>

        <div className="relative z-10 flex flex-col items-center gap-3">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              isPaid ? "bg-[#23422a] text-white" : "bg-[#e5e7eb] text-gray-500"
            }`}
          >
            ★
          </div>
          <span
            className={`text-xs font-bold ${
              isPaid ? "text-[#23422a]" : "text-gray-500"
            }`}
          >
            Hoàn tất
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderTimeline;