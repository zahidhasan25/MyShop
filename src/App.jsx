
import { useState } from "react";
import "./App.css";

// Product Images
import watchImg from "./assets/products/watch.jpg";
import headphonesImg from "./assets/products/headphones.jpg";
import backpackImg from "./assets/products/backpack.jpg";
import sunglassesImg from "./assets/products/Sunglasses.jpg";
import beautyImg from "./assets/products/beauty-skin-care-personal-care-liquid.png";
import serumImg from "./assets/products/cosmetic serum pipette bottle package.png";

// Products
const products = [
  {
    id: 1,
    name: "Premium Smart Watch",
    price: 2490,
    oldPrice: 2990,
    category: "Electronics",
    image: watchImg,
  },
  {
    id: 2,
    name: "Wireless Headphones",
    price: 1590,
    oldPrice: 1990,
    category: "Electronics",
    image: headphonesImg,
  },
  {
    id: 3,
    name: "Stylish Backpack",
    price: 1290,
    oldPrice: 1590,
    category: "Fashion",
    image: backpackImg,
  },
  {
    id: 4,
    name: "Premium Sunglasses",
    price: 890,
    oldPrice: 1190,
    category: "Fashion",
    image: sunglassesImg,
  },
  {
    id: 5,
    name: "Beauty Skin Care",
    price: 690,
    oldPrice: 890,
    category: "Beauty",
    image: beautyImg,
  },
  {
    id: 6,
    name: "Cosmetic Serum",
    price: 590,
    oldPrice: 790,
    category: "Beauty",
    image: serumImg,
  },
];

const categories = [
  { name: "Electronics", emoji: "📱" },
  { name: "Fashion", emoji: "👕" },
  { name: "Home & Living", emoji: "🏠" },
  { name: "Accessories", emoji: "🎒" },
];

