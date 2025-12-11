# Fruitopia - E-Commerce Cart System

## Cart Persistence Architecture

### Current Implementation

The cart system now supports **hybrid persistence** - combining both browser storage and cloud database:

#### For Authenticated Users:
- ✅ Cart automatically saved to **Supabase Database**
- ✅ Cart persists across logout/login
- ✅ Cart syncs in real-time when items are added/removed
- ✅ Isolated per user with Row Level Security (RLS)

#### For Guest Users:
- ✅ Cart saved to **Browser LocalStorage**
- ✅ Cart persists during browsing session
- ✅ Cart clears when browser data is cleared
- ✅ Seamless upgrade when guest logs in

### User Flow

```
Guest User Flow:
  1. Browse shop → Add items to cart (stored in localStorage)
  2. Cart persists across page refreshes
  3. User logs in → Cart migrated to Supabase
  4. Cart continues syncing to Supabase on changes

Authenticated User Flow:
  1. Login → Cart loaded from Supabase
  2. Add/remove items → Cart auto-syncs to Supabase
  3. Logout → Cart in localStorage for guest browsing
  4. Login again → Cart restored from Supabase (no data loss)
```

### Setup Required

To enable Supabase cart storage, you need to:

1. **Create the `user_carts` table** in Supabase:
   - See `SUPABASE_MIGRATION.md` for SQL migration
   - Run SQL in Supabase SQL Editor

2. **Why separate table?**
   - User authentication info is in `auth.users` table
   - Cart data is stored in `public.user_carts` table
   - Clean separation of concerns
   - RLS policies ensure security

### Cart Data Structure

**In LocalStorage (Guest Users):**
```javascript
{
  cartItems: [
    {
      id: 1,
      name: "Apple",
      price: 50000,
      quantity: 2,
      image_url: "...",
      description: "..."
    }
  ],
  selectedItems: [1, 3, 5] // Item IDs for checkout
}
```

**In Supabase (Authenticated Users):**
```javascript
{
  id: "uuid",
  user_id: "auth-user-id",
  cart_items: [...same structure],
  selected_items: [...same structure],
  created_at: "timestamp",
  updated_at: "timestamp"
}
```

### Key Features

1. **Selection Management**
   - Users can select which items to checkout
   - Selection persists (stored alongside cart)
   - Separate from cart items for flexibility

2. **Automatic Syncing**
   - Changes to cart auto-save to Supabase (if authenticated)
   - No manual save button needed
   - Real-time updates

3. **Shipping Fee Logic**
   - Free shipping for orders ≥ Rp 100.000
   - Rp 25.000 shipping fee for smaller orders
   - Calculated only on selected items

4. **RLS Security**
   - Users can only see/modify their own cart
   - Enforced at database level
   - No client-side security needed

### Development Notes

**Cart Provider Location:** `/src/context/CartProvider.jsx`

**Key Functions:**
- `addToCart(item)` - Add or increment item
- `removeFromCart(itemId)` - Remove item from cart
- `updateQuantity(itemId, quantity)` - Update quantity
- `toggleSelectItem(itemId)` - Toggle item selection
- `getSelectedTotal()` - Get selected items total
- `getShippingFee()` - Calculate shipping based on total
- `getFinalTotal()` - Get final checkout total

**Context Hooks:** `useCart()` - Access cart functions and state

### Benefits of This Approach

✅ **No Data Loss** - Guest cart migrates to Supabase on login
✅ **Offline Support** - Works without internet for guests
✅ **Security** - RLS ensures user isolation
✅ **Scalability** - Database-backed vs just localStorage
✅ **User Experience** - Seamless across devices
✅ **Flexibility** - Works for both guests and authenticated users

### Testing Cart Persistence

1. **As Guest User:**
   - Add items to cart
   - Refresh page → Items still there ✓
   - Clear browser data → Cart cleared ✓

2. **As Authenticated User:**
   - Add items → Check Supabase user_carts table ✓
   - Logout → Items in localStorage ✓
   - Login again → Items restored from Supabase ✓

3. **Migration:**
   - Add items as guest
   - Login → Cart persists ✓
   - Logout → Items in localStorage ✓
   - Login with different account → Different cart ✓
