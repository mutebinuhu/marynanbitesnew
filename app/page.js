// pages/index.js
"use client"
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { ShoppingCart, Star, Clock, MapPin, Phone, Mail, Plus, Minus, X, Menu } from 'lucide-react';

// Mock menu data - In real app, this would come from Appwrite
const menuItems = [
  {
    id: 1,
    name: "Truffle Risotto",
    description: "Creamy arborio rice with wild mushrooms and black truffle",
    price: 28.99,
    category: "Mains",
    image: "/api/placeholder/300/200",
    rating: 4.8,
    popular: true
  },
  {
    id: 2,
    name: "Grilled Salmon",
    description: "Atlantic salmon with lemon herb butter and seasonal vegetables",
    price: 24.99,
    category: "Mains",
    image: "/api/placeholder/300/200",
    rating: 4.7
  },
  {
    id: 3,
    name: "Beef Wellington",
    description: "Tender beef fillet wrapped in puff pastry with mushroom duxelles",
    price: 35.99,
    category: "Mains",
    image: "/api/placeholder/300/200",
    rating: 4.9,
    popular: true
  },
  {
    id: 4,
    name: "Caesar Salad",
    description: "Crispy romaine lettuce with parmesan, croutons and caesar dressing",
    price: 14.99,
    category: "Starters",
    image: "/api/placeholder/300/200",
    rating: 4.5
  },
  {
    id: 5,
    name: "Chocolate Lava Cake",
    description: "Warm chocolate cake with molten center and vanilla ice cream",
    price: 12.99,
    category: "Desserts",
    image: "/api/placeholder/300/200",
    rating: 4.8
  },
  {
    id: 6,
    name: "Margherita Pizza",
    description: "Classic pizza with fresh mozzarella, tomato sauce and basil",
    price: 18.99,
    category: "Mains",
    image: "/api/placeholder/300/200",
    rating: 4.6
  }
];

