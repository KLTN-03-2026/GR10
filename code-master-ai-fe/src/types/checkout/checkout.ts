export interface CheckoutFormData {
  fullName: string;
  email: string;
  phone: string;
  note: string;
  paymentMethod: "momo" | "vnpay";
}

export interface CheckoutCourseItem {
  id: string;
  title: string;
  price: number;
  image: string;
}

export interface CheckoutSummary {
  subtotal: number;
  discount: number;
  total: number;
}