function App() {
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [orderSuccess, setOrderSuccess] = useState(false);

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
  });

  // Filter Products
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  // Cart Total Quantity
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Cart Total Price
  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Add Product to Cart
  const addToCart = (product) => {
    setCart((currentCart) => {
      const existingProduct = currentCart.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentCart, { ...product, quantity: 1 }];
    });
  };

  // Increase Quantity
  const increaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Decrease Quantity
  const decreaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Remove Product
  const removeFromCart = (id) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== id)
    );
  };

  // Open Checkout
  const openCheckout = () => {
    if (cart.length === 0) return;

    setShowCart(false);
    setShowCheckout(true);
    setOrderSuccess(false);
  };

  // Confirm Order
  const confirmOrder = (e) => {
    e.preventDefault();

    if (!customer.name || !customer.phone || !customer.address) {
      alert("Please fill in all customer information.");
      return;
    }

    setOrderSuccess(true);
    setCart([]);
  };

  // Close All Panels
  const closePanels = () => {
    setShowCart(false);
    setShowCheckout(false);
    setOrderSuccess(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">

      {/* Header */}
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-5">

          <h1 className="text-2xl font-extrabold text-blue-600">
            MyShop
          </h1>

          {/* Search */}
          <div className="hidden max-w-xl flex-1 md:flex">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-full border border-slate-200 bg-slate-50 px-5 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* Header Actions */}
          <div className="flex items-center gap-4">
            <button className="hidden text-sm font-medium sm:block">
              Sign In
            </button>

            <button
              onClick={() => setShowCart(true)}
              className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              🛒 Cart ({cartCount})
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="mx-auto max-w-7xl px-5 pb-4 md:hidden">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-full border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        {/* Navigation */}
        <nav className="mx-auto flex max-w-7xl gap-6 overflow-x-auto px-5 pb-4 text-sm font-medium">
          <a href="#home" className="whitespace-nowrap text-blue-600">
            Home
          </a>
          <a href="#products" className="whitespace-nowrap">
            All Products
          </a>
          <a href="#categories" className="whitespace-nowrap">
            Categories
          </a>
          <a href="#offers" className="whitespace-nowrap">
            Special Offers
          </a>
        </nav>
      </header>

      {/* Main Content */}
      <main id="home" className="mx-auto max-w-7xl px-5 py-8">

        {/* Hero */}
        <section className="overflow-hidden rounded-3xl bg-blue-950 px-6 py-12 text-white md:px-14 md:py-16">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">

            <div className="max-w-xl">
              <p className="mb-3 font-semibold text-blue-300">
                Welcome to MyShop
              </p>

              <h2 className="text-4xl font-extrabold leading-tight md:text-6xl">
                Shop Smart.
                <br />
                Live Better.
              </h2>

              <p className="mt-5 text-slate-300">
                Discover quality products at amazing prices.
                Fast delivery across Bangladesh.
              </p>

              <a
                href="#products"
                className="mt-7 inline-block rounded-full bg-blue-500 px-7 py-3 font-bold text-white transition hover:bg-blue-400"
              >
                Shop Now →
              </a>
            </div>

            <div className="text-center">
              <img
                src={watchImg}
                alt="Smart Watch"
                className="mx-auto h-64 w-64 rounded-xl object-contain"
              />

              <p className="mt-3 text-sm font-semibold text-blue-200">
                Smart Wearable Collection
              </p>
            </div>

          </div>
        </section>

        {/* Categories */}
        <section id="categories" className="py-12">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              Shop by Category
            </h2>

            <span className="text-sm text-blue-600">
              Explore All →
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {categories.map((category) => (
              <div
                key={category.name}
                className="rounded-2xl border bg-white p-6 text-center transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="text-5xl">{category.emoji}</div>

                <h3 className="mt-3 font-semibold">
                  {category.name}
                </h3>
              </div>
            ))}
          </div>
        </section>

        {/* Products */}
        <section id="products" className="py-6">

          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              Featured Products
            </h2>

            <span className="text-sm text-blue-600">
              Best Sellers →
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {filteredProducts.map((product) => {
              const cartItem = cart.find(
                (item) => item.id === product.id
              );

              const quantity = cartItem ? cartItem.quantity : 0;

              return (
                <div
                  key={product.id}
                  className="overflow-hidden rounded-2xl border bg-white transition hover:-translate-y-1 hover:shadow-lg"
                >

                  {/* Product Image */}
                  <div className="flex h-52 items-center justify-center bg-slate-100 p-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-contain"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="p-5">

                    <p className="text-xs text-slate-500">
                      {product.category}
                    </p>

                    <h3 className="mt-2 font-bold">
                      {product.name}
                    </h3>

                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-xl font-extrabold text-blue-600">
                        ৳{product.price.toLocaleString("en-BD")}
                      </span>

                      <span className="text-sm text-slate-400 line-through">
                        ৳{product.oldPrice.toLocaleString("en-BD")}
                      </span>
                    </div>

                    {/* Cart Controls */}
                    {quantity === 0 ? (
                      <button
                        onClick={() => addToCart(product)}
                        className="mt-4 w-full rounded-full bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
                      >
                        Add to Cart
                      </button>
                    ) : (
                      <div className="mt-4 flex items-center justify-between rounded-full bg-green-100 p-2">

                        <button
                          onClick={() => decreaseQuantity(product.id)}
                          className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-lg font-bold text-slate-700 shadow-sm"
                        >
                          −
                        </button>

                        <span className="font-bold text-green-700">
                          ✓ Added ({quantity})
                        </span>

                        <button
                          onClick={() => increaseQuantity(product.id)}
                          className="flex h-9 w-9 items-center justify-center rounded-full bg-green-600 text-lg font-bold text-white"
                        >
                          +
                        </button>

                      </div>
                    )}

                  </div>
                </div>
              );
            })}

          </div>

          {filteredProducts.length === 0 && (
            <p className="py-10 text-center text-slate-500">
              No products found.
            </p>
          )}
        </section>

        {/* Offers */}
        <section id="offers" className="my-12 rounded-3xl bg-blue-100 p-8 text-center">
          <h2 className="text-3xl font-extrabold text-blue-950">
            Special Offers
          </h2>

          <p className="mt-2 text-slate-600">
            Enjoy exclusive deals on selected products.
          </p>

          <button
            onClick={() => {
              document
                .getElementById("products")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="mt-5 rounded-full bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            View Offers
          </button>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-blue-950 px-5 py-10 text-white">
        <div className="mx-auto max-w-7xl">

          <h2 className="text-2xl font-extrabold text-blue-300">
            MyShop
          </h2>

          <p className="mt-3 text-sm text-slate-300">
            Your trusted online shopping destination in Bangladesh.
          </p>

          <div className="mt-8 border-t border-blue-900 pt-5 text-center text-sm text-slate-400">
            © 2026 MyShop. All rights reserved.
          </div>

        </div>
      </footer>

      {/* Cart Overlay */}
      {showCart && (
        <div className="fixed inset-0 z-50 bg-black/50">

          <div className="ml-auto flex h-full w-full max-w-md flex-col bg-white shadow-2xl">

            {/* Cart Header */}
            <div className="flex items-center justify-between border-b p-5">
              <h2 className="text-2xl font-bold">
                🛒 Your Cart
              </h2>

              <button
                onClick={() => setShowCart(false)}
                className="text-2xl text-slate-500 hover:text-red-500"
              >
                ×
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-5">

              {cart.length === 0 ? (
                <div className="py-20 text-center">
                  <p className="text-5xl">🛒</p>
                  <p className="mt-4 text-slate-500">
                    Your cart is empty.
                  </p>
                </div>
              ) : (
                <div className="space-y-5">

                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-3 rounded-xl border p-3"
                    >

                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-20 w-20 rounded-lg bg-slate-100 object-contain"
                      />

                      <div className="min-w-0 flex-1">

                        <h3 className="font-semibold">
                          {item.name}
                        </h3>

                        <p className="mt-1 text-sm font-bold text-blue-600">
                          ৳{item.price.toLocaleString("en-BD")}
                        </p>

                        <div className="mt-2 flex items-center gap-3">

                          <button
                            onClick={() => decreaseQuantity(item.id)}
                            className="h-7 w-7 rounded-full border font-bold"
                          >
                            −
                          </button>

                          <span className="font-semibold">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() => increaseQuantity(item.id)}
                            className="h-7 w-7 rounded-full bg-blue-600 text-white font-bold"
                          >
                            +
                          </button>

                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="ml-auto text-xs font-medium text-red-500"
                          >
                            Remove
                          </button>

                        </div>

                        <p className="mt-2 text-sm text-slate-500">
                          Subtotal: ৳
                          {(item.price * item.quantity).toLocaleString("en-BD")}
                        </p>

                      </div>
                    </div>
                  ))}

                </div>
              )}

            </div>

            {/* Cart Footer */}
            {cart.length > 0 && (
              <div className="border-t p-5">

                <div className="mb-4 flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-blue-600">
                    ৳{cartTotal.toLocaleString("en-BD")}
                  </span>
                </div>

                <button
                  onClick={openCheckout}
                  className="w-full rounded-full bg-blue-600 py-3 font-bold text-white transition hover:bg-blue-700"
                >
                  Proceed to Checkout →
                </button>

              </div>
            )}

          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 p-4">

          <div className="mx-auto my-8 max-w-2xl rounded-3xl bg-white p-6 shadow-2xl md:p-8">

            {/* Checkout Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-extrabold text-blue-950">
                Checkout
              </h2>

              <button
                onClick={() => setShowCheckout(false)}
                className="text-2xl text-slate-500 hover:text-red-500"
              >
                ×
              </button>
            </div>

            {orderSuccess ? (
              // Success Message
              <div className="py-12 text-center">

                <div className="text-6xl">🎉</div>

                <h3 className="mt-5 text-2xl font-extrabold text-green-600">
                  Order Confirmed!
                </h3>

                <p className="mt-3 text-slate-600">
                  Thank you for shopping with MyShop.
                  Your order has been received.
                </p>

                <button
                  onClick={closePanels}
                  className="mt-6 rounded-full bg-blue-600 px-8 py-3 font-bold text-white"
                >
                  Continue Shopping
                </button>

              </div>
            ) : (
              <form onSubmit={confirmOrder} className="mt-6 space-y-6">

                {/* Customer Information */}
                <div>
                  <h3 className="mb-4 text-lg font-bold">
                    Customer Information
                  </h3>

                  <div className="space-y-4">

                    <input
                      type="text"
                      placeholder="Full Name"
                      value={customer.name}
                      onChange={(e) =>
                        setCustomer({
                          ...customer,
                          name: e.target.value,
                        })
                      }
                      required
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                    />

                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={customer.phone}
                      onChange={(e) =>
                        setCustomer({
                          ...customer,
                          phone: e.target.value,
                        })
                      }
                      required
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                    />

                    <textarea
                      placeholder="Delivery Address"
                      value={customer.address}
                      onChange={(e) =>
                        setCustomer({
                          ...customer,
                          address: e.target.value,
                        })
                      }
                      required
                      rows="3"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                    />

                  </div>
                </div>

                {/* Payment Methods */}
                <div>
                  <h3 className="mb-4 text-lg font-bold">
                    Select Payment Method
                  </h3>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">

                    {/* bKash */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("bkash")}
                      className={`rounded-xl border-2 p-4 text-center transition ${
                        paymentMethod === "bkash"
                          ? "border-pink-500 bg-pink-50"
                          : "border-slate-200 bg-white"
                      }`}
                    >
                      <div className="text-3xl">💗</div>
                      <p className="mt-2 font-bold text-pink-600">
                        bKash
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        Mobile Payment
                      </p>
                    </button>

                    {/* Nagad */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("nagad")}
                      className={`rounded-xl border-2 p-4 text-center transition ${
                        paymentMethod === "nagad"
                          ? "border-orange-500 bg-orange-50"
                          : "border-slate-200 bg-white"
                      }`}
                    >
                      <div className="text-3xl">🟠</div>
                      <p className="mt-2 font-bold text-orange-600">
                        Nagad
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        Mobile Payment
                      </p>
                    </button>

                    {/* Cash on Delivery */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("cod")}
                      className={`rounded-xl border-2 p-4 text-center transition ${
                        paymentMethod === "cod"
                          ? "border-blue-500 bg-blue-50"
                          : "border-slate-200 bg-white"
                      }`}
                    >
                      <div className="text-3xl">💵</div>
                      <p className="mt-2 font-bold text-blue-600">
                        Cash on Delivery
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        Pay on Delivery
                      </p>
                    </button>

                  </div>
                </div>

                {/* Payment Information */}
                {(paymentMethod === "bkash" ||
                  paymentMethod === "nagad") && (
                  <div className="rounded-xl bg-yellow-50 p-4 text-sm text-slate-700">

                    <p className="font-bold text-yellow-800">
                      Payment Instructions
                    </p>

                    <p className="mt-2">
                      {paymentMethod === "bkash"
                        ? "bKash payment integration is not connected yet. This is a demo checkout."
                        : "Nagad payment integration is not connected yet. This is a demo checkout."}
                    </p>

                    <p className="mt-2 font-semibold">
                      Payment Status: Not Connected
                    </p>

                  </div>
                )}

                {paymentMethod === "cod" && (
                  <div className="rounded-xl bg-blue-50 p-4 text-sm text-blue-800">
                    <p className="font-semibold">
                      Cash on Delivery selected.
                    </p>
                    <p className="mt-1">
                      Pay the delivery person when your order arrives.
                    </p>
                  </div>
                )}

                {/* Order Summary */}
                <div className="rounded-2xl bg-slate-50 p-5">

                  <h3 className="mb-3 font-bold">
                    Order Summary
                  </h3>

                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between gap-3 py-2 text-sm"
                    >
                      <span>
                        {item.name} × {item.quantity}
                      </span>

                      <span className="font-semibold">
                        ৳{(item.price * item.quantity).toLocaleString("en-BD")}
                      </span>
                    </div>
                  ))}

                  <div className="mt-3 flex justify-between border-t pt-3 text-lg font-extrabold">
                    <span>Total Amount</span>

                    <span className="text-blue-600">
                      ৳{cartTotal.toLocaleString("en-BD")}
                    </span>
                  </div>

                </div>

                {/* Confirm Order */}
                <button
                  type="submit"
                  className="w-full rounded-full bg-blue-600 py-4 font-bold text-white transition hover:bg-blue-700"
                >
                  Confirm Order →
                </button>

              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}

export default App;