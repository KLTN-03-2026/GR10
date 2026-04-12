import React, { useEffect, useState } from "react";
import Footer from "../../components/footer";
import { useNavigate, useParams } from "react-router-dom";
import {
  GetOrderDetail,
  OrderDetailResponse,
} from "../../api/order/HistoryOrder";
const formatCurrency = (value: number) =>
  new Intl.NumberFormat("vi-VN").format(value) + " VNĐ";

const formatDate = (date: string) => new Date(date).toLocaleString("vi-VN");

const mapStatus = (status: string) => {
  switch (status) {
    case "paid":
      return "Đã thanh toán";
    case "pending":
      return "Chờ thanh toán";
    case "cancelled":
      return "Đã hủy";
    default:
      return status;
  }
};
const PaymentSuccessContent: React.FC = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState<OrderDetailResponse["data"] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) {
        setError("Không tìm thấy mã đơn hàng");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const res = await GetOrderDetail(orderId);
        setOrder(res.data);
      } catch (err: any) {
        setError(
          err?.response?.data?.message || "Không thể lấy thông tin đơn hàng",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);
  return (
    <>
      <main className="relative mx-auto w-full px-6 lg:px-64 py-12 bg-[#fcfcf9] min-h-screen overflow-hidden">
        <div className="absolute inset-0 -z-10 pointer-events-none opacity-20">
          <div className="absolute -top-[10%] -left-[5%] w-[40%] h-[40%] bg-[#3a5a40] rounded-full blur-[120px]" />
          <div className="absolute bottom-[0%] right-[-10%] w-[35%] h-[35%] bg-[#ccead8] rounded-full blur-[100px]" />
        </div>

        <div className="relative mb-8 mx-auto w-fit">
          <div className="w-24 h-24 rounded-full bg-[#ccead8] flex items-center justify-center">
            <span className="text-[#23422a] text-5xl font-bold">✓</span>
          </div>

          <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-[#a5d2a2] opacity-60" />
          <div className="absolute bottom-2 -left-4 w-3 h-3 rounded-full bg-[#3a5a40] opacity-40" />
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#23422a] mb-4 leading-tight">
            Thanh toán thành công!
          </h1>
          <p className="text-lg text-[#424842] max-w-lg mx-auto leading-relaxed">
            Cảm ơn bạn đã tin tưởng CodeMaster AI. Khóa học của bạn đã được kích
            hoạt thành công.
          </p>
        </div>

        <div className="w-full bg-white rounded-2xl p-8 mb-12 shadow-[0px_12px_32px_rgba(52,78,65,0.08)]">
          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <span className="text-[0.75rem] font-semibold tracking-[0.05em] text-[#424842] uppercase block mb-1">
                  Mã đơn hàng
                </span>
                <p className="text-lg font-medium text-[#23422a]">abc</p>
              </div>

              <div>
                <span className="text-[0.75rem] font-semibold tracking-[0.05em] text-[#424842] uppercase block mb-1">
                  Trạng thái
                </span>
                <p className="text-lg font-medium text-[#23422a]">bcd</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <span className="text-[0.75rem] font-semibold tracking-[0.05em] text-[#424842] uppercase block mb-1">
                  Phương thức thanh toán
                </span>
                <p className="text-lg font-medium text-[#23422a]">
                  Thanh toán online
                </p>
              </div>

              <div>
                <span className="text-[0.75rem] font-semibold tracking-[0.05em] text-[#424842] uppercase block mb-1">
                  Tổng tiền
                </span>
                <p className="text-2xl font-bold text-[#23422a]">
                  {formatCurrency(1000)}
                </p>
              </div>
            </div>
          </div> */}
          {loading ? (
            <p className="text-center text-[#424842]">
              Đang tải thông tin đơn hàng...
            </p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : order ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <span className="text-lg font-bold tracking-[0.05em] text-[#424842] uppercase block mb-1">
                    Mã đơn hàng
                  </span>
                  <p className="text-[0.75 rem] font-medium text-[#23422a]">
                    {order._id}
                  </p>
                </div>

                <div>
                  <span className="text-lg font-bold tracking-[0.05em] text-[#424842] uppercase block mb-1">
                    Trạng thái
                  </span>
                  <p className="text-[0.75 rem] font-medium text-[#23422a]">
                    {mapStatus(order.status)}
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <span className="text-lg font-bold tracking-[0.05em] text-[#424842] uppercase block mb-1">
                    Phương thức thanh toán
                  </span>
                  <p className="text-[0.75 rem] font-medium text-[#23422a]">
                    Thanh toán online
                  </p>
                </div>

                <div>
                  <span className="text-lg font-bold tracking-[0.05em] text-[#424842] uppercase block mb-1">
                    Tổng tiền
                  </span>
                  <p className="text-[0.75 rem] font-medium text-[#23422a]">
                    {formatCurrency(order.total_price)}
                  </p>
                </div>

                <div>
                  <span className="text-lg font-bold tracking-[0.05em] text-[#424842] uppercase block mb-1">
                    Thời gian tạo đơn
                  </span>
                  <p className="text-[0.75 rem] font-medium text-[#23422a]">
                    {formatDate(order.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <div className="w-full mb-16 px-4">
          <h3 className="text-center text-lg font-bold tracking-[0.05em] text-[#424842] uppercase mb-8">
            Các bước tiếp theo
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#f1eee3] p-6 rounded-2xl transition-all hover:bg-[#ebe8de] group">
              <div className="w-10 h-10 rounded-full bg-[#ccead8] flex items-center justify-center mb-4 text-[#23422a] font-bold group-hover:scale-110 transition-transform">
                1
              </div>
              <p className="text-[#1c1c16] font-medium mb-2">
                Kiểm tra email xác nhận
              </p>
              <p className="text-sm text-[#424842]">
                Chúng tôi đã gửi hóa đơn và thông tin truy cập vào email của
                bạn.
              </p>
            </div>

            <div className="bg-[#f1eee3] p-6 rounded-2xl transition-all hover:bg-[#ebe8de] group">
              <div className="w-10 h-10 rounded-full bg-[#ccead8] flex items-center justify-center mb-4 text-[#23422a] font-bold group-hover:scale-110 transition-transform">
                2
              </div>
              <p className="text-[#1c1c16] font-medium mb-2">
                Truy cập vào lớp học
              </p>
              <p className="text-sm text-[#424842]">
                Vào mục "Khóa học của tôi" để xem danh sách bài giảng AI mới
                nhất.
              </p>
            </div>

            <div className="bg-[#f1eee3] p-6 rounded-2xl transition-all hover:bg-[#ebe8de] group">
              <div className="w-10 h-10 rounded-full bg-[#ccead8] flex items-center justify-center mb-4 text-[#23422a] font-bold group-hover:scale-110 transition-transform">
                3
              </div>
              <p className="text-[#1c1c16] font-medium mb-2">
                Bắt đầu hành trình
              </p>
              <p className="text-sm text-[#424842]">
                Bắt đầu bài học đầu tiên và tham gia cộng đồng CodeMaster.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <button
            type="button"
            onClick={() => navigate(`/order-detail/${orderId}`)}
            className="px-10 py-4 bg-gradient-to-br from-[#23422a] to-[#3a5a40] text-white rounded-full font-semibold text-lg hover:opacity-90 transition-all flex items-center justify-center gap-2"
          >
            Chi tiết đơn hàng
            <span>→</span>
          </button>
          <button
            type="button"
            onClick={() => navigate("/history-order")}
            className="px-10 py-4 bg-[#f7f3e9] text-[#23422a] border border-[#c2c8bf] rounded-full font-semibold text-lg hover:bg-[#ebe8de] transition-all flex items-center justify-center"
          >
            Xem lịch sử mua hàng
          </button>
        </div>

        <div className="mt-20 pt-12 text-center">
          <p className="text-[#424842] text-sm">
            Cần hỗ trợ? Liên hệ đội ngũ của chúng tôi tại{" "}
            <a
              className="text-[#23422a] font-medium underline underline-offset-4"
              href={`mailto:support@codemaster.ai`}
            >
              support@codemaster.ai
            </a>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PaymentSuccessContent;
