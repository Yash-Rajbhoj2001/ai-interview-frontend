import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
 
function Subscription() {
  const navigate = useNavigate();
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  
 
  /* ================= STATE ================= */
 
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [autoRenew, setAutoRenew] = useState(true);

  const activePlan = "Free";
 
  /* ================= PLAN DATA ================= */
 
  const monthlyPlans = [
    {
      name: "Free",
      price: "₹0",
      description: "Perfect for beginners",
      features: [
        "1 Interview",
        "Basic AI Scoring",
        "Transcript Access"
      ],
      buttonText: "Current Plan"
    },
    {
      name: "Single",
      price: "₹99",
      description: "One detailed interview",
      features: [
        "1 Detailed Interview",
        "Full Feedback Report",
        "Downloadable Transcript"
      ],
      buttonText: "Buy Now"
    },
    {
      name: "Pro",
      price: "₹499/mo",
      description: "Best for serious candidates",
      features: [
        "10 Interviews / month",
        "Advanced AI Feedback",
        "Performance Analytics"
      ],
      buttonText: "Upgrade",
      highlighted: true
    },
    {
      name: "Premium",
      price: "₹999/mo",
      description: "Unlimited practice",
      features: [
        "Unlimited Interviews",
        "Deep AI Evaluation",
        "Priority Support"
      ],
      buttonText: "Go Premium"
    }
  ];
 
  const yearlyPlans = [
    {
      name: "Pro",
      price: "₹4999/yr",
      description: "Save with yearly billing",
      features: [
        "10 Interviews / month",
        "Advanced AI Feedback",
        "Performance Analytics"
      ],
      buttonText: "Upgrade",
      highlighted: true
    },
    {
      name: "Premium",
      price: "₹9999/yr",
      description: "Unlimited yearly access",
      features: [
        "Unlimited Interviews",
        "Deep AI Evaluation",
        "Priority Support"
      ],
      buttonText: "Go Premium"
    }
  ];
 
  const plans =
    billingCycle === "monthly" ? monthlyPlans : yearlyPlans;
 
  return (
    <div className="max-w-7xl mx-auto space-y-10">
 
      {/* ================= HEADER ================= */}
      <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-10 shadow-sm border border-gray-200/50">
        <h2 className="text-3xl font-semibold text-gray-900">
          Subscription & Billing
        </h2>
        <p className="text-gray-500 mt-2">
          Choose the plan that fits your goals.
        </p>
      </div>

      {/* ================= CURRENT PLAN + USAGE ================= */}

          <div className="grid md:grid-cols-2 gap-8">

            {/* CURRENT PLAN CARD */}
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-sm border border-gray-200/50">

              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Current Plan
              </h3>

              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl font-bold text-gray-900">
                  {activePlan}
                </span>

                <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-600">
                  Active
                </span>
              </div>

              {/* AUTO RENEW TOGGLE */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  Auto Renew
                </span>

                <button
                  onClick={() => setAutoRenew(!autoRenew)}
                  className={`w-12 h-6 rounded-full transition-all duration-300 ${
                    autoRenew ? "bg-indigo-600" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow transform transition-all duration-300 ${
                      autoRenew ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

            </div>

            {/* USAGE CARD */}
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-sm border border-gray-200/50">

              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Usage
              </h3>

              <p className="text-sm text-gray-600 mb-3">
                Interviews Used: 1 / 1
              </p>

              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-indigo-600 h-3 rounded-full"
                  style={{ width: "100%" }}
                />
              </div>

            </div>

          </div>
 
          {/* ================= BILLING TOGGLE ================= */}
          <div className="flex justify-center">
            <div className="relative w-64 bg-gray-200 rounded-full p-1 flex items-center overflow-hidden">

              {/* Animated Background Pill */}
              <motion.div
                layout
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className={`absolute top-1 bottom-1 w-1/2 rounded-full bg-white shadow-md ${
                  billingCycle === "monthly" ? "left-1" : "left-1/2"
                }`}
              />

              {/* Monthly Button */}
              <motion.button
                whileTap={{ scale: 0.94 }}
                animate={{
                  scale: billingCycle === "monthly" ? 1.05 : 1
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onClick={() => setBillingCycle("monthly")}
                className={`relative z-10 flex-1 py-2 text-sm font-medium transition-colors duration-300 ${
                  billingCycle === "monthly"
                    ? "text-gray-900"
                    : "text-gray-500"
                }`}
              >
                Monthly
              </motion.button>

              {/* Yearly Button */}
              <motion.button
                whileTap={{ scale: 0.94 }}
                animate={{
                  scale: billingCycle === "yearly" ? 1.05 : 1
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onClick={() => setBillingCycle("yearly")}
                className={`relative z-10 flex-1 py-2 text-sm font-medium transition-colors duration-300 ${
                  billingCycle === "yearly"
                    ? "text-gray-900"
                    : "text-gray-500"
                }`}
              >
                Yearly
              </motion.button>

            </div>
          </div>
 
      {/* ================= PLANS GRID ================= */}
 
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`grid gap-8 ${
          billingCycle === "monthly"
            ? "md:grid-cols-4"
            : "md:grid-cols-2"
        }`}
      >
        {plans.map((plan, index) => {
          const isActive = activePlan === plan.name;
 
          return (
            <div
              key={index}
              className={`relative rounded-3xl p-8 shadow-sm border transition-all duration-500 hover:-translate-y-3 hover:shadow-xl ${
                plan.highlighted
                  ? "bg-gradient-to-br from-indigo-600 to-indigo-500 text-white border-transparent scale-105"
                  : "bg-white/70 backdrop-blur-xl border-gray-200/50"
              }`}
            >
              {/* Active Badge */}
              {isActive && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs px-4 py-1 rounded-full shadow">
                  Active Plan
                </div>
              )}
 
              <h3
                className={`text-xl font-semibold ${
                  plan.highlighted
                    ? "text-white"
                    : "text-gray-900"
                }`}
              >
                {plan.name}
              </h3>
 
              <p
                className={`text-4xl font-bold mt-6 ${
                  plan.highlighted
                    ? "text-white"
                    : "text-gray-900"
                }`}
              >
                {plan.price}
              </p>
 
              <p
                className={`mt-3 text-sm ${
                  plan.highlighted
                    ? "text-indigo-100"
                    : "text-gray-500"
                }`}
              >
                {plan.description}
              </p>
 
              <ul
                className={`mt-8 space-y-3 text-sm ${
                  plan.highlighted
                    ? "text-indigo-100"
                    : "text-gray-600"
                }`}
              >
                {plan.features.map((feature, i) => (
                  <li key={i}>• {feature}</li>
                ))}
              </ul>
 
              {!isActive && plan.name !== "Free" && (
                <button
                  onClick={() =>
                    navigate(
                      `/payment/${plan.name.toLowerCase()}`
                    )
                  }
                  className={`mt-10 w-full py-3 rounded-2xl font-medium transition-all duration-300 ${
                    plan.highlighted
                      ? "bg-white text-indigo-600 hover:scale-[1.03]"
                      : "bg-gray-900 text-white hover:bg-black hover:scale-[1.03]"
                  }`}
                >
                  {plan.buttonText}
                </button>
              )}
            </div>
          );
        })}
      </motion.div>
 
             {/* ================= BILLING HISTORY ================= */}
 
      <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-sm border border-gray-200/50 mt-10">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">
          Billing History
        </h3>
 
        {/* Demo Data */}
        {[
          {
            id: 1,
            date: "2025-02-01",
            plan: "Single Plan",
            amount: "₹99",
            status: "Paid"
          },
          {
            id: 2,
            date: "2025-01-15",
            plan: "Pro Plan",
            amount: "₹499",
            status: "Paid"
          },
          {
            id: 3,
            date: "2025-01-05",
            plan: "Premium Plan",
            amount: "₹999",
            status: "Failed"
          }
        ].map((bill) => (
          <div
            key={bill.id}
            className={`flex justify-between items-center border-b last:border-none pb-4 mb-4 last:mb-0 ${
              bill.status === "Failed"
                ? "bg-red-50/60 rounded-2xl px-4 py-3"
                : ""
            }`}          >
            <div>
              <p className="text-sm font-medium text-gray-900">
                {bill.plan}
              </p>
              <p className="text-xs text-gray-500">
                {bill.date}
              </p>
            </div>
 
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">
                {bill.amount}
              </p>
 
              <span
                className={`text-xs px-3 py-1 rounded-full ${
                  bill.status === "Paid"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {bill.status}
              </span>
 
              <div>
                <button
                  onClick={() => setSelectedInvoice(bill)}
                  className="mt-2 text-xs text-indigo-600 hover:underline"
                >
                  View Invoice
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
                {/* ================= INVOICE MODEL ================= */}
        {selectedInvoice && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
 
            <div className="bg-white rounded-3xl w-full max-w-lg p-8 shadow-2xl relative">
 
              <button
                onClick={() => setSelectedInvoice(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
 
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Invoice Details
              </h3>
 
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex justify-between">
                  <span>Plan</span>
                  <span className="font-medium">{selectedInvoice.plan}</span>
                </div>
 
                <div className="flex justify-between">
                  <span>Date</span>
                  <span>{selectedInvoice.date}</span>
                </div>
 
                <div className="flex justify-between">
                  <span>Amount</span>
                  <span className="font-medium">{selectedInvoice.amount}</span>
                </div>
 
                <div className="flex justify-between">
                  <span>Status</span>
                  <span className="text-green-600 font-medium">
                    {selectedInvoice.status}
                  </span>
                </div>
 
                <div className="flex justify-between">
                  <span>Transaction ID</span>
                  <span>TXN{selectedInvoice.id}2025</span>
                </div>
              </div>
 
              <button
                className="mt-8 w-full py-3 rounded-2xl bg-gray-900 text-white hover:bg-black transition"
              >
                Download PDF
              </button>
 
            </div>
          </div>
        )}
 
    </div>
  );
}
 
export default Subscription;
 