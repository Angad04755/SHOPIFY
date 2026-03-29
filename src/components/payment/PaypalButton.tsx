import React from "react";
import {
  FUNDING,
  PayPalButtons,
  PayPalScriptProvider,
} from "@paypal/react-paypal-js";
import { useSelector, UseSelector } from "react-redux";
interface PaypalButtonProps {
  amount: string;
  onSuccess: (details: any) => void;
  onError?: (error: any) => void;
}

const PaypalButton = ({ amount, onSuccess, onError }: PaypalButtonProps) => {
  const formattedAmount = Number(amount).toFixed(2);
  const isAuthenticaled = useSelector((state: any) => state.auth.isAuthinticated);
  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
        currency: "USD",
        intent: "capture",
      }}
    >
      <PayPalButtons disabled={!isAuthenticaled}
        fundingSource={FUNDING.PAYPAL}
        createOrder={(data, actions) =>
          actions.order.create({
            intent: "CAPTURE", // ✅ TS requires this
            purchase_units: [
              {
                amount: {
                  currency_code: "USD",
                  value: formattedAmount,
                },
              },
            ],
          })
        }
        onApprove={async (data, actions) => {
          if (!actions.order) return;
          const details = await actions.order.capture();
          onSuccess(details);
        }}
        onError={(err) => {
          console.error("PayPal Error:", err);
          onError?.(err);
        }}
      />
      {!isAuthenticaled && (
        <p className="text-red-500 text-base"> Please Sign in to checkout</p>
      )}
    </PayPalScriptProvider>
  );
};

export default PaypalButton;
