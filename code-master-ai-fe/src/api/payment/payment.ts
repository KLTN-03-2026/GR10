import axios from "axios";

const API_URL = "https://codeaimaster-kltn-2026-10.onrender.com/api/v1";

export interface CreatePaymentPayload {
  payment_method: "momo" | "vnpay";
}

export interface PaymentUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

export interface PaymentOrder {
  _id: string;
  user_id: string;
  total_price: number;
  status: "paid" | "pending" | "cancelled";
  createdAt: string;
  updatedAt: string;
}

export interface PaymentByOrderData {
  _id: string;
  user_id: PaymentUser;
  order_id: PaymentOrder;
  amount: number;
  payment_method: "momo" | "vnpay";
  payment_status: "paid" | "pending" | "failed";
  paid_at: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentByOrderResponse {
  message: string;
  data: PaymentByOrderData;
}

export const createPayment = async (payload: CreatePaymentPayload) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(`${API_URL}/payments/create`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Lỗi tạo thanh toán:", error);
    throw error;
  }
};

export const getMyPayments = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${API_URL}/payments/my-payments`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Lỗi lấy danh sách thanh toán:", error);
    throw error;
  }
};

export const getPaymentByOrderId = async (
  orderId: string,
): Promise<PaymentByOrderResponse> => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Không tìm thấy token đăng nhập");
    }

    const response = await axios.get<PaymentByOrderResponse>(
      `${API_URL}/payments/by-order/${orderId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    console.log("LẤY PAYMENT THEO ORDER THÀNH CÔNG:", response.data);

    return response.data;
  } catch (error: any) {
    console.error("LỖI LẤY PAYMENT THEO ORDER:", error.response?.data || error);
    throw error;
  }
};
