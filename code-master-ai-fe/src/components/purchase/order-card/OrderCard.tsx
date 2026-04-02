

import type { PurchaseItem } from "../../../types/purchase/purchase";
import { Calendar, CreditCard } from "lucide-react";

interface OrderCardProps {
  order: PurchaseItem;
}

const statusMap = {
  paid: {
    label: "Thành công",
    badgeClass: "bg-[#ccead8] text-[#324c3f]",
    dotClass: "bg-[#23422a]",
  },
  pending: {
    label: "Đang xử lý",
    badgeClass: "bg-[#e6e2d8] text-[#424842]",
    dotClass: "bg-orange-500",
  },
  failed: {
    label: "Thất bại",
    badgeClass: "bg-[#ffdad6] text-[#93000a]",
    dotClass: "bg-[#ba1a1a]",
  },
} as const;

const fallbackImage = "https://via.placeholder.com/300x200?text=Course";

const OrderCard = ({ order }: OrderCardProps) => {
  const statusConfig = statusMap[order.status];
  const imageSrc = order.thumbnail || fallbackImage;

  return (
    <div className="flex flex-col gap-5 rounded-3xl border border-[#e6e2d8] bg-white p-5 shadow-sm transition hover:shadow-md md:flex-row md:items-center">
      <div className="h-28 w-full shrink-0 overflow-hidden rounded-2xl md:h-28 md:w-44">
        <img
          src={imageSrc}
          alt={order.title}
          className="h-full w-full object-cover"
          onError={(e) => {
            e.currentTarget.src = fallbackImage;
          }}
        />
      </div>

      <div className="grid flex-1 grid-cols-1 gap-4 lg:grid-cols-[1.8fr_0.8fr_0.8fr] lg:items-center">
        <div>
          <span className="mb-1 block text-[11px] font-bold uppercase tracking-widest text-[#23422a]/60">
            {order.typeLabel}
          </span>

          <h3 className="mb-2 text-lg font-semibold leading-snug text-[#23422a]">
            {order.title}
          </h3>

          <div className="flex flex-wrap gap-4 text-sm text-[#424842]">
            <span className="flex items-center gap-1.5">
              <Calendar size={16} />
              {order.date}
            </span>

            <span className="flex items-center gap-1.5">
              <CreditCard size={16} />
              {order.paymentMethod}
            </span>
          </div>
        </div>

        <div>
          <p className="mb-1 text-xs text-[#424842]/60">Tổng cộng</p>
          <p className="text-lg font-bold text-[#23422a]">{order.total}</p>
        </div>

        <div className="flex flex-col gap-3 lg:items-end">
          <span
            className={`inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold ${statusConfig.badgeClass}`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${statusConfig.dotClass}`}
            />
            {statusConfig.label}
          </span>

          <button
            type="button"
            className="rounded-xl bg-[#23422a] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#3a5a40]"
          >
            Xem chi tiết
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
