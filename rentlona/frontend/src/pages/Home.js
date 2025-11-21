import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/listings?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate("/listings");
    }
  };

  const categories = [
    { name: "Property", icon: "🏠", link: "property" },
    { name: "Vehicles", icon: "🚗", link: "vehicles" },
    { name: "Electronics", icon: "💻", link: "electronics" },
    { name: "Furniture", icon: "🪑", link: "furniture" },
    { name: "Tools", icon: "🔧", link: "tools" },
    { name: "Sports", icon: "⚽", link: "sports" },
  ];

  const features = [
    { icon: "🔒", title: "Secure & Safe", desc: "Verified users and secure payment system for peace of mind" },
    { icon: "💰", title: "Save Money", desc: "Rent instead of buying expensive items you use occasionally" },
    { icon: "🌍", title: "Local Community", desc: "Connect with local owners and renters in your neighborhood" },
    { icon: "⚡", title: "Quick & Easy", desc: "Simple booking process with instant confirmations" },
  ];

  return (
    <div className="font-inter bg-white text-slate-800">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto px-4"
        >
          <h1 className="text-5xl font-bold mb-4">RentLONA</h1>
          <p className="text-lg mb-8 opacity-90">
            Rent anything you need, anytime, anywhere.
          </p>

          <div className="max-w-2xl mx-auto mb-8">
            <form
              onSubmit={handleSearch}
              className="flex bg-white rounded-full shadow-lg overflow-hidden"
            >
              <div className="flex-1 flex items-center px-6">
                <span className="text-gray-400 mr-3">🔍</span>
                <input
                  type="text"
                  placeholder="What are you looking to rent?"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 py-4 text-lg outline-none text-gray-700 placeholder-gray-400"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 font-semibold transition-colors duration-200 flex items-center"
              >
                <span className="mr-2">🔍</span>
                Search
              </button>
            </form>
          </div>

          <div className="flex justify-center gap-4 mt-6 flex-wrap">
            <Link
              to="/listings"
              className="bg-white text-blue-600 font-semibold py-3 px-6 rounded-xl shadow hover:bg-gray-100 transition"
            >
              Browse Listings
            </Link>
            <Link
              to="/create-listing"
              className="border border-white text-white font-semibold py-3 px-6 rounded-xl hover:bg-white hover:text-blue-600 transition"
            >
              List Your Item
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-10">Popular Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
            {categories.map((cat, i) => (
              <motion.div
                whileHover={{ y: -6 }}
                key={i}
                className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition text-center"
              >
                <div className="text-4xl mb-2">{cat.icon}</div>
                <Link
                  to={`/listings?category=${cat.link}`}
                  className="font-semibold text-slate-700 hover:text-blue-600"
                >
                  {cat.name}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 text-center">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {["Search & Browse", "Book & Pay", "Pick Up & Enjoy"].map(
              (title, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white p-8 rounded-xl shadow hover:shadow-lg"
                >
                  <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                    {index + 1}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{title}</h3>
                  <p className="text-slate-600">
                    {index === 0
                      ? "Find the perfect item from thousands of listings in your area."
                      : index === 1
                      ? "Secure booking with instant confirmation and safe payments."
                      : "Meet the owner, get your item, and enjoy your rental."}
                  </p>
                </motion.div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-12">Why Choose RentLONA?</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {features.map((f, i) => (
              <motion.div
                whileHover={{ y: -5 }}
                key={i}
                className="bg-white rounded-xl p-8 shadow hover:shadow-lg transition"
              >
                <div className="text-4xl mb-3">{f.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-slate-600">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
