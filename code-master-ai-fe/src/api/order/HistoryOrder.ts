// // import axios from "axios";

// // const API_URL = "https://codeaimaster-kltn-2026-10.onrender.com/api/v1";

// // export interface OrderCourse {
// //   _id: string;
// //   title: string;
// //   price: number;
// //   level: string;
// //   thumbnail: string;
// // }

// // export interface OrderDetailItem {
// //   _id: string;
// //   price: number;
// //   createdAt: string;
// //   updatedAt: string;
// //   course: OrderCourse;
// // }

// // export interface OrderItem {
// //   _id: string;
// //   user_id: string;
// //   total_price: number;
// //   status: string;
// //   createdAt: string;
// //   updatedAt: string;
// //   __v?: number;
// //   orderDetails: OrderDetailItem[];
// //   firstCourseImage: string | null;
// // }

// // export interface HistoryOrderResponse {
// //   message: string;
// //   data: {
// //     results: OrderItem[];
// //     totalItems: number;
// //     totalPages: number;
// //     current: number;
// //     pageSize: number;
// //   };
// // }

// // interface GetHistoryOrderParams {
// //   current?: number;
// //   pageSize?: number;
// //   status?: string;
// // }

// // export interface OrderDetailResponse {
// //   message: string;
// //   data: {
// //     _id: string;
// //     user_id: string;
// //     total_price: number;
// //     status: string;
// //     createdAt: string;
// //     updatedAt: string;
// //     __v?: number;
// //   };
// // }

// // export const GetHistoryOrder = async (
// //   params: GetHistoryOrderParams = {},
// // ): Promise<HistoryOrderResponse> => {
// //   const token = localStorage.getItem("token");

// //   if (!token) {
// //     throw new Error("Không tìm thấy token đăng nhập");
// //   }

// //   const { current = 1, pageSize = 10, status } = params;

// //   const url = `${API_URL}/orders/my-orders`;

// //   try {
// //     const res = await axios.get<HistoryOrderResponse>(url, {
// //       headers: {
// //         Authorization: `Bearer ${token}`,
// //       },
// //       params: {
// //         current,
// //         pageSize,
// //         ...(status ? { status } : {}),
// //       },
// //     });

// //     console.log("LẤY LỊCH SỬ ĐƠN HÀNG THÀNH CÔNG:", res.data);
// //     return res.data;
// //   } catch (err: any) {
// //     console.log("LẤY LỊCH SỬ ĐƠN HÀNG THẤT BẠI:", err.response?.data || err);
// //     throw err;
// //   }
// // };

// // export const GetOrderById = async (
// //   orderId: string,
// // ): Promise<OrderDetailResponse> => {
// //   const token = localStorage.getItem("token");

// //   if (!token) {
// //     throw new Error("Không tìm thấy token đăng nhập");
// //   }

// //   try {
// //     const res = await axios.get<OrderDetailResponse>(
// //       `${API_URL}/orders/${orderId}`,
// //       {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //         },
// //       },
// //     );

// //     console.log("LẤY CHI TIẾT ĐƠN HÀNG THÀNH CÔNG:", res.data);
// //     return res.data;
// //   } catch (err: any) {
// //     console.log("LẤY CHI TIẾT ĐƠN HÀNG THẤT BẠI:", err.response?.data || err);
// //     throw err;
// //   }
// // };

// import axios from "axios";

// const API_URL = "http://localhost:3000/api/v1";

// export interface OrderCourse {
//   _id: string;
//   title: string;
//   price: number;
//   level: string;
//   thumbnail: string;
// }

// export interface OrderDetailItem {
//   _id: string;
//   price: number;
//   createdAt: string;
//   updatedAt: string;
//   course: OrderCourse;
// }

// export interface OrderItem {
//   _id: string;
//   user_id: string;
//   total_price: number;
//   status: string;
//   createdAt: string;
//   updatedAt: string;
//   __v?: number;
//   orderDetails: OrderDetailItem[];
//   firstCourseImage: string | null;
// }

// export interface HistoryOrderResponse {
//   message: string;
//   data: {
//     results: OrderItem[];
//     totalItems: number;
//     totalPages: number;
//     current: number;
//     pageSize: number;
//   };
// }

// interface GetHistoryOrderParams {
//   current?: number;
//   pageSize?: number;
//   status?: string;
// }

// export interface OrderCourseDetail {
//   _id: string;
//   title: string;
//   description: string;
//   price: number;
//   level: string;
//   thumbnail: string;
//   status: string;
//   category: string;
//   createdAt: string;
//   updatedAt: string;
//   __v?: number;
// }

// export interface OrderCourseItemDetail {
//   orderDetailId: string;
//   purchasePrice: number;
//   course: OrderCourseDetail;
// }

// export interface OrderDetailData {
//   _id: string;
//   user_id: string;
//   total_price: number;
//   status: string;
//   createdAt: string;
//   updatedAt: string;
//   __v?: number;
//   courses: OrderCourseItemDetail[];
// }

// export interface OrderDetailResponse {
//   message: string;
//   data: OrderDetailData;
// }

// export const GetHistoryOrder = async (
//   params: GetHistoryOrderParams = {},
// ): Promise<HistoryOrderResponse> => {
//   const token = localStorage.getItem("token");

//   if (!token) {
//     throw new Error("Không tìm thấy token đăng nhập");
//   }

//   const { current = 1, pageSize = 10, status } = params;
//   const url = `${API_URL}/orders/my-orders`;

//   try {
//     const res = await axios.get<HistoryOrderResponse>(url, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       params: {
//         current,
//         pageSize,
//         ...(status ? { status } : {}),
//       },
//     });

//     console.log("LẤY LỊCH SỬ ĐƠN HÀNG THÀNH CÔNG:", res.data);
//     return res.data;
//   } catch (err: any) {
//     console.log("LẤY LỊCH SỬ ĐƠN HÀNG THẤT BẠI:", err.response?.data || err);
//     throw err;
//   }
// };

// export const GetOrderDetail = async (
//   orderId: string,
// ): Promise<OrderDetailResponse> => {
//   const token = localStorage.getItem("token");

//   if (!token) {
//     throw new Error("Không tìm thấy token đăng nhập");
//   }

//   try {
//     const res = await axios.get<OrderDetailResponse>(
//       `${API_URL}/orders/${orderId}`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       },
//     );

//     console.log("LẤY CHI TIẾT ĐƠN HÀNG THÀNH CÔNG:", res.data);
//     return res.data;
//   } catch (err: any) {
//     console.log("LẤY CHI TIẾT ĐƠN HÀNG THẤT BẠI:", err.response?.data || err);
//     throw err;
//   }
// };

import axios from "axios";

const API_URL = "https://codeaimaster-kltn-2026-10.onrender.com/api/v1";

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
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Không tìm thấy token đăng nhập");
  }

  const { current = 1, pageSize = 10, status } = params;
  const url = `${API_URL}/orders/my-orders`;

  try {
    const res = await axios.get<HistoryOrderResponse>(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Không tìm thấy token đăng nhập");
  }

  try {
    const res = await axios.get<OrderDetailResponse>(
      `${API_URL}/orders/${orderId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    console.log("LẤY CHI TIẾT ĐƠN HÀNG THÀNH CÔNG:", res.data);
    return res.data;
  } catch (err: any) {
    console.log("LẤY CHI TIẾT ĐƠN HÀNG THẤT BẠI:", err.response?.data || err);
    throw err;
  }
};
