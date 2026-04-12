import { showMessage } from "../../utils/showMessages";
import {axiosInstance} from "../../utils/axios";

export const getCartListQuick = async () => {
  try {
    const response = await axiosInstance.get('/carts/get');
    return response.data;
  } catch (error) {
    console.error("Lỗi lấy cart:", error);
    throw error;
  }
};

export const removeCartItem = async (itemId: string) => {
  try {
    const response = await axiosInstance.delete(`/carts/delete/${itemId}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi xóa cart:", error);
    throw error;
  }
};

export const createCartItem = async (_id: string) => {
  try {
    const response = await axiosInstance.post('/carts/create', { courseId: _id });
    showMessage("success", response.data.message);
    return response.data;
  } catch (error: any) {
    console.error("Lỗi tạo cart:", error);
    showMessage("error", error.response?.data?.message || "Đã xảy ra lỗi khi thêm vào giỏ hàng.");
    throw error;
  }
};

export const GetCartLength = async () => {
  try {
    const response = await axiosInstance.get('/carts/count');
    return response.data;
  } catch (error: any) {
    console.error("Lỗi đếm cart:", error);
    throw error;
  }
};