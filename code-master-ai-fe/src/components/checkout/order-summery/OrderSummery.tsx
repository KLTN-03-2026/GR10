import React from "react";
import {
  MoveRight,
  ShieldEllipsis,
  Landmark,
  CreditCard,
  Wallet2,
  ShieldCheck,
} from "lucide-react";

import OrderItem from "../order-item/OrderItem";
import type {
  CheckoutCourseItem,
  CheckoutSummary,
} from "../../../types/checkout/checkout";

interface OrderSummaryProps {
  items: CheckoutCourseItem[];
  summary: CheckoutSummary;
  onSubmit?: () => void;
}

const OrderSummary = ({ items, summary, onSubmit }: OrderSummaryProps) => {
  return (
    <div className="lg:col-span-1">
      <div className="sticky top-28 space-y-6">
        <div className="bg-[#4a5d4e] p-8 rounded-lg text-white shadow-xl shadow-[#4a5d4e]/10">
          <h2 className="text-xl font-bold mb-8 border-b border-white/10 pb-4">
            Đơn hàng của bạn
          </h2>

          <div className="space-y-6 mb-10">
            {items.map((item) => (
              <OrderItem key={item.id} item={item} />
            ))}
          </div>

          <div className="space-y-3 pt-6 border-t border-white/10 mb-10">
            <div className="flex justify-between text-white/80 text-sm">
              <span>Tạm tính</span>
              <span>{summary.subtotal.toLocaleString("vi-VN")}đ</span>
            </div>
            <div className="flex justify-between text-white/80 text-sm">
              <span>Giảm giá</span>
              <span>- {summary.discount.toLocaleString("vi-VN")}đ</span>
            </div>
            <div className="flex justify-between text-xl font-bold pt-4">
              <span>Tổng cộng</span>
              <span>{summary.total.toLocaleString("vi-VN")}đ</span>
            </div>
          </div>

          <button
            onClick={onSubmit}
            className="w-full bg-white text-[#4a5d4e] hover:bg-[#F9F7F2] py-4 rounded-lg font-bold transition-all flex items-center justify-center gap-2 group"
          >
            <span>Xác nhận thanh toán</span>
            <span className="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-1">
              <MoveRight />
            </span>
          </button>

          <div className="mt-8 flex flex-col items-center gap-4">
            <div className="flex items-center gap-2 text-xs text-white/60">
              <span className="material-symbols-outlined text-[14px]">
                <ShieldEllipsis />
              </span>
              Thanh toán an toàn & bảo mật 256-bit
            </div>

            <div className="flex gap-4 opacity-50 grayscale brightness-200">
              <span className="material-symbols-outlined text-[24px]">
                <CreditCard />
              </span>
              <span className="material-symbols-outlined text-[24px]">
                <Wallet2 />
              </span>
              <span className="material-symbols-outlined text-[24px]">
                <Landmark />
              </span>
            </div>
          </div>
        </div>

        <div className="bg-[#F9F7F2] p-5 rounded-lg flex items-start gap-4 border border-[#869484]/10">
          <div className="bg-white p-2 rounded-full shadow-sm">
            <span className="material-symbols-outlined text-[#4a5d4e]">
              <ShieldCheck />
            </span>
          </div>
          <div className="text-xs text-slate-600 leading-relaxed">
            <p className="font-bold text-slate-800 text-sm mb-1">
              Cam kết hoàn tiền
            </p>
            <p>
              Hoàn trả 100% học phí trong vòng 7 ngày nếu bạn không hài lòng với
              nội dung khóa học.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
