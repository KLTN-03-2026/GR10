export type OrderStatus = "paid" | "pending" | "failed";

export interface PurchaseItem {
  id: string;
  typeLabel: string;
  title: string;
  date: string;
  paymentMethod: string;
  total: string;
  status: OrderStatus;
  thumbnail: string;
}
