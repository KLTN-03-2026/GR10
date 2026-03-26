import React from "react";
import { Trash2 } from "lucide-react";

export interface CartItemData {
  id: string;
  title: string;
  price: string;
  description: string;
  instructor: string;
  image: string;
}

interface CartItemProps {
  item: CartItemData;
  onRemove: (id: string) => void;
}

export default function CartItem({ item, onRemove }: CartItemProps) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-50 flex flex-col sm:flex-row gap-6 items-center">
      <div className="w-full sm:w-44 h-28 rounded-xl overflow-hidden shrink-0">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url('${item.image}')` }}
        />
      </div>

      <div className="flex-1 w-full">
        <div className="flex justify-between items-start mb-1 gap-4">
          <h3 className="text-lg font-bold text-slate-800 leading-tight">
            {item.title}
          </h3>
          <span className="text-lg font-bold text-slate-800 whitespace-nowrap">
            {item.price}
          </span>
        </div>

        <p className="text-sm text-slate-500 mb-2">{item.description}</p>

        <div className="flex justify-between items-end">
          <p className="text-xs font-medium text-slate-400">
            Giảng viên: {item.instructor}
          </p>

          <button
            onClick={() => onRemove(item.id)}
            className="text-slate-400 hover:text-red-500 transition-colors"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
