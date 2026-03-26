import axios from "axios";

const API_URL = "http://localhost:3000/api/v1";

export interface CreatePaymentPayload {
  payment_method: "momo" | "vnpay";
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
