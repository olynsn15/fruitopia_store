# Supabase Migration - User Cart Storage

## Setup Instructions

To enable cart persistence in Supabase, run the following SQL in your Supabase SQL Editor:

### 1. Create `user_carts` table

```sql
CREATE TABLE IF NOT EXISTS public.user_carts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  cart_items JSONB DEFAULT '[]'::jsonb,
  selected_items JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Enable RLS (Row Level Security)
ALTER TABLE public.user_carts ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Users can only see their own cart
CREATE POLICY "Users can view their own cart" ON public.user_carts
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can only update their own cart
CREATE POLICY "Users can update their own cart" ON public.user_carts
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can only insert their own cart
CREATE POLICY "Users can insert their own cart" ON public.user_carts
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create an index on user_id for better performance
CREATE INDEX IF NOT EXISTS idx_user_carts_user_id ON public.user_carts(user_id);
```

### 2. Verify the table

```sql
SELECT * FROM public.user_carts;
```

## Features

✅ **Authenticated Users:**
- Cart automatically saved to Supabase
- Cart persists across logout/login
- Each user has their own isolated cart

✅ **Guest Users:**
- Cart saved to browser localStorage
- Cart persists during session
- Clears when browser data is cleared

✅ **Hybrid Approach:**
- Guest cart migrates to Supabase when user logs in
- No data loss during authentication
- Seamless experience for both guests and authenticated users

## What Happens During Login/Logout

### On Login:
1. User's cart loaded from Supabase (if exists)
2. Previous guest cart from localStorage is available as backup
3. Cart syncs to Supabase automatically

### On Logout:
1. Cart remains in localStorage for guest browsing
2. Next login restores cart from Supabase
3. No data loss

## Notes

- Cart data is stored as JSONB for flexibility
- RLS (Row Level Security) ensures users can only access their own cart
- Indexes optimize performance for large user bases
- Automatic timestamps for audit trail
