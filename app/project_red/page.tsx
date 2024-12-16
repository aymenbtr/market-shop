"use client";
import React from 'react';
import Link from 'next/link';
import { ShoppingBag, Store } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 animate-pulse mb-6">
            Welcome to the Market-Zone
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Your trusted marketplace for buying and selling in Algeria. Join thousands of users and start your journey today.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <div className="flex items-center justify-center mb-6">
              <ShoppingBag className="w-12 h-12 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-center mb-4">Want to Buy?</h2>
            <p className="text-gray-600 text-center mb-8 text-lg">
              Discover amazing products from verified sellers across Algeria. Shop with confidence using our secure platform.
            </p>
            <button
              onClick={() => {
                console.log('Buyer flow initiated');
              }}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg text-lg font-semibold"
            >
              Start Shopping
            </button>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <div className="flex items-center justify-center mb-6">
              <Store className="w-12 h-12 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-center mb-4">Want to Sell?</h2>
            <p className="text-gray-600 text-center mb-8 text-lg">
              Turn your products into profit. Reach thousands of potential buyers and grow your business with our platform.
            </p>
            <Link href='/project_red/sellingform'>
            <button
              onClick={() => {
                console.log('Seller flow initiated');
              }}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg text-lg font-semibold"
            >
              Start Selling
            </button>
            </Link>
            </div>
        </div>

        <div className="text-center bg-blue-50 rounded-xl p-6">
          <p className="text-xl text-gray-700 font-semibold">
            Sell or buy everything you want
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;