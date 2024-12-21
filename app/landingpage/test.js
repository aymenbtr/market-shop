"use client";
import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, X, Plus, Image as ImageIcon, ChevronLeft, ChevronRight, Expand, Star, ArrowDown, LogIn, LogOut } from 'lucide-react';

// Move credentials to environment variables
const ADMIN_CREDENTIALS = {
  username: process.env.NEXT_PUBLIC_ADMIN_USERNAME || 'AymenBtt',
  password: process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'Ilovelilyan4ever',
  token: process.env.NEXT_PUBLIC_ADMIN_TOKEN || 'your-secret-admin-token'
};

// Separate API URL for different environments
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Add proper TypeScript interfaces
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  images: string[];
}

interface ImageGalleryProps {
  images: string[];
  fullscreen?: boolean;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, fullscreen = false }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const goToImage = (index: number) => {
    setCurrentIndex(index);
  };

  // Add error handling for images
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = "/api/placeholder/400/300"; // Fallback image
  };

  return (
    <div className={`relative ${fullscreen ? "h-96" : "h-48"}`}>
      <img
        src={images[currentIndex]}
        alt={`Image ${currentIndex + 1}`}
        className="w-full h-full object-cover"
        onError={handleImageError}
      />

      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-75"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-75"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToImage(idx)}
                className={`w-2 h-2 rounded-full ${
                  currentIndex === idx ? "bg-white" : "bg-white bg-opacity-50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// Modify the order submission function to use the API_URL
const submitOrder = async (orderData) => {
  try {
    const response = await fetch(`${API_URL}/api/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error('Failed to create order');
    }

    return await response.json();
  } catch (error) {
    console.error('Error submitting order:', error);
    throw error;
  }
};

// Add proper error boundaries
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 text-center">
          <h2>Something went wrong.</h2>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Wrap the main component with ErrorBoundary
const LandingPage = () => {
  // ... (rest of your component code remains the same)
  
  return (
    <ErrorBoundary>
      {/* Your existing JSX */}
    </ErrorBoundary>
  );
};

export default LandingPage;