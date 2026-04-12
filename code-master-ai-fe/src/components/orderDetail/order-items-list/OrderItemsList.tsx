import React from "react";
import type { OrderCourseItem } from "../../../types/order/order";
import OrderItemCard from "../order-item-card/OrderItemCard";

type Props = {
  courses: OrderCourseItem[];
};

const OrderItemsList: React.FC<Props> = ({ courses }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-sm font-semibold text-[#6b7280] uppercase tracking-widest">
          Sản phẩm trong đơn hàng
        </h3>
      </div>

      <div className="divide-y divide-gray-100">
        {courses.length > 0 ? (
          courses.map((item) => (
            <OrderItemCard key={item.orderDetailId} item={item} />
          ))
        ) : (
          <div className="p-8 text-center text-[#6b7280]">
            Đang tải đơn hàng ...
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderItemsList;
