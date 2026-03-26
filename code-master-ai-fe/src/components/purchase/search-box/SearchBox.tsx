import { Search } from "lucide-react";

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBox = ({ value, onChange }: SearchBoxProps) => {
  return (
    <div className="relative w-full md:w-80">
      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 opacity-60">
        <Search />
      </span>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Tìm khóa học đã mua..."
        className="w-full rounded-2xl bg-white py-3 pl-12 pr-4 text-sm shadow-sm outline-none focus:ring-1 focus:ring-[#23422a]"
      />
    </div>
  );
};

export default SearchBox;
