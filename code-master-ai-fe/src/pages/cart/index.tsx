import React, { useEffect, useState } from "react";
import CartItem, {
  CartItemData,
} from "../../components/cart/cart-item/CartItem";
import RecommendedSection from "../../components/cart/recommended/RecommendedSection";
import OrderSummary from "../../components/cart/order-summary/OrderSummary";
import Footer from "../../components/footer";
import { getCartListQuick, removeCartItem } from "../../api/cart";

const recommendedCourses = [
  {
    id: 1,
    title: "An ninh mạng cho người mới",
    price: "850.000đ",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAYcYtygdRE313omw7lm6O5CwdwDQjiN4nmyocivCDGsNrEa17LGafSFUQjr83UkgZG-QQuSSYrarsP9fsAxGvVJ5CWFQ2H6KIhJDUNleY7lKxQqWS5LJ1Uw7RFA3C8RP6MVvI0Eb7FqbtfG659frQvo6uRH3249UjI5ZOVLujPfWtvp1FVj8tSjw4ysaSRM2hh30b7mH5jaJxuiYxxP9A77YFRONL5O_06kU8JiZ1badVWo1ZJmQh9ooblGYzLMFSDEh7NX3BOD9TH",
  },
  {
    id: 2,
    title: "Machine Learning cơ bản",
    price: "1.500.000đ",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDuqNKzN6R2H6Ht3iLh87OFlbgDKp4HE3QdJ_hJjkL2IJjWjpPr0YuhFTyq62r49paXoEC_-x_GIdjBW2lfI8GnJf80Rg-31YvyG39JPQu1lHsJ3dLVDdvZoVlTmMslrUMXFOkcP9NQkCOZ2dEd6rBCQQtlB14E39_fR5KKdBVvGfn-W4CrybAclvlaD67xBR13BznFBtO9iqt0d8H5tWiOIkcL6JJ1TS8Ha1Zm76GVv7HrvrO3yU-4Tk8wSfHYuxl3msNYRc7P_bSO",
  },
  {
    id: 3,
    title: "Fullstack Web Development",
    price: "2.100.000đ",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBXsKXB2mqdlrnxkrY6q6N5JeipDlFfeb0VN5-yrigYWoR6P9NqiYRqAvH3dz9yBsUL8pebrf8BZqF3j8auLkimw66a9bKio4hKECNnv8-2e9EnDPV8ukp1nFRidNtgF1FZIxZjtpTT3buomvO_yxtOiv7uxusm3SughiE0BSFTVoTv_WiFyNrzi2xDz46h1IcemcZn2gsR0xWyrUerDveCMPnisrMyjOCLZi8YSKgdYGpP9tG1ldl4D_arl_wwTYE6jnKr4TFxFkt4",
  },
];

const Cart = () => {
  const [cartList, setCartList] = useState<CartItemData[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true);

        const res = await getCartListQuick();
        console.log("cart res =", res);

        const rawItems = Array.isArray(res?.data?.items) ? res.data.items : [];

        const mappedItems: CartItemData[] = rawItems.map((item: any) => ({
          id: item.course_id?._id || "",
          title: item.course_id?.title || "",
          price: `${Number(item.price || 0).toLocaleString("vi-VN")}đ`,
          description: item.course_id?.description || "",
          instructor: "Chưa cập nhật",
          image: item.course_id?.thumbnail || "",
        }));

        setCartList(mappedItems);
        setTotalPrice(Number(res?.data?.totalPrice || 0));
      } catch (error) {
        console.error("Lỗi load cart:", error);
        setCartList([]);
        setTotalPrice(0);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handleRemove = async (id: string) => {
    try {
      await removeCartItem(id);

      const removedItem = cartList.find((item) => item.id === id);

      setCartList((prev) => prev.filter((item) => item.id !== id));

      if (removedItem) {
        const priceNumber = Number(
          removedItem.price.replace(/\./g, "").replace("đ", ""),
        );

        setTotalPrice((prev) => Math.max(0, prev - priceNumber));
      }
    } catch (error) {
      console.error("Xóa sản phẩm lỗi:", error);
    }
  };

  return (
    <>
      <main className="mx-auto w-full px-6 lg:px-64 py-12 bg-[#fcfcf9] min-h-screen">
        <h1 className="text-3xl font-extrabold text-[#3a473c] mb-10 tracking-tight">
          Giỏ hàng của bạn
        </h1>

        {loading ? (
          <p>Đang tải giỏ hàng...</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-2 flex flex-col gap-6">
              {cartList.length > 0 ? (
                cartList.map((item) => (
                  <CartItem key={item.id} item={item} onRemove={handleRemove} />
                ))
              ) : (
                <p>Giỏ hàng của bạn đang trống.</p>
              )}

              <RecommendedSection courses={recommendedCourses} />
            </div>

            <div className="lg:col-span-1">
              <OrderSummary totalPrice={totalPrice} />
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default Cart;
