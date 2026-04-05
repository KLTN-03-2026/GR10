import { allCourses } from './../../data/home/courses';
import { showMessage } from "../../utils/showMessages";
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
export const createCartItem = async (_id: string) => {
  try {
    const token = localStorage.getItem("token");
    console.log("courseId:"+ _id + " token: " + token);
    const response = await axios.post(`${API_URL}/carts/create`, {  courseId: _id }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    showMessage("success", response.data.message);
    return response.data;
  } catch (error : any) {
    console.error("Lỗi tạo cart:", error);
    showMessage("error", error.response.data.message || "Đã xảy ra lỗi khi thêm vào giỏ hàng.");
    throw error;
  }
};
export const GetCartLength = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/carts/count`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error : any) {
    console.error("Lỗi tạo cart:", error);
    throw error;
  }
};
