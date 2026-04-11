import axios from "../../utils/axios";

export interface OrderCourse {
  _id: string;
  title: string;
  price: number;
  level: string;
  thumbnail: string;
}

export interface OrderDetailItem {
  _id: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  course: OrderCourse;
}

export interface OrderItem {
  _id: string;
  user_id: string;
  total_price: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
  orderDetails: OrderDetailItem[];
  firstCourseImage: string | null;
}

export interface HistoryOrderResponse {
  message: string;
  data: {
    results: OrderItem[];
    totalItems: number;
    totalPages: number;
    current: number;
    pageSize: number;
  };
}

interface GetHistoryOrderParams {
  current?: number;
  pageSize?: number;
  status?: string;
}

export interface OrderCourseDetail {
  _id: string;
  title: string;
  description: string;
  price: number;
  level: string;
  thumbnail: string;
  status: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface OrderCourseItemDetail {
  orderDetailId: string;
  purchasePrice: number;
  course: OrderCourseDetail;
}

export interface OrderDetailData {
  _id: string;
  user_id: string;
  total_price: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
  courses: OrderCourseItemDetail[];
}

export interface OrderDetailResponse {
  message: string;
  data: OrderDetailData;
}

export const GetHistoryOrder = async (
  params: GetHistoryOrderParams = {},
): Promise<HistoryOrderResponse> => {
  const { current = 1, pageSize = 10, status } = params;

  try {
    // Không cần nối API_URL và gán Token nữa vì axios custom đã lo
    const res = await axios.get<HistoryOrderResponse>("/orders/my-orders", {
      params: {
        current,
        pageSize,
        ...(status ? { status } : {}),
      },
    });

    console.log("LẤY LỊCH SỬ ĐƠN HÀNG THÀNH CÔNG:", res.data);
    return res.data;
  } catch (err: any) {
    console.log("LẤY LỊCH SỬ ĐƠN HÀNG THẤT BẠI:", err.response?.data || err);
    throw err;
  }
};

export const GetOrderDetail = async (
  orderId: string,
): Promise<OrderDetailResponse> => {
  try {
    // Code siêu ngắn gọn
    const res = await axios.get<OrderDetailResponse>(`/orders/${orderId}`);

    console.log("LẤY CHI TIẾT ĐƠN HÀNG THÀNH CÔNG:", res.data);
    return res.data;
  } catch (err: any) {
    console.log("LẤY CHI TIẾT ĐƠN HÀNG THẤT BẠI:", err.response?.data || err);
    throw err;
  }
};
