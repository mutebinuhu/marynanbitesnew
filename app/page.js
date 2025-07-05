"use client"
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { ShoppingCart, Star, Clock, MapPin, Phone, Mail, Plus, Minus, X, Menu } from 'lucide-react';

// Mock menu data - Customized for Ugandan dishes, Pizza, Chicken, Chips, Snacks, Juices, Lusaniya
const menuItems = [
  {
    id: 1,
    name: "Luwombo (Chicken/Beef)",
    description: "Steamed chicken or beef in groundnut sauce, a traditional Ugandan delicacy, served with matooke.",
    price: 35000, // Fixed price, not customizable like others
    category: "Local Dishes",
    image: "/api/placeholder/300/200?text=Luwombo",
    rating: 4.9,
    popular: true,
    customizable: false // Luwombo is NOT customizable
  },
  // New customizable "Soup/Sauce" items
  {
    id: 15,
    name: "Groundnut Soup Base",
    description: "Rich and savory groundnut soup, customize with your choice of staple foods.",
    price: 15000, // Base price for the soup/sauce
    category: "Local Dishes",
    image: "/api/placeholder/300/200?text=Groundnut Soup",
    customizable: true,
    type: "Soup/Sauce",
    options: {
      foods: [
        { name: "Matooke", price: 0 },
        { name: "Rice", price: 0 },
        { name: "Posho", price: 0 },
        { name: "Sweet Potatoes", price: 0 },
        { name: "Cassava", price: 0 },
        { name: "Irish Potatoes", price: 0 },
        { name: "Chapati", price: 3000 }
      ]
    }
  },
  {
    id: 16,
    name: "Beans Soup Base",
    description: "Hearty bean soup, perfect with your choice of staple foods.",
    price: 12000,
    category: "Local Dishes",
    image: "/api/placeholder/300/200?text=Beans Soup",
    customizable: true,
    type: "Soup/Sauce",
    options: {
      foods: [
        { name: "Matooke", price: 0 },
        { name: "Rice", price: 0 },
        { name: "Posho", price: 0 },
        { name: "Sweet Potatoes", price: 0 },
        { name: "Cassava", price: 0 },
        { name: "Irish Potatoes", price: 0 },
        { name: "Chapati", price: 3000 }
      ]
    }
  },
  {
    id: 17,
    name: "Chicken Soup Base",
    description: "Delicious chicken soup, customize with your preferred staple foods.",
    price: 20000,
    category: "Local Dishes",
    image: "/api/placeholder/300/200?text=Chicken Soup",
    customizable: true,
    type: "Soup/Sauce",
    options: {
      foods: [
        { name: "Matooke", price: 0 },
        { name: "Rice", price: 0 },
        { name: "Posho", price: 0 },
        { name: "Sweet Potatoes", price: 0 },
        { name: "Cassava", price: 0 },
        { name: "Irish Potatoes", price: 0 },
        { name: "Chapati", price: 3000 }
      ]
    }
  },
  {
    id: 18,
    name: "Gnuts with Fish Soup Base",
    description: "Groundnut soup with fish, pair it with your favorite staple foods.",
    price: 25000,
    category: "Local Dishes",
    image: "/api/placeholder/300/200?text=Gnuts + Fish",
    customizable: true,
    type: "Soup/Sauce",
    options: {
      foods: [
        { name: "Matooke", price: 0 },
        { name: "Rice", price: 0 },
        { name: "Posho", price: 0 },
        { name: "Sweet Potatoes", price: 0 },
        { name: "Cassava", price: 0 },
        { name: "Irish Potatoes", price: 0 },
        { name: "Chapati", price: 3000 }
      ]
    }
  },
  {
    id: 2,
    name: "Rolex",
    description: "A popular Ugandan street food; chapati rolled with an omelette and vegetables.",
    price: 8000,
    category: "Local Dishes",
    image: "/api/placeholder/300/200?text=Rolex",
    rating: 4.7,
    customizable: false // Rolex is NOT customizable in this way
  },
  {
    id: 4,
    name: "Katogo",
    description: "A hearty breakfast dish: matooke cooked with offals or beef, often with groundnut sauce.",
    price: 20000,
    category: "Local Dishes",
    image: "/api/placeholder/300/200?text=Katogo",
    rating: 4.6,
    popular: true,
    customizable: false // Katogo is NOT customizable
  },
  {
    id: 5,
    name: "Whole Tilapia Fish",
    description: "Grilled or fried whole tilapia fish, served with a side of kachumbari (fresh salad).",
    price: 45000,
    category: "Local Dishes",
    image: "/api/placeholder/300/200?text=Tilapia",
    rating: 4.8,
    customizable: false // Tilapia is NOT customizable
  },
  {
    id: 6,
    name: "Margherita Pizza",
    description: "Classic pizza with fresh mozzarella, tomato sauce and basil.",
    price: 0, // Base price will be determined by size
    category: "Pizza",
    image: "/api/placeholder/300/200?text=Margherita Pizza",
    rating: 4.6,
    customizable: true,
    type: "Pizza",
    options: {
      sizes: [
        { name: "Small", price: 30000 },
        { name: "Medium", price: 45000 },
        { name: "Large", price: 60000 }
      ]
    }
  },
  {
    id: 7,
    name: "Chicken Tikka Pizza",
    description: "Tandoori chicken pieces, onions, bell peppers, and mozzarella cheese on a crispy crust.",
    price: 0, // Base price will be determined by size
    category: "Pizza",
    image: "/api/placeholder/300/200?text=Chicken Tikka Pizza",
    rating: 4.7,
    customizable: true,
    type: "Pizza",
    options: {
      sizes: [
        { name: "Small", price: 40000 },
        { name: "Medium", price: 55000 },
        { name: "Large", price: 70000 }
      ]
    }
  },
  {
    id: 8,
    name: "Beef Sausage Pizza",
    description: "Savory beef sausage, mushrooms, olives, and mozzarella cheese.",
    price: 0, // Base price will be determined by size
    category: "Pizza",
    image: "/api/placeholder/300/200?text=Beef Sausage Pizza",
    rating: 4.5,
    customizable: true,
    type: "Pizza",
    options: {
      sizes: [
        { name: "Small", price: 38000 },
        { name: "Medium", price: 52000 },
        { name: "Large", price: 67000 }
      ]
    }
  },
  {
    id: 9,
    name: "Full Roasted Chicken",
    description: "Slow-roasted whole chicken, tender and juicy, seasoned to perfection.",
    price: 60000,
    category: "Chicken",
    image: "/api/placeholder/300/200?text=Roasted Chicken",
    rating: 4.8,
    popular: true
  },
  {
    id: 10,
    name: "Half Fried Chicken",
    description: "Crispy fried half chicken, golden brown and packed with flavor.",
    price: 35000,
    category: "Chicken",
    image: "/api/placeholder/300/200?text=Fried Chicken",
    rating: 4.7
  },
  {
    id: 11,
    name: "Chicken Wings (6 pcs)",
    description: "Six succulent chicken wings, choice of BBQ, spicy, or plain.",
    price: 25000,
    category: "Chicken",
    image: "/api/placeholder/300/200?text=Chicken Wings",
    rating: 4.6
  },
  {
    id: 12,
    name: "Regular Chips (Fries)",
    description: "Perfectly golden and crispy french fries, lightly salted.",
    price: 10000,
    category: "Chips",
    image: "/api/placeholder/300/200?text=Chips",
    rating: 4.4
  },
  {
    id: 13,
    name: "Chips with Chicken (Small)",
    description: "A small portion of crispy chips served with tender pieces of fried chicken.",
    price: 20000,
    category: "Chips",
    image: "/api/placeholder/300/200?text=Chips + Chicken",
    rating: 4.6
  },
  {
    id: 14,
    name: "Chips with Beef",
    description: "Crispy chips served with savory stir-fried beef strips.",
    price: 25000,
    category: "Chips",
    image: "/api/placeholder/300/200?text=Chips + Beef",
    rating: 4.5
  },
  // New Snacks Category
  {
    id: 19,
    name: "Samosa (Beef)",
    description: "Crispy pastry filled with spiced minced beef.",
    price: 3000,
    category: "Snacks",
    image: "/api/placeholder/300/200?text=Samosa Beef",
    rating: 4.5,
    customizable: false
  },
  {
    id: 20,
    name: "Samosa (Vegetable)",
    description: "Crispy pastry filled with spiced mixed vegetables.",
    price: 2500,
    category: "Snacks",
    image: "/api/placeholder/300/200?text=Samosa Veg",
    rating: 4.3,
    customizable: false
  },
  {
    id: 21,
    name: "Meat Kebab",
    description: "Grilled minced meat on a skewer, seasoned with herbs.",
    price: 5000,
    category: "Snacks",
    image: "/api/placeholder/300/200?text=Meat Kebab",
    rating: 4.6,
    customizable: false
  },
  {
    id: 22,
    name: "Chicken Kebab",
    description: "Grilled marinated chicken pieces on a skewer.",
    price: 6000,
    category: "Snacks",
    image: "/api/placeholder/300/200?text=Chicken Kebab",
    rating: 4.7,
    customizable: false
  },
  {
    id: 23,
    name: "Chapati",
    description: "Soft, flaky flatbread, perfect as a side or snack.",
    price: 2000,
    category: "Snacks",
    image: "/api/placeholder/300/200?text=Chapati",
    rating: 4.2,
    customizable: false
  },
  {
    id: 24,
    name: "Crunchies",
    description: "Crispy fried dough sticks, a popular Ugandan snack.",
    price: 3000,
    category: "Snacks",
    image: "/api/placeholder/300/200?text=Crunchies",
    rating: 4.4,
    customizable: false
  },
  {
    id: 25,
    name: "Mandazi",
    description: "Sweet, fluffy East African doughnuts.",
    price: 1500,
    category: "Snacks",
    image: "/api/placeholder/300/200?text=Mandazi",
    rating: 4.1,
    customizable: false
  },
  {
    id: 26,
    name: "Half Cakes",
    description: "Small, sweet, and soft baked cakes.",
    price: 1000,
    category: "Snacks",
    image: "/api/placeholder/300/200?text=Half Cakes",
    rating: 4.0,
    customizable: false
  },
  // New Juices Category
  {
    id: 27,
    name: "Fresh Mango Juice",
    description: "Refreshing juice made from ripe, sweet mangoes.",
    price: 8000,
    category: "Juices",
    image: "/api/placeholder/300/200?text=Mango Juice",
    rating: 4.8,
    customizable: false
  },
  {
    id: 28,
    name: "Fresh Passion Fruit Juice",
    description: "Tangy and sweet juice from fresh passion fruits.",
    price: 7000,
    category: "Juices",
    image: "/api/placeholder/300/200?text=Passion Juice",
    rating: 4.7,
    customizable: false
  },
  {
    id: 29,
    name: "Fresh Watermelon Juice",
    description: "Hydrating and sweet juice from fresh watermelon.",
    price: 6000,
    category: "Juices",
    image: "/api/placeholder/300/200?text=Watermelon Juice",
    rating: 4.6,
    customizable: false
  },
  {
    id: 30,
    name: "Mixed Fruit Juice",
    description: "A delightful blend of seasonal fresh fruits.",
    price: 9000,
    category: "Juices",
    image: "/api/placeholder/300/200?text=Mixed Juice",
    rating: 4.9,
    customizable: false
  },
  // New Lusaniya Category
  {
    id: 31,
    name: "Lusaniya Platter",
    description: "A traditional Ugandan sharing platter with assorted meats, staples, and sauces.",
    price: 0, // Price determined by size
    category: "Lusaniya",
    image: "/api/placeholder/300/200?text=Lusaniya",
    rating: 4.9,
    popular: true,
    customizable: true,
    type: "Lusaniya",
    options: {
      sizes: [
        { name: "Small", price: 70000, serves_people: "2-3 people" },
        { name: "Medium", price: 120000, serves_people: "4-5 people" },
        { name: "Large", price: 180000, serves_people: "6-8 people" },
        { name: "Extra Large", price: 250000, serves_people: "9-12 people" }
      ]
    }
  },
];

