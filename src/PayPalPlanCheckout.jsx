import { useCallback, useMemo, useState } from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

/**
 * Standalone PayPal wallet checkout (no guest card / Pay Later / Venmo).
 * Those paths hit different sandbox services and often surface generic errors
 * while wallet login is what you need to validate first.
 */
export function PayPalPlanCheckout({ clientId, billing, planAmount, planLabel }) {
  const [paymentStatus, setPaymentStatus] = useState("");

  const paypalScriptOptions = useMemo(
    () => ({
      "client-id": clientId,
      currency: "USD",
      intent: "capture",
      components: "buttons", // ✅ ADD THIS
    }),
    [clientId],
  );

  const createOrder = useCallback(
    (_data, actions) =>
      actions.order.create({
        purchase_units: [
          {
            description: planLabel,
            amount: {
              currency_code: "USD",
              value: planAmount,
            },
          },
        ],
        application_context: {
          shipping_preference: "NO_SHIPPING",
        },
      }),
    [planAmount, planLabel],
  );

  return (
    <PayPalScriptProvider options={paypalScriptOptions}>
      <div className="max-w-sm mx-auto rounded-2xl p-8 border border-purple-500 bg-[#0f0f2d] shadow-[0_0_40px_rgba(168,85,247,0.2)]">
        <div className="text-xs text-purple-400 mb-2">🔥 MOST POPULAR</div>

        <h3 className="text-lg mb-2">Pro Plan</h3>

        <p className="text-3xl font-bold mb-4">
          {billing === "monthly" ? "$40/mo" : "$400/yr"}
        </p>

        <p className="text-gray-400 text-sm mb-6">
          Everything you need to ship bug-free apps
        </p>

        <p className="text-xs text-gray-500 mb-3 text-left">
          Sandbox: use the PayPal button and log in with a US Personal sandbox buyer. Guest card and Pay Later are
          turned off so wallet checkout is easier to debug.
        </p>

        <PayPalButtons
        fundingSource="paypal"
          style={{ layout: "vertical", color: "gold", shape: "rect", label: "paypal" }}
          forceReRender={[billing, planAmount, planLabel]}
          createOrder={createOrder}
          onApprove={async (data, actions) => {
            const details = await actions.order.capture();
            const payerName = details?.payer?.name?.given_name || "there";
            setPaymentStatus(`Payment successful. Thanks, ${payerName}!`);
          }}
          onCancel={() => setPaymentStatus("Checkout cancelled.")}
          onError={(err) => {
            console.error("PayPal checkout error:", err);
            setPaymentStatus("Payment failed. Check the browser console and try again.");
          }}
        >
          <p className="text-sm text-amber-400 text-left">
            PayPal marked this button ineligible for this client/account/region. Try another browser
            profile and verify the PayPal app is fully enabled for Checkout.
          </p>
        </PayPalButtons>
        {paymentStatus && (
          <p className="mt-4 text-sm text-gray-300" role="status">
            {paymentStatus}
          </p>
        )}
      </div>
    </PayPalScriptProvider>
  );
}
