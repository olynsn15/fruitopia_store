/**
 * QUICK START GUIDE
 * 
 * Login & Register Components are now fully Firebase-integrated!
 */

// ===== LOGIN EXAMPLE =====
// The Login component is in: src/components/Login.jsx
// It automatically handles:
// - Email/password validation
// - Firebase authentication
// - User profile loading from Firestore
// - Error display
// 
// Usage in Navbar.jsx:
// <Login onClose={() => setShowLogin(false)} switchToRegister={() => {...}} />


// ===== REGISTER EXAMPLE =====
// The Register component is in: src/components/Register.jsx
// It automatically handles:
// - Account creation with Firebase
// - Password validation (min 6 chars, confirmation match)
// - User profile creation in Firestore
// - Empty cart initialization
// 
// Usage in Navbar.jsx:
// <Register onClose={() => setShowRegister(false)} switchToLogin={() => {...}} />


// ===== CART USAGE EXAMPLE =====
import { useCart } from './hooks/useCart'

function ProductCard() {
  const { addToCart, getTotalItems } = useCart()

  const handleAddToCart = () => {
    addToCart({
      id: 'product-123',
      name: 'Apple',
      price: 10.50,
      quantity: 1,
      image: '/apple.jpg'
    })
  }

  return (
    <>
      <button onClick={handleAddToCart}>Add to Cart</button>
      <span>Items in cart: {getTotalItems()}</span>
    </>
  )
}


// ===== FIRESTORE USER STRUCTURE =====
// After registration, user document created:
// {
//   uid: 'firebase-user-id',
//   email: 'user@example.com',
//   name: 'username',
//   createdAt: '2025-12-04T10:30:00.000Z',
//   cart: [
//     {
//       id: 'prod-1',
//       name: 'Apple',
//       price: 10,
//       quantity: 2
//     }
//   ]
// }


// ===== ALL CART METHODS =====
const {
  cart,                    // Array of cart items
  loading,                 // Boolean - loading state
  addToCart,              // (product) => void
  removeFromCart,         // (productId) => void
  updateCartItem,         // (productId, quantity) => void
  clearCart,              // () => void
  getTotalPrice,          // () => number
  getTotalItems,          // () => number
  loadCartFromFirebase    // () => Promise
} = useCart()


// ===== TESTING IN DEV =====
// 1. Run: npm run dev
// 2. Register new account - check Firestore for user document
// 3. Add items to cart - check Firestore for cart array
// 4. Logout and login - cart should persist
// 5. Test errors: duplicate email, weak password, etc.
