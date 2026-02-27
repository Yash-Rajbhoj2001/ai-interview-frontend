import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";


function Payment() {
  const { plan } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const plans = {
    free: { name: "Free", price: "₹0", description: "Basic access plan" },
    single: { name: "Single", price: "₹99", description: "1 Detailed Interview" },
    pro: { name: "Pro", price: "₹499 / month", description: "10 Interviews + Analytics" },
    premium: { name: "Premium", price: "₹999 / month", description: "Unlimited Interviews" },
  };

  const selectedPlan = plans[plan];

  if (!selectedPlan) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Invalid Plan
      </div>
    );
  }

  // 🔥 Razorpay Integration Point
  const handlePayment = () => {
    /*
      Future Razorpay Code Goes Here

      Example:

      const options = {
        key: "YOUR_RAZORPAY_KEY",
        amount: 49900,
        currency: "INR",
        name: "AI Interview",
        description: selectedPlan.name,
        handler: function (response) {
          console.log(response);
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    */

    alert("Razorpay integration will go here.");
  };

  return (

    

    
    <div className="relative min-h-screen bg-white overflow-hidden">
        

      {/* Background Glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-indigo-200/40 rounded-full blur-3xl" />

      <div className="flex items-center justify-center min-h-screen px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-lg bg-white/80 backdrop-blur-xl border border-gray-200 rounded-3xl p-10 shadow-2xl"
        >
          <h2 className="text-3xl font-bold text-gray-900">
            Complete Your Purchase
          </h2>

          <p className="mt-3 text-gray-500">
            You selected the <span className="font-semibold text-gray-900">{selectedPlan.name}</span> plan.
          </p>

          <div className="mt-8 rounded-2xl bg-indigo-50 p-6 border border-indigo-100">
            <h3 className="text-xl font-semibold text-indigo-700">
              {selectedPlan.name}
            </h3>
            <p className="mt-2 text-gray-600">
              {selectedPlan.description}
            </p>
            <p className="mt-4 text-3xl font-bold text-gray-900">
              {selectedPlan.price}
            </p>
          </div>

          <button
            onClick={handlePayment}
            className="mt-8 w-full py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-medium shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
          >
            Pay Now
          </button>

          <button
            onClick={() => navigate(-1)}
            className="mt-4 w-full py-3 rounded-2xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition"
          >
            Cancel
          </button>

        </motion.div>
      </div>
    </div>
  );
}

export default Payment;