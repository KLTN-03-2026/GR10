import React from "react";
import CustomerInfoSection from "../customer-info-section/CustomerInfoSection";
import PaymentMethodSection from "../payment-section/PaymentMethodSection";
import AdditionalInfoSection from "../additional-info-section/AdditionalInfoSection";
import type { CheckoutFormData } from "../../../types/checkout/checkout";

interface CheckoutFormProps {
  formData: CheckoutFormData;
  onChange: (field: keyof CheckoutFormData, value: string) => void;
}

const CheckoutForm = ({ formData, onChange }: CheckoutFormProps) => {
  return (
    <div className="lg:col-span-2 space-y-8">
      <CustomerInfoSection formData={formData} onChange={onChange} />
      <PaymentMethodSection
        paymentMethod={formData.paymentMethod}
        onChange={onChange}
      />
      <AdditionalInfoSection note={formData.note} onChange={onChange} />
    </div>
  );
};

export default CheckoutForm;
