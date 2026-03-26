import { useMemo, useState } from "react";
import { purchaseHistoryData } from "../../data/purchase/purchaseHistory";
import type { OrderStatus } from "../../types/purchase/purchase";
import EmptyState from "../../components/purchase/empty-state/EmptyState";
import OrderCard from "../../components/purchase/order-card/OrderCard";
import SearchBox from "../../components/purchase/search-box/SearchBox";
import StatusFilter from "../../components/purchase/status-fillter/StatusFilter";
import Footer from "../../components/footer";
type FilterValue = "all" | OrderStatus;

const PurchaseHistoryContent = () => {
  const [activeFilter, setActiveFilter] = useState<FilterValue>("all");
  const [searchKeyword, setSearchKeyword] = useState("");

  const filteredOrders = useMemo(() => {
    const keyword = searchKeyword.trim().toLowerCase();

    return purchaseHistoryData.filter((item) => {
      const matchStatus =
        activeFilter === "all" ? true : item.status === activeFilter;

      const matchSearch =
        keyword === "" ||
        item.title.toLowerCase().includes(keyword) ||
        item.typeLabel.toLowerCase().includes(keyword) ||
        item.paymentMethod.toLowerCase().includes(keyword);

      return matchStatus && matchSearch;
    });
  }, [activeFilter, searchKeyword]);

  return (
    <>
      <section className="mx-auto w-full max-w-7xl px-6 py-10 md:px-8 md:py-12">
        <div className="mb-10">
          <h1 className="mb-3 text-3xl font-bold tracking-tight text-[#23422a] md:text-5xl">
            Lịch sử mua hàng
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-[#424842] md:text-lg">
            Xem lại các khóa học bạn đã mua và theo dõi trạng thái thanh toán
            một cách trực quan, rõ ràng.
          </p>
        </div>

        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <StatusFilter
            activeFilter={activeFilter}
            onChange={setActiveFilter}
          />

          <SearchBox value={searchKeyword} onChange={setSearchKeyword} />
        </div>

        {filteredOrders.length > 0 ? (
          <div className="space-y-5">
            {filteredOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </section>
      <Footer></Footer>
    </>
  );
};

export default PurchaseHistoryContent;
