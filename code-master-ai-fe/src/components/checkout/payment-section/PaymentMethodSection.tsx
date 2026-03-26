import React from "react";
import { Wallet, CircleCheck } from "lucide-react";
import type { CheckoutFormData } from "../../../types/checkout/checkout";

interface PaymentMethodSectionProps {
  paymentMethod: CheckoutFormData["paymentMethod"];
  onChange: (field: keyof CheckoutFormData, value: string) => void;
}

const PaymentMethodSection = ({
  paymentMethod,
  onChange,
}: PaymentMethodSectionProps) => {
  const methods = [
    {
      value: "momo",
      icon: "Ví Momo",
      title: "Ví Momo",
      // desc: "Vietcombank, Techcombank, MB Bank...",
    },
    {
      value: "vnpay",
      icon: "Ví VNPay",
      title: "Ví VNPay",
      // desc: "Momo, ZaloPay, ShopeePay",
    },
  ] as const;

  return (
    <section className="bg-white p-8 rounded-lg border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
      <div className="flex items-center gap-3 mb-8">
        <span className="material-symbols-outlined text-[#4a5d4e]">
          <Wallet />
        </span>
        <h2 className="text-xl font-bold text-slate-900">
          Phương thức thanh toán
        </h2>
      </div>

      <div className="space-y-4">
        {methods.map((method) => {
          const active = paymentMethod === method.value;

          return (
            <label
              key={method.value}
              className={`flex items-center justify-between p-5 rounded-lg border-2 transition-all cursor-pointer ${
                active
                  ? "border-[#4a5d4e] bg-[#4a5d4e]/5"
                  : "border-slate-200 hover:border-[#4a5d4e]"
              }`}
            >
              <div className="flex items-center gap-4">
                <input
                  checked={active}
                  className="text-[#4a5d4e] focus:ring-[#4a5d4e]"
                  name="payment"
                  type="radio"
                  onChange={() => onChange("paymentMethod", method.value)}
                />
                <div className="flex items-center gap-4">
                  <span
                    className={`material-symbols-outlined text-slate-600 p-2 rounded-md ${
                      active ? "bg-white shadow-sm" : "bg-slate-100"
                    }`}
                  >
                    {method.icon}
                  </span>
                  <div>
                    <p className="font-bold text-slate-900">{method.title}</p>
                    {/* <p className="text-xs text-slate-500">{method.desc}</p> */}
                  </div>
                </div>
              </div>

              {active && (
                <div className="flex gap-2 text-[#4a5d4e]">
                  <span className="material-symbols-outlined text-sm">
                    <CircleCheck />
                  </span>
                </div>
              )}
            </label>
          );
        })}
      </div>
    </section>
  );
};

export default PaymentMethodSection;
