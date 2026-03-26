import React from "react";
import type { CheckoutCourseItem } from "../../../types/checkout/checkout";

interface OrderItemProps {
  item: CheckoutCourseItem;
}

const OrderItem = ({ item }: OrderItemProps) => {
  return (
    <div className="flex gap-4">
      <div className="size-16 rounded-lg bg-white/10 overflow-hidden flex-shrink-0 border border-white/10">
        <img
          alt={item.title}
          className="w-full h-full object-cover"
          src={item.image}
        />
      </div>

      <div className="flex-1">
        <p className="text-sm font-bold leading-tight line-clamp-2">
          {item.title}
        </p>
        <p className="text-white/70 text-sm mt-1">
          {item.price.toLocaleString("vi-VN")}đ
        </p>
      </div>
    </div>
  );
};

export default OrderItem;