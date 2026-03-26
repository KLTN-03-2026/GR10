const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center rounded-[32px] bg-[#f7f3e9] py-20 text-center">
      <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#e6e2d8]">
        <span className="material-symbols-outlined text-4xl text-[#23422a]/40">
          shopping_bag
        </span>
      </div>

      <h2 className="mb-2 text-2xl font-bold text-[#23422a]">
        Chưa có lịch sử mua hàng
      </h2>

      <p className="mb-6 max-w-md text-[#424842]">
        Bạn chưa có đơn hàng nào trong hệ thống. Hãy bắt đầu chọn khóa học phù
        hợp để học ngay.
      </p>

      <button
        type="button"
        className="rounded-2xl bg-[#23422a] px-8 py-3 font-semibold text-white transition hover:bg-[#3a5a40]"
      >
        Khám phá khóa học
      </button>
    </div>
  );
};

export default EmptyState;