export default function RestaurantLandingPage() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // State for customization modal
  const [isCustomizationOpen, setIsCustomizationOpen] = useState(false);
  const [currentCustomizingItem, setCurrentCustomizingItem] = useState(null);

  // States specific to local dish customization (Soup/Sauce)
  const [selectedFoods, setSelectedFoods] = useState([]);

  // States specific to pizza and lusaniya customization
  const [selectedSize, setSelectedSize] = useState(null);

  const [currentCustomPrice, setCurrentCustomPrice] = useState(0);

  const categories = ['All', 'Local Dishes', 'Pizza', 'Chicken', 'Chips', 'Snacks', 'Juices', 'Lusaniya']; // Updated categories

  // Function to calculate custom dish price based on item type
  const calculateCustomPrice = (item, selectedSize, selectedFoods) => {
    let price = 0;

    if (!item) return 0;

    if (item.type === "Soup/Sauce") {
      price = item.price; // Base price is soup/sauce price
      selectedFoods.forEach(food => {
        price += food.price;
      });
    } else if (item.type === "Pizza" || item.type === "Lusaniya") { // Added Lusaniya
      if (selectedSize) {
        price = selectedSize.price; // Base price is determined by selected size
      }
    } else {
      price = item.price; // Fallback for any non-customized item
    }
    return price;
  };

  useEffect(() => {
    if (currentCustomizingItem) {
      setCurrentCustomPrice(calculateCustomPrice(
        currentCustomizingItem,
        (currentCustomizingItem.type === "Pizza" || currentCustomizingItem.type === "Lusaniya") ? selectedSize : null, // Pass selectedSize for Pizza/Lusaniya
        currentCustomizingItem.type === "Soup/Sauce" ? selectedFoods : []
      ));
    }
  }, [selectedFoods, selectedSize, currentCustomizingItem]);

  const handleAddToCartClick = (item) => {
    if (item.customizable) {
      setCurrentCustomizingItem(item);
      setSelectedFoods([]); // Reset for local dishes
      setSelectedSize(null); // Reset for pizzas and lusaniya
      setIsCustomizationOpen(true);
    } else {
      addToCart(item);
    }
  };

  const handleAddCustomDishToCart = () => {
    if (!currentCustomizingItem) return;

    let customizedItem = { ...currentCustomizingItem };

    if (currentCustomizingItem.type === "Soup/Sauce") {
      if (selectedFoods.length === 0) {
        alert("Please select at least one food item for your soup/sauce.");
        return;
      }
      customizedItem = {
        ...customizedItem,
        id: `${currentCustomizingItem.id}-${Date.now()}-${selectedFoods.map(f => f.name).sort().join('-')}`, // Unique ID
        name: `${currentCustomizingItem.name} with ${selectedFoods.map(f => f.name).join(', ')}`,
        price: currentCustomPrice,
        customization: {
          type: "Soup/Sauce",
          base: { name: currentCustomizingItem.name, price: currentCustomizingItem.price },
          foods: selectedFoods
        }
      };
    } else if (currentCustomizingItem.type === "Pizza" || currentCustomizingItem.type === "Lusaniya") { // Added Lusaniya
      if (!selectedSize) {
        alert(`Please select a size for your ${currentCustomizingItem.name}.`);
        return;
      }
      customizedItem = {
        ...customizedItem,
        id: `${currentCustomizingItem.id}-${Date.now()}-${selectedSize.name}`, // Unique ID
        name: `${currentCustomizingItem.name} (${selectedSize.name})`,
        price: currentCustomPrice,
        customization: {
          type: currentCustomizingItem.type, // Pizza or Lusaniya
          size: selectedSize
        }
      };
    } else {
      // Should not happen if customizable is handled correctly
      addToCart(currentCustomizingItem);
      setIsCustomizationOpen(false);
      setCurrentCustomizingItem(null);
      setSelectedFoods([]);
      setSelectedSize(null);
      return;
    }

    addToCart(customizedItem);
    setIsCustomizationOpen(false);
    setCurrentCustomizingItem(null);
    setSelectedFoods([]);
    setSelectedSize(null);
  };


  const addToCart = (item) => {
    setCart(prevCart => {
      // For non-customizable items, or distinct customizable items
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        // If it's a non-customizable item or an identical customized item (same ID generated)
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
        <title>Marynan Bites Restaurant - Authentic Ugandan & More!</title>
        <meta name="description" content="Experience delicious Ugandan local dishes, pizza, chicken, and chips at Marynan Bites Restaurant. Order online for delivery." />
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
                Authentic
                <span className="block text-orange-400">Ugandan Flavors</span>
              </h2>
              <p className="text-lg md:text-xl lg:text-2xl mb-8 max-w-2xl">
                Savor delicious local dishes, mouth-watering pizza, crispy chicken, and golden chips.
              </p>
              <p className="text-lg md:text-xl lg:text-2xl mb-8 max-w-2xl">
                We offer both dine-in and speedy <span className="underline decoration-orange-400">Delivery</span> services!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={() => document.getElementById('menu').scrollIntoView({ behavior: 'smooth' })}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-6 lg:px-8 py-3 lg:py-4 rounded-lg text-base lg:text-lg font-semibold transition-colors"
                >
                  Order Now
                </button>
                <button
                  onClick={() => document.getElementById('menu').scrollIntoView({ behavior: 'smooth' })}
                  className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-6 lg:px-8 py-3 lg:py-4 rounded-lg text-base lg:text-lg font-semibold transition-colors"
                >
                  View Menu
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
                Discover our diverse selection, from traditional Ugandan delicacies to international favorites.
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
                      <span className="text-2xl font-bold text-orange-600">
                        {item.customizable && item.type === "Soup/Sauce" ? `From UGX ${item.price.toLocaleString()}` : ''}
                        {item.customizable && (item.type === "Pizza" || item.type === "Lusaniya") ? `From UGX ${item.options.sizes[0].price.toLocaleString()}` : ''}
                        {!item.customizable ? `UGX ${item.price.toLocaleString()}` : ''}
                      </span>
                      <button
                        onClick={() => handleAddToCartClick(item)}
                        className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center space-x-2"
                      >
                        <Plus className="h-4 w-4" />
                        <span>
                          {item.customizable && item.type === "Soup/Sauce" ? 'Select Foods' : ''}
                          {item.customizable && (item.type === "Pizza" || item.type === "Lusaniya") ? 'Select Size' : ''}
                          {!item.customizable ? 'Add' : ''}
                        </span>
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
              <a href='https://g.co/kgs/gvxzc8U' target='_blank' rel="noopener noreferrer">
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
                          {item.customization && item.customization.type === "Soup/Sauce" && (
                            <p className="text-gray-500 text-sm">
                              Base: {item.customization.base.name}
                              {item.customization.foods.length > 0 &&
                                ` | Food(s): ${item.customization.foods.map(f => f.name).join(', ')}`
                              }
                            </p>
                          )}
                           {item.customization && (item.customization.type === "Pizza" || item.customization.type === "Lusaniya") && (
                            <p className="text-gray-500 text-sm">
                              Size: {item.customization.size.name}
                              {item.customization.size.serves_people && ` (${item.customization.size.serves_people})`}
                            </p>
                          )}
                          <p className="text-orange-600 font-bold">UGX {item.price.toLocaleString()}</p>
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
                      <span className="text-orange-600">UGX {getTotalPrice().toLocaleString()}</span>
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

        {/* Generic Customization Modal (for Soup/Sauce bases, Pizzas, and Lusaniya) */}
        {isCustomizationOpen && currentCustomizingItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-xl max-w-lg w-full mx-4 overflow-y-auto max-h-[90vh]">
              <div className="flex justify-between items-center mb-6 border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  Customize Your {currentCustomizingItem.name}
                </h2>
                <button
                  onClick={() => setIsCustomizationOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Conditional rendering for Soup/Sauce customization */}
                {currentCustomizingItem.type === "Soup/Sauce" && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Select Your Food Items (You can choose multiple):</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {currentCustomizingItem.options.foods.map(food => (
                        <button
                          key={food.name}
                          onClick={() => {
                            setSelectedFoods(prev =>
                              prev.some(f => f.name === food.name)
                                ? prev.filter(f => f.name !== food.name)
                                : [...prev, food]
                            );
                          }}
                          className={`p-4 rounded-lg border-2 text-left transition-colors ${
                            selectedFoods.some(f => f.name === food.name)
                              ? 'border-orange-600 bg-orange-50'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          <p className="font-medium text-gray-900">{food.name}</p>
                          {food.price > 0 && <p className="text-sm text-gray-600">+UGX {food.price.toLocaleString()}</p>}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Conditional rendering for Pizza/Lusaniya customization */}
                {(currentCustomizingItem.type === "Pizza" || currentCustomizingItem.type === "Lusaniya") && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Choose Your Size:</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {currentCustomizingItem.options.sizes.map(size => (
                        <button
                          key={size.name}
                          onClick={() => setSelectedSize(size)}
                          className={`p-4 rounded-lg border-2 text-left transition-colors ${
                            selectedSize?.name === size.name
                              ? 'border-orange-600 bg-orange-50'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          <p className="font-medium text-gray-900">{size.name}</p>
                          <p className="text-sm text-gray-600">UGX {size.price.toLocaleString()}</p>
                          {size.serves_people && <p className="text-xs text-gray-500">Serves: {size.serves_people}</p>}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-8 pt-6 border-t flex justify-between items-center">
                <span className="text-2xl font-bold text-orange-600">Total: UGX {currentCustomPrice.toLocaleString()}</span>
                <button
                  onClick={handleAddCustomDishToCart}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  // Disable if no selection made based on type
                  disabled={
                    (currentCustomizingItem.type === "Soup/Sauce" && selectedFoods.length === 0) ||
                    ((currentCustomizingItem.type === "Pizza" || currentCustomizingItem.type === "Lusaniya") && !selectedSize)
                  }
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
//test