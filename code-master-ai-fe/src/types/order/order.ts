export type Course = {
  _id: string;
  title: string;
  description?: string;
  price: number;
  level?: string;
  thumbnail?: string;
  status?: string;
};

export type OrderCourseItem = {
  orderDetailId: string;
  purchasePrice: number;
  course: Course;
};

export type CustomerInfo = {
  name: string;
  email: string;
  paidAt: string;
};

export type PaymentInfo = {
  subtotal: number;
  discount: number;
  total: number;
  method: string;
};

export type OrderDetailData = {
  _id: string;
  code: string;
  status: "pending" | "paid" | "cancelled";
  createdAt: string;
  courses: OrderCourseItem[];
  payment: PaymentInfo;
  customer: CustomerInfo;
};
