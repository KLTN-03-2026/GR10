import axios from "axios";

const API_URL = "https://codeaimaster-kltn-2026-10.onrender.com/api/v1";

export const getCartListQuick = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/carts/get`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Lỗi lấy cart:", error);
    throw error;
  }
};

export const removeCartItem = async (itemId: string) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`${API_URL}/carts/delete/${itemId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Lỗi xóa cart:", error);
    throw error;
  }
};
