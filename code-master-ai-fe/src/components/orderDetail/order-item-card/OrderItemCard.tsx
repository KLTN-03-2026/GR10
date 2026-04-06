import React from "react";
import type { OrderCourseItem } from "../../../types/order/order";

type Props = {
  item: OrderCourseItem;
};

const formatPrice = (price: number) => {
  return price.toLocaleString("vi-VN") + "đ";
};

const OrderItemCard: React.FC<Props> = ({ item }) => {
  return (
    <div className="p-8 flex flex-col sm:flex-row gap-6 items-center">
      <div className="w-full sm:w-40 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
        <img
          src={item.course.thumbnail || "https://via.placeholder.com/300x200"}
          alt={item.course.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-grow text-center sm:text-left">
        <h4 className="text-lg font-semibold text-[#23422a] mb-1">
          {item.course.title}
        </h4>
        <p className="text-sm text-[#6b7280] mb-4">
          Trình độ: {item.course.level || "Đang cập nhật"}
        </p>

        <button className="inline-flex items-center gap-2 text-[#23422a] font-bold text-sm hover:underline underline-offset-4">
          Tiếp tục học
        </button>
      </div>

      <div className="text-lg font-bold text-[#23422a]">
        {formatPrice(item.course.price)}
      </div>
    </div>
  );
};

export default OrderItemCard;
