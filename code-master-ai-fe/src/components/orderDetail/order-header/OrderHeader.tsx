import React from "react";

type Props = {
  orderCode: string;
  status: "pending" | "paid" | "cancelled";
  createdAt: string;
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("vi-VN");
};

const getStatusLabel = (status: Props["status"]) => {
  switch (status) {
    case "paid":
      return "Thành công";
    case "pending":
      return "Chờ thanh toán";
    case "cancelled":
      return "Đã hủy";
    default:
      return "Không xác định";
  }
};

const getStatusClass = (status: Props["status"]) => {
  switch (status) {
    case "paid":
      return "bg-green-100 text-green-700";
    case "pending":
      return "bg-yellow-100 text-yellow-700";
    case "cancelled":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const OrderHeader: React.FC<Props> = ({ orderCode, status, createdAt }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-[#23422a] tracking-tight">
          Chi tiết đơn hàng #{orderCode}
        </h1>
        <div className="flex items-center gap-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase ${getStatusClass(
              status,
            )}`}
          >
            {getStatusLabel(status)}
          </span>
          <span className="text-[#6b7280] text-sm">
            Đặt ngày {formatDate(createdAt)}
          </span>
        </div>
      </div>

      <button className="flex items-center gap-2 bg-[#ece7db] text-[#23422a] px-5 py-3 rounded-xl font-semibold text-sm hover:opacity-90 transition-colors">
        Tải hóa đơn
      </button>
    </div>
  );
};

export default OrderHeader;
