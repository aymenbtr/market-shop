"use client";
import React, { useState, useEffect,} from 'react';
import Image from 'next/image';
import { ShoppingCart, X, Plus, Image as ImageIcon, ChevronLeft, ChevronRight, Star, LogOut } from 'lucide-react';

// Environment variables with fallbacks
const ADMIN_CREDENTIALS = {
  username: process.env.NEXT_PUBLIC_ADMIN_USERNAME || 'AymenBtt',
  password: process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'Ilovelilyan4ever',
  token: process.env.NEXT_PUBLIC_ADMIN_TOKEN || 'default_token'
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// TypeScript interfaces
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  images: string[];
}

interface FormData {
  name: string;
  email: string;
  address: string;
  phone: string;
}

interface ImageGalleryProps {
  images: string[];
  fullscreen?: boolean;
}

// Add Product Modal Component
const AddProductModal = ({ onClose }: { onClose: () => void }) => {
  const [productData, setProductData] = useState({
    name: '',
    price: '',
    description: '',
    images: [] as string[]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newProduct = {
      id: Date.now(),
      name: productData.name,
      price: parseFloat(productData.price),
      description: productData.description,
      images:
        productData.images.length > 0
          ? productData.images
          : [`https://via.placeholder.com/400x300?text=${encodeURIComponent(productData.name)}`],
    };

    const existingProducts = JSON.parse(localStorage.getItem('marketplaceProducts') || '[]');
    const updatedProducts = [...existingProducts, newProduct];

    localStorage.setItem('marketplaceProducts', JSON.stringify(updatedProducts));
    window.location.reload();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductData(prev => ({
          ...prev,
          images: [...prev.images, reader.result as string],
        }));
      };
      reader.readAsDataURL(file);
    });
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-lg max-w-md w-full my-8 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Add New Product</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              value={productData.name}
              onChange={(e) => setProductData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Price (DA)</label>
            <input
              type="number"
              value={productData.price}
              onChange={(e) => setProductData(prev => ({ ...prev, price: e.target.value }))}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Description</label>
            <textarea
              value={productData.description}
              onChange={(e) => setProductData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full p-2 border rounded-lg h-24"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Product Images</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="cursor-pointer flex flex-col items-center"
              >
                <ImageIcon className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-gray-500">Click to upload images</span>
                <span className="text-sm text-gray-400 mt-1">
                  {productData.images.length}/5 images uploaded
                </span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 flex items-center justify-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

// Delete Confirmation Modal Component
const DeleteConfirmationModal = ({
  onClose,
  onConfirm
}: {
  onClose: () => void;
  onConfirm: () => void;
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-4">Delete Product</h2>
        <p className="text-gray-600 mb-6">Are you sure you want to delete this product?</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            No
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  // Disable ESLint rule for unused variable
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
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


// Image Gallery Component
const ImageGallery: React.FC<ImageGalleryProps> = ({ images, fullscreen = false }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  // Use an array of default images if no images are provided
  const defaultImage = 'https://via.placeholder.com/400x300?text=Default+Image';
  const displayImages = images?.length > 0 ? images : [defaultImage];

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % displayImages.length);
  };

  const generatePlaceholder = (index: number) => {
    return `https://via.placeholder.com/400x300?text=Product+Image+${index + 1}`;
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + displayImages.length) % displayImages.length);
  };

  const goToImage = (index: number) => {
    setCurrentIndex(index);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setImageError(true);
    e.currentTarget.src = generatePlaceholder(currentIndex);
  };

  return (
    <div className={`relative ${fullscreen ? "h-96" : "h-48"}`}>
      <Image
        src={imageError ? generatePlaceholder(currentIndex) : displayImages[currentIndex]}
        alt={`Product image ${currentIndex + 1}`}
        className="w-full h-full object-cover rounded-t-lg"
        onError={handleImageError}
        layout="fill" // Use the fill layout for full-size images
        objectFit="cover" // Ensure the image covers the container
      />
      {displayImages.length > 1 && (
        <>
          <button
            onClick={() => {
              prevImage();
              setImageError(false);
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-75"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => {
              nextImage();
              setImageError(false);
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-75"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
            {displayImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  goToImage(idx);
                  setImageError(false);
                }}
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
// Admin Login Component
const AdminLogin = ({ onClose }: { onClose: () => void }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      credentials.username === ADMIN_CREDENTIALS.username &&
      credentials.password === ADMIN_CREDENTIALS.password
    ) {
      localStorage.setItem('adminToken', ADMIN_CREDENTIALS.token);
      window.location.reload();
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Admin Login</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Username</label>
            <input
              type="text"
              value={credentials.username}
              onChange={(e) =>
                setCredentials((prev) => ({ ...prev, username: e.target.value }))
              }
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials((prev) => ({ ...prev, password: e.target.value }))
              }
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

// Product Preview Component
const ProductPreview = ({
  product,
  onClose,
  onBuy
}: {
  product: Product;
  onClose: () => void;
  onBuy: (product: Product) => void;
}) => {
  const formatPrice = (price: number) => {
    return price.toLocaleString('fr-DZ') + ' DA';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-lg max-w-4xl w-full my-8">
        <div className="sticky top-0 bg-white z-10 p-4 border-b flex justify-between items-center">
          <div className="text-3xl font-bold text-green-600 mb-6">
            {formatPrice(product.price)}
          </div>
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <ImageGallery images={product.images} fullscreen={true} />
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Product Details</h3>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="flex items-center mb-4">
                <div className="flex items-center mr-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="text-gray-600">(4.8/5 rating)</span>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Key Features</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Premium quality materials</li>
                <li>1 year warranty</li>
                <li>Free shipping</li>
                <li>30-day money-back guarantee</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => onBuy(product)}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Marketplace Component
const Marketplace = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState<number | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    address: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.altKey && e.shiftKey && e.key.toLowerCase() === 'a') {
        setShowLoginModal(true);
      }
    };
  
    window.addEventListener('keydown', handleKeyDown);
    
    // Check admin status
    const adminToken = localStorage.getItem('adminToken');
    setIsAdmin(adminToken === ADMIN_CREDENTIALS.token);
  
    // Load products from localStorage
    const storedProducts = localStorage.getItem('marketplaceProducts');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  
  const handleBuy = (product: Product) => {
    setCartItems(prev => [...prev, product]);
    setSelectedProduct(null);
    setShowCart(true);
  };
  const handleDelete = (productId: number) => {
    const updatedProducts = products.filter(p => p.id !== productId);
    localStorage.setItem('marketplaceProducts', JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
    setShowDeleteModal(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAdmin(false);
  };

  const [successMessage, setSuccessMessage] = useState(''); // Add state for the success message

const handleCheckout = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    // Create order data with customer info and cart details
    const orderData = {
      customerInfo: {
        name: formData.name,
        email: formData.email,
        address: formData.address,
        phone: formData.phone
      },
      orderDetails: {
        items: cartItems.map(item => ({
          productName: item.name,
          price: item.price,
          id: item.id
        })),
        totalAmount: cartItems.reduce((sum, item) => sum + item.price, 0)
      },
      orderDate: new Date(),
      status: 'pending'
    };

    // Send order to the database
    const response = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData)
    });

    if (!response.ok) {
      throw new Error('Failed to submit order');
    }

    // Clear cart and close modal on success
    setCartItems([]);
    setShowCart(false);
    setFormData({
      name: '',
      email: '',
      address: '',
      phone: ''
    });

    // Set success message
    setSuccessMessage('Your order has been placed successfully! We will contact you soon.');
  } catch (error) {
    console.error('Error submitting order:', error);
    alert('Failed to place order. Please try again.');
  } finally {
    setIsSubmitting(false);
  }
};


  return (
    <ErrorBoundary>
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50">
        {/* Enhanced Header with Glass Effect */}
        <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-100 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <ShoppingCart className="w-8 h-8 text-green-600" />
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
                  DZ-Market
                </h1>
              </div>
              <div className="flex items-center space-x-6">
                <button
                  onClick={() => setShowCart(true)}
                  className="relative group p-3 hover:bg-green-50 rounded-full transition-all duration-300"
                >
                  <ShoppingCart className="w-6 h-6 text-gray-600 group-hover:text-green-600" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs animate-bounce">
                      {cartItems.length}
                    </span>
                  )}
                </button>
                {isAdmin && (
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setShowAddModal(true)}
                      className="bg-gradient-to-r from-green-600 to-green-500 text-white px-6 py-2.5 rounded-full hover:from-green-700 hover:to-green-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center space-x-2"
                    >
                      <Plus className="w-5 h-5" />
                      <span>Add Product</span>
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors duration-300 px-4 py-2 rounded-full hover:bg-red-50"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
              >
                <div className="relative overflow-hidden rounded-t-2xl">
                  <ImageGallery images={product.images} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-white text-green-600 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 shadow-lg hover:bg-green-50"
                  >
                    View Details
                  </button>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-800 line-clamp-2">{product.name}</h3>
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">(5.0)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-2xl font-bold text-green-600">
                      {product.price.toLocaleString('fr-DZ')} DA
                    </p>
                    {isAdmin && (
                      <button
                        onClick={() => setShowDeleteModal(product.id)}
                        className="text-red-500 hover:text-red-700 transition-colors duration-200 p-2 hover:bg-red-50 rounded-full"
                      >
                        Delete
                      <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
          {/* Empty State with Enhanced Design */}
          {products.length === 0 && (
            <div className="text-center py-24">
              <div className="bg-green-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <ImageIcon className="w-12 h-12 text-green-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">No Products Available</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Start by adding some amazing products to your marketplace.
              </p>
              {isAdmin && (
                <button
                  onClick={() => setShowAddModal(true)}
                  className="mt-8 px-8 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Add Your First Product
                </button>
              )}
            </div>
          )}
         {/* Modals */}
        {/* Re-use your existing modal components with the enhanced styling */}
        {showAddModal && <AddProductModal onClose={() => setShowAddModal(false)} />}
        {showLoginModal && <AdminLogin onClose={() => setShowLoginModal(false)} />}
        {showDeleteModal !== null && (
          <DeleteConfirmationModal
            onClose={() => setShowDeleteModal(null)}
            onConfirm={() => handleDelete(showDeleteModal)}
          />
        )}
        {selectedProduct && (
          <ProductPreview
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onBuy={handleBuy}
          />
        )}
        {products.length === 0 && (
            <div className="text-center py-16">
              <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No Products Available</h3>
              <p className="text-gray-500">Start by adding some products to your marketplace.</p>
            </div>
          )}
        
        {/* Shopping Cart Modal */}
        {showCart && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center p-4 z-50 overflow-y-auto backdrop-blur-sm">
            <div className="bg-white rounded-2xl max-w-2xl w-full my-8 p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">Your Cart</h2>
                <button 
                  onClick={() => setShowCart(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {cartItems.length > 0 ? (
                <div className="space-y-6">
                  {cartItems.map((item, index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:border-green-200 transition-colors duration-200"
                    >
                      <div className="flex items-center space-x-4">
                      <Image
                        src={item.images[0] || `https://via.placeholder.com/400x300?text=${encodeURIComponent(item.name)}`}
                        alt={item.name}
                        width={80}
                        height={80}
                        className='object-cover'
                        onError={() =>{
                          console.log("Image Failed to load:", item.images[0] );
                        }}
                        />
                        <div>
                          <h3 className="font-semibold text-lg text-gray-800">{item.name}</h3>
                          <p className="text-green-600 font-bold">{item.price.toLocaleString('fr-DZ')} DA</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setCartItems(prev => prev.filter((_, i) => i !== index))}
                        className="text-red-500 hover:text-red-700 transition-colors duration-200"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                     ))}
                     <div className="border-t border-gray-200 pt-4 mt-6">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Total:</span>
                      <span className="text-green-600">
                        {cartItems.reduce((sum, item) => sum + item.price, 0).toLocaleString('fr-DZ')} DA
                      </span>
                    </div>
                  </div>
                  <div className="mt-8 bg-gray-50 rounded-xl p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">Checkout Details</h3>
                  <form onSubmit={handleCheckout} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div>
                   <label className="block text-gray-700 mb-2 font-medium">Full Name</label>
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-200"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 mb-2 font-medium">Email</label>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-200"
                            required
                          />
                        </div>
                      </div>
                      <div>
                       {successMessage && (
                       <p style={{ color: 'green', fontSize: '16px', marginTop: '10px' }}>
                        {successMessage}
                         </p>
                          )}
                        </div>
                        <div>
                        <label className="block text-gray-700 mb-2 font-medium">Delivery Address</label>
                        <textarea
                          value={formData.address}
                          onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                          className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-200 h-24 resize-none"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2 font-medium">Phone Number</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                          className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-200"
                          required
                        />
                      </div>
                      <button
                       type="submit"
                       disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white py-4 rounded-lg hover:from-green-700 hover:to-green-600 transition-all duration-200 shadow-md hover:shadow-lg font-semibold text-lg disabled:opacity-50"
                      >
                     {isSubmitting ? 'Processing...' : 'Complete Order'}
                      </button>
                    </form>
                  </div>
                </div>
                 ) : (
                 <div className="text-center py-12">
                <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-xl text-gray-600">Your cart is empty</p>
                <button
                  onClick={() => setShowCart(false)}
                  className="mt-6 px-6 py-2 text-green-600 border border-green-600 rounded-lg hover:bg-green-50 transition-colors duration-200"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      </div>
    </ErrorBoundary>
  );
};

export default Marketplace;