export default function RestaurantLandingPage() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const categories = ['All', 'Starters', 'Mains', 'Desserts'];

  const addToCart = (item) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(itemId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const filteredItems = selectedCategory === 'All'
    ? menuItems
    : menuItems.filter(item => item.category === selectedCategory);

  const handleOrder = () => {
    // In real app, this would integrate with Appwrite
    console.log('Order placed:', cart);
    setIsOrderModalOpen(true);
    setCart([]);
    setIsCartOpen(false);
  };

  const handleNavClick = (sectionId) => {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <Head>
        <title>Marynan Bites Restaurant- Fine Dining Experience</title>
        <meta name="description" content="Experience exceptional cuisine at Marynan Bites Restaurant. Order online for pickup or delivery." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-lg sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-gray-900">Marynan Bites</h1>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex space-x-8">
                <a href="#home" className="text-gray-900 hover:text-orange-600 transition-colors">Home</a>
                <a href="#menu" className="text-gray-900 hover:text-orange-600 transition-colors">Menu</a>
                <a href="#about" className="text-gray-900 hover:text-orange-600 transition-colors">About</a>
                <a href="#contact" className="text-gray-900 hover:text-orange-600 transition-colors">Contact</a>
              </nav>

              <div className="flex items-center space-x-4">
                {/* Cart Button */}
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="relative bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center space-x-2"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span className="hidden sm:inline">Cart</span>
                  {getTotalItems() > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                      {getTotalItems()}
                    </span>
                  )}
                </button>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                >
                  <Menu className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 bg-white">
              <div className="px-4 py-2 space-y-1">
                <button
                  onClick={() => handleNavClick('home')}
                  className="block w-full text-left px-3 py-2 text-gray-900 hover:text-orange-600 hover:bg-gray-50 rounded-md transition-colors"
                >
                  Home
                </button>
                <button
                  onClick={() => handleNavClick('menu')}
                  className="block w-full text-left px-3 py-2 text-gray-900 hover:text-orange-600 hover:bg-gray-50 rounded-md transition-colors"
                >
                  Menu
                </button>
                <button
                  onClick={() => handleNavClick('about')}
                  className="block w-full text-left px-3 py-2 text-gray-900 hover:text-orange-600 hover:bg-gray-50 rounded-md transition-colors"
                >
                  About
                </button>
                <button
                  onClick={() => handleNavClick('contact')}
                  className="block w-full text-left px-3 py-2 text-gray-900 hover:text-orange-600 hover:bg-gray-50 rounded-md transition-colors"
                >
                  Contact
                </button>
              </div>
            </div>
          )}
        </header>

        {/* Hero Section */}
        <section id="home" className="relative h-screen">
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-10"></div>
          <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: "url('/banner2.jpg')"}}></div>

          <div className="relative z-20 text-white px-4 h-full flex justify-center items-center w-full lg:w-1/2">
            <div className="text-center lg:text-left">
              <h1 className="block text-2xl md:text-3xl py-3">Welcome To <span className="text-orange-400">Marynan Bites</span> Restaurant</h1>
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6">
                Exceptional
                <span className="block text-orange-400">Cuisine</span>
              </h2>
              <p className="text-lg md:text-xl lg:text-2xl mb-8 max-w-2xl">
                Experience fine dining at its finest with our carefully crafted dishes made from the freshest ingredients.
              </p>
              <p className="text-lg md:text-xl lg:text-2xl mb-8 max-w-2xl">
                Free <span className="underline decoration-orange-400">Delivery</span> in Bunamwaya
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={() => document.getElementById('menu').scrollIntoView({ behavior: 'smooth' })}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-6 lg:px-8 py-3 lg:py-4 rounded-lg text-base lg:text-lg font-semibold transition-colors"
                >
                  Order Now
                </button>
                <button
                  onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}
                  className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-6 lg:px-8 py-3 lg:py-4 rounded-lg text-base lg:text-lg font-semibold transition-colors"
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Menu Section */}
        <section id="menu" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Menu</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover our selection of carefully crafted dishes, each prepared with passion and the finest ingredients.
              </p>
            </div>

            {/* Category Filter */}
            <div className="flex justify-center mb-12">
              <div className="flex flex-wrap justify-center space-x-2 bg-gray-100 p-2 rounded-lg">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 lg:px-6 py-2 rounded-md font-medium transition-colors mb-2 ${
                      selectedCategory === category
                        ? 'bg-orange-600 text-white'
                        : 'text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Menu Items Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map(item => (
                <div key={item.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="relative h-48">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    {item.popular && (
                      <div className="absolute top-4 left-4 bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Popular
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">{item.rating}</span>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4">{item.description}</p>

                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-orange-600">${item.price}</span>
                      <button
                        onClick={() => addToCart(item)}
                        className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center space-x-2"
                      >
                        <Plus className="h-4 w-4" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">About Marynan Bites Restaurant</h2>
                <p className="text-lg text-gray-600 mb-6">
                MARYNAN Bites Restaurant is inspired by our beloved mother Mary Nantaayi, who brings over 25 years of experience in the catering industry, serving the Bunamwaya community and its surrounding areas. Her passion for food and dedication to quality have been the heart of every meal she prepares.

                </p>
                <p className="text-lg text-gray-600 mb-8">                 
                 Driven by her expertise and love for cooking, we teamed up as a family to create MARYNAN Bites—a place where every bite is crafted to leave you craving more. From traditional flavors to modern twists, our menu is full of dishes made with care, flavor, and a touch of home.

                 We offer dine-in and delivery services, with a wide selection of snacks, local foods, and more. Whether you're looking for a quick bite or a hearty meal, come and experience the best of Ugandan cuisine with us.

                  Let us serve you food you'll always remember.
                </p>

                <div className="grid grid-cols-3 gap-8 text-center">
                  <div>
                    <div className="text-3xl font-bold text-orange-600 mb-2">20+</div>
                    <div className="text-gray-600">Years Experience</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-orange-600 mb-2">50+</div>
                    <div className="text-gray-600">Menu Items</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-orange-600 mb-2">1000+</div>
                    <div className="text-gray-600">Happy Customers</div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <img
                  src="/mummy.webp"
                  alt="Restaurant interior"
                  className="rounded-xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Visit Us</h2>
              <p className="text-xl text-gray-600">We'd love to welcome you to Marynan Bites Restaurant</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <a href='https://g.co/kgs/gvxzc8U' target='_blank'>
              <div className="text-center p-8 bg-gray-50 rounded-xl">
                <MapPin className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Location</h3>
                <p className="text-gray-600">Bunamwaya-Kisigula Rd<br />50 mts off Bunamwaya - Lweza Rd<br />- Kampala-Uganda</p>
              </div>
              </a>
            

              <div className="text-center p-8 bg-gray-50 rounded-xl">
                <Clock className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Hours</h3>
                <p className="text-gray-600">Mon-Sunday: 8:00 AM - 11:50 PM<br /></p>
              </div>

              <div className="text-center p-8 bg-gray-50 rounded-xl">
                <Phone className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Contact</h3>
                <p className="text-gray-600">Phone: (+256) 758-567701<br />Email: marynanbites@gmail.com
                <br />Reservations: (+256) 758-567701</p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">Marynan Bites</h3>
                <p className="text-gray-400">Experience exceptional cuisine in an elegant atmosphere.</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
                  <li><a href="#menu" className="hover:text-white transition-colors">Menu</a></li>
                  <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
                  <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4">Services</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>Dine In</li>
                  <li>Takeout</li>
                  <li>Delivery</li>
                  <li>Catering</li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">Facebook</a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">Instagram</a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2025 Marynan Bites Restaurant. All rights reserved.</p>
            </div>
          </div>
        </footer>

        {/* Cart Sidebar */}
        {isCartOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsCartOpen(false)}></div>
            <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-6 border-b">
                  <h2 className="text-xl font-bold">Your Order</h2>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {cart.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">Your cart is empty</p>
                  ) : (
                    cart.map(item => (
                      <div key={item.id} className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{item.name}</h3>
                          <p className="text-orange-600 font-bold">${item.price}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-gray-200 rounded"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-gray-200 rounded"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {cart.length > 0 && (
                  <div className="border-t p-6 space-y-4">
                    <div className="flex justify-between items-center text-xl font-bold">
                      <span>Total:</span>
                      <span className="text-orange-600">${getTotalPrice().toFixed(2)}</span>
                    </div>
                    <button
                      onClick={handleOrder}
                      className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-semibold transition-colors"
                    >
                      Place Order
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Order Confirmation Modal */}
        {isOrderModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-xl max-w-md w-full mx-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Order Confirmed!</h3>
                <p className="text-gray-600 mb-6">Your order has been placed successfully. We'll prepare it right away!</p>
                <button
                  onClick={() => setIsOrderModalOpen(false)}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}