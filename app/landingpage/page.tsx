"use client";
import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, X, Plus, Image as ImageIcon, ChevronLeft, ChevronRight, Expand, Star, ArrowDown, LogIn, LogOut } from 'lucide-react';
interface ImageGalleryProps {
  images: string[];
  fullscreen?: boolean; // Optional prop to toggle fullscreen mode
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, fullscreen = false }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Move to the next image
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Move to the previous image
  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  // Set the current image index manually
  const goToImage = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className={`relative ${fullscreen ? "h-96" : "h-48"}`}>
      {/* Display the current image */}
      <img
        src={images[currentIndex]}
        alt={`Image ${currentIndex + 1}`}
        className="w-full h-full object-cover"
      />

      {/* Navigation buttons */}
      {images.length > 1 && (
        <>
          {/* Previous Image Button */}
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-75"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Image Button */}
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-75"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots Indicator */}
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

const useAdmin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminButton, setShowAdminButton] = useState(false);

  useEffect(() => {
    // Check for admin token
    const adminToken = localStorage.getItem('adminToken');
    setIsAdmin(adminToken === ADMIN_CREDENTIALS.token);
    
    // Check for special key combination or condition
    const checkAdminAccess = (e) => {
      // Show admin button only when Ctrl + Shift + A is pressed
      if (e.ctrlKey && e.shiftKey && e.altKey && e.key === 'A') {
        setShowAdminButton(true);
      }
      // Hide admin button when Escape is pressed
      if (e.key === 'Escape') {
        setShowAdminButton(false);
      }
    };

    window.addEventListener('keydown', checkAdminAccess);
    return () => window.removeEventListener('keydown', checkAdminAccess);
  }, []);

  return { isAdmin, showAdminButton };
};
const ADMIN_CREDENTIALS = {
  username: 'AymenBtt',
  password: 'Ilovelilyan4ever',
  token: 'your-secret-admin-token'
};
const AdminLogin = ({ onClose }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (credentials.username === ADMIN_CREDENTIALS.username && 
        credentials.password === ADMIN_CREDENTIALS.password) {
      localStorage.setItem('adminToken', ADMIN_CREDENTIALS.token);
      window.location.reload(); // Reload to update admin status
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
            onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            value={credentials.password}
            onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
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


const ProductPreview = ({ product, onClose, onBuy }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center p-4 z-50 overflow-y-auto">
    <div className="bg-white rounded-lg max-w-4xl w-full my-8">
      <div className="sticky top-0 bg-white z-10 p-4 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
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
              <div className="text-3xl font-bold text-green-600 mb-6">
                ${product.price.toFixed(2)}
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
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ScrollPrompt = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 text-center animate-bounce">
      <div className="bg-black bg-opacity-50 text-white px-4 py-2 rounded-full flex items-center">
        <span className="mr-2">Scroll to explore</span>
        <ArrowDown className="w-4 h-4" />
      </div>
    </div>
  );
};

const LandingPage = () => {
  const { isAdmin, showAdminButton } = useAdmin();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.reload(); // Reload to update admin status
  };
  
  // Your existing state declarations...
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem('marketplaceProducts');
    if (savedProducts) {
      const parsed = JSON.parse(savedProducts);
      return parsed.map(product => ({
        ...product,
        images: Array.isArray(product.images) ? product.images : [product.image || "/api/placeholder/300/300"]
      }));
    }
    return [
      {
        id: 1,
        name: "Premium Headphones",
        price: 99.99,
        description: "High-quality wireless headphones with noise cancellation. Experience crystal-clear audio with deep bass and comfortable ear cups for extended listening sessions.",
        images: ["/api/placeholder/300/300", "/api/placeholder/300/300"]
      },
      {
        id: 2,
        name: "Smartwatch",
        price: 199.99,
        description: "Feature-rich smartwatch with health tracking. Monitor your fitness goals, receive notifications, and track your sleep patterns with this elegant and durable smartwatch.",
        images: ["/api/placeholder/300/300", "/api/placeholder/300/300"]
      }
    ];
  });

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [previewProduct, setPreviewProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const formRef = useRef(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone: ''
  });

  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    description: '',
    images: []
  });

  const [previewImages, setPreviewImages] = useState([]);

  useEffect(() => {
    localStorage.setItem('marketplaceProducts', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    if (showForm && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [showForm]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const maxImages = 5; // Maximum number of images allowed
    
    if (previewImages.length + files.length > maxImages) {
      alert(`You can only upload up to ${maxImages} images`);
      return;
    }

    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImages(prev => [...prev, reader.result]);
          setNewProduct(prev => ({
            ...prev,
            images: [...prev.images, reader.result]
          }));
        };
        reader.readAsDataURL(file);
      } else {
        alert('Please upload only image files');
      }
    });
  };
  const removeImage = (index) => {
    setPreviewImages(prev => prev.filter((_, i) => i !== index));
    setNewProduct(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleBuyClick = (product) => {
    setSelectedProduct(product);
    setShowForm(true);
    setPreviewProduct(null);
  };
  const handleDeleteProduct = (productId) => {
    setProductToDelete(productId);
    setShowDeleteConfirm(true);
  };
  
  const confirmDelete = () => {
    setProducts(prev => prev.filter(product => product.id !== productToDelete));
    setShowDeleteConfirm(false);
    setProductToDelete(null);
  };

  const handlePreviewClick = (product) => {
    setPreviewProduct(product);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNewProductChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    const productToAdd = {
      ...newProduct,
      id: Date.now(),
      price: parseFloat(newProduct.price),
      images: previewImages.length > 0 ? previewImages : ["/api/placeholder/300/300"]
    };
    setProducts(prev => [...prev, productToAdd]);
    setNewProduct({
      name: '',
      price: '',
      description: '',
      images: []
    });
    setPreviewImages([]);
    setShowAddProduct(false);
    setSuccessMessage('Product added successfully!');
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Ensure product is a string
    const productToSend = typeof selectedProduct === 'object' 
      ? selectedProduct.name || JSON.stringify(selectedProduct) // Use 'name' property or stringify the object
      : selectedProduct;
  
    console.log('Product being sent:', productToSend); // Debugging
  
    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          address: formData.address,
          phone: formData.phone,
          product: productToSend,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to create order');
      }
  
      const data = await response.json();
      console.log('Order submitted:', data);
  
      setShowForm(false);
      setFormData({ name: '', email: '', address: '', phone: '' });
      setSuccessMessage('Thank you for your order! We will contact you soon.');
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    } catch (error) {
      console.error('Error submitting order:', error);
      setSuccessMessage('Failed to submit order. Please try again.');
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    }
  };
  
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Dz-Market</h1>
            <div className="flex items-center gap-4">
              {isAdmin ? (
                <>
                  <button
                    onClick={() => setShowAddProduct(true)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Product
                  </button>
                  <button
                    onClick={handleLogout}
                    className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 flex items-center"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </button>
                </>
              ) : showAdminButton && (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Admin Login
                </button>
              )}
            </div>
          </div>
          <p className="text-gray-600 mt-2">Choose from our selection of premium products</p>
        </div>
      </header>
  
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden relative group">
              {isAdmin && (
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="absolute top-2 right-2 z-10 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <div className="relative">
                <ImageGallery images={product.images} />
                <button
                  onClick={() => handlePreviewClick(product)}
                  className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 flex items-center justify-center transition-opacity"
                >
                  <Expand className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-green-600">
                    ${product.price.toFixed(2)}
                  </span>
                  <button
                    onClick={() => handleBuyClick(product)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
  
      <ScrollPrompt />
  
      {previewProduct && (
        <ProductPreview 
          product={previewProduct} 
          onClose={() => setPreviewProduct(null)}
          onBuy={handleBuyClick}
        />
      )}
  
      {showAddProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-md w-full my-8 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Add New Product</h2>
              <button 
                onClick={() => {
                  setShowAddProduct(false);
                  setPreviewImages([]);
                  setNewProduct({
                    name: '',
                    price: '',
                    description: '',
                    images: []
                  });
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleAddProduct}>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={newProduct.name}
                    onChange={handleNewProductChange}
                    className="w-full p-2 border rounded-lg"
                    required
                  />
                </div>
  
                <div>
                  <label className="block text-gray-700 mb-2">Price</label>
                  <input
                    type="number"
                    name="price"
                    value={newProduct.price}
                    onChange={handleNewProductChange}
                    className="w-full p-2 border rounded-lg"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
  
                <div>
                  <label className="block text-gray-700 mb-2">Description</label>
                  <textarea
                    name="description"
                    value={newProduct.description}
                    onChange={handleNewProductChange}
                    className="w-full p-2 border rounded-lg h-32"
                    required
                  />
                </div>
  
                <div>
                  <label className="block text-gray-700 mb-2">Product Images</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageChange}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="flex flex-col items-center justify-center cursor-pointer"
                    >
                      <ImageIcon className="w-8 h-8 text-gray-400 mb-2" />
                      <span className="text-gray-500">Click to upload images</span>
                      <span className="text-sm text-gray-400 mt-1">
                        {previewImages.length}/5 images uploaded
                      </span>
                    </label>
                  </div>
                  {previewImages.length > 0 && (
                    <div className="mt-4 grid grid-cols-3 gap-2">
                      {previewImages.map((image, index) => (
                        <div key={index} className="relative aspect-square">
                          <img
                            src={image}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-full object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                          <span className="absolute bottom-1 left-1 bg-black bg-opacity-50 text-white px-2 py-1 rounded-md text-xs">
                            Image {index + 1}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                  {previewImages.length === 0 && (
                    <p className="text-sm text-gray-500 mt-2">
                      No images uploaded yet. Please add at least one image.
                    </p>
                  )}
                </div>
              </div>
              <button
                type="submit"
                disabled={previewImages.length === 0}
                className={`w-full py-2 rounded-lg mt-4 ${
                  previewImages.length === 0
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700'
                } text-white transition-colors`}
              >
                Add Product
              </button>
            </form>
          </div>
        </div>
      )}
  
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-md w-full my-8 p-6" ref={formRef}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Complete Your Order</h2>
              <button 
                onClick={() => setShowForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
  
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Selected Product:</h3>
              <div className="flex items-center">
                <img
                  src={selectedProduct?.images[0]}
                  alt={selectedProduct?.name}
                  className="w-16 h-16 object-cover rounded-lg mr-4"
                />
                <div>
                  <p className="font-semibold">{selectedProduct?.name}</p>
                  <p className="text-green-600 font-bold">${selectedProduct?.price.toFixed(2)}</p>
                </div>
              </div>
            </div>
  
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
  
              <div>
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
  
              <div>
                <label className="block text-gray-700 mb-2">Shipping Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg h-24"
                  required
                />
              </div>
  
              <div>
                <label className="block text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
  
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                Place Order
              </button>
            </form>
          </div>
        </div>
      )}
  
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full transform transition-all scale-95 animate-[scale-100_0.2s_ease-in]">
            <h2 className="text-xl font-bold mb-4">Delete Product</h2>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this product?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                No
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
  
      {showSuccessMessage && (
        <div className="fixed bottom-8 right-8 max-w-sm w-full bg-white rounded-lg shadow-lg p-6 transform transition-all animate-[slideIn_0.3s_ease-out]">
          <div className="flex items-center">
            <div className="bg-green-100 rounded-full p-2 mr-4">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <p className="text-gray-800 font-medium">{successMessage}</p>
          </div>
        </div>
      )}
  
      {showLoginModal && (
        <AdminLogin onClose={() => setShowLoginModal(false)} />
      )}
    </div>
  );
 }
 export default LandingPage;






   
