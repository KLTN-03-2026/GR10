import type { OrderStatus } from "../../../types/purchase/purchase";

type FilterValue = "all" | OrderStatus;

interface StatusFilterProps {
  activeFilter: FilterValue;
  onChange: (value: FilterValue) => void;
}

const options: { label: string; value: FilterValue }[] = [
  { label: "Tất cả", value: "all" },
  { label: "Thành công", value: "paid" },
  { label: "Đang xử lý", value: "pending" },
  { label: "Thất bại", value: "failed" },
];

const StatusFilter = ({ activeFilter, onChange }: StatusFilterProps) => {
  return (
    <div className="flex w-fit flex-wrap gap-2 rounded-2xl bg-[#f1eee3] p-1.5">
      {options.map((option) => {
        const isActive = activeFilter === option.value;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`rounded-xl px-5 py-2 text-sm transition ${
              isActive
                ? "bg-white font-semibold text-[#23422a] shadow-sm"
                : "font-medium text-[#424842] hover:bg-[#ebe8de]"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};

export default StatusFilter;