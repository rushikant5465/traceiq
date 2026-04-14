import { useState } from "react";
import { PayPalPlanCheckout } from "./PayPalPlanCheckout.jsx";

const Button = ({ children, className = "", ...props }) => (
  <button
    className={`px-6 py-3 rounded-xl font-medium transition transform hover:scale-105 ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default function App() {
  const [billing, setBilling] = useState("monthly");
  const planAmount = billing === "monthly" ? "1.00" : "1.00";
  const planLabel = billing === "monthly" ? "Monthly Pro Plan" : "Yearly Pro Plan";
  const paypalClientId = import.meta.env.VITE_PAYPAL_CLIENT_ID ?? "";

  const handleBillingChange = (nextBilling) => {
    setBilling(nextBilling);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0a0a23] to-black text-white scroll-smooth">
      {/* Navbar */}
      <div className="flex justify-between items-center px-8 py-4">
        <h1 className="text-lg font-semibold text-indigo-400">TraceIQ</h1>
        <div className="space-x-6 text-sm text-gray-300">
          <a href="#features" className="hover:text-white">Features</a>
          <a href="#pricing" className="hover:text-white">Pricing</a>
          <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
            Get Started
          </Button>
        </div>
      </div>

      {/* Hero */}
      <section className="text-center py-24 px-6">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Debug smarter, ship faster <span className="text-purple-400">with TraceIQ</span>
        </h1>

        <p className="text-gray-400 max-w-2xl mx-auto mb-8">
          Capture screenshots, logs, and user sessions automatically — fix bugs with full context, not guesswork.
        </p>

        <div className="flex justify-center gap-4">
          <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
            Try TraceIQ Free →
          </Button>
          <Button className="border border-gray-600 hover:bg-gray-800">
            View Demo
          </Button>
        </div>

        <p className="mt-6 text-xs text-gray-500">⚡ Setup in 2 mins • No performance impact</p>

        {/* Dashboard Preview */}
        <div className="mt-16 flex justify-center">
          <div className="w-full max-w-5xl rounded-2xl shadow-2xl border border-gray-800 bg-[#0f0f2d] p-6">
            <div className="text-left text-sm text-gray-400 mb-3">
              TraceIQ Dashboard (Preview)
            </div>
            <div className="bg-black rounded-xl h-72 flex items-center justify-center text-gray-600">
              Bug Reports • Logs • Sessions UI
            </div>
          </div>
        </div>

        {/* Social Proof */}
        <p className="mt-10 text-gray-500 text-sm">
          Trusted by 100+ developers • Used in production apps
        </p>
      </section>

      {/* Why TraceIQ */}
      <section className="py-16 px-8 text-center">
        <h2 className="text-2xl mb-10">Why TraceIQ?</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            "🚀 Faster debugging with full context",
            "🧠 Developer-first, no clutter",
            "⚡ Lightweight, no app slowdown",
          ].map((item, i) => (
            <div key={i} className="p-6 border border-gray-800 rounded-xl bg-[#0f0f2d]">
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-8">
        <h2 className="text-2xl font-semibold text-center mb-12 text-gray-200">
          Everything you need to debug faster
        </h2>

        <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[
            {
              title: "📸 Instant Screenshots",
              desc: "Capture bugs exactly as users see them",
            },
            {
              title: "📦 Smart Log Bundling",
              desc: "All logs auto-attached. No manual digging",
            },
            {
              title: "🎥 Screen Recording",
              desc: "Replay user actions before the crash",
            },
            {
              title: "⚡ Lightweight SDK",
              desc: "Integrate in minutes, no performance hit",
            },
          ].map((f, i) => (
            <div
              key={i}
              className="p-5 rounded-xl border border-gray-800 bg-[#0f0f2d] hover:border-purple-500 hover:shadow-[0_0_25px_rgba(168,85,247,0.3)] hover:-translate-y-1 transition"
            >
              <h3 className="text-sm font-semibold text-white mb-1">{f.title}</h3>
              <p className="text-xs text-gray-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-8 text-center">
        <h2 className="text-2xl mb-10">How it works</h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto text-left">
          {[
            {
              step: "1️⃣ Integrate SDK",
              desc: "Add TraceIQ in minutes to your app",
            },
            {
              step: "2️⃣ Capture Bugs",
              desc: "Users report with screenshots & logs",
            },
            {
              step: "3️⃣ Fix Faster",
              desc: "Get full context and resolve instantly",
            },
          ].map((s, i) => (
            <div key={i} className="p-6 border border-gray-800 rounded-xl bg-[#0f0f2d]">
              <h3 className="font-semibold mb-2">{s.step}</h3>
              <p className="text-gray-400 text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 text-center">
        <h2 className="text-2xl mb-6">Simple Pricing</h2>

        <div className="flex justify-center gap-4 mb-8">
          <button
            className={`px-4 py-2 rounded ${billing === "monthly" ? "bg-white text-black" : "border border-gray-600"}`}
            onClick={() => handleBillingChange("monthly")}
          >
            Monthly
          </button>
          <button
            className={`px-4 py-2 rounded ${billing === "yearly" ? "bg-white text-black" : "border border-gray-600"}`}
            onClick={() => handleBillingChange("yearly")}
          >
            Yearly
          </button>
        </div>

        {paypalClientId ? (
          <PayPalPlanCheckout
            clientId={paypalClientId}
            billing={billing}
            planAmount={planAmount}
            planLabel={planLabel}
          />
        ) : (
          <p className="max-w-sm mx-auto text-sm text-amber-400">
            Set <code className="text-amber-200">VITE_PAYPAL_CLIENT_ID</code> in{" "}
            <code className="text-amber-200">.env.development</code> or{" "}
            <code className="text-amber-200">.env.production</code>. See{" "}
            <code className="text-amber-200">.env.example</code>.
          </p>
        )}
      </section>

      {/* Footer */}
      <footer className="text-center py-8 text-gray-500 text-sm">
        © 2026 TraceIQ • Built for developers
      </footer>
    </div>
  );
}