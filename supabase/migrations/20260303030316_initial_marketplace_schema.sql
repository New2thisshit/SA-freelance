-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Define Enums
CREATE TYPE user_role AS ENUM ('client', 'freelancer');
CREATE TYPE gig_category AS ENUM ('development', 'design', 'marketing', 'writing', 'video', 'music', 'other');
CREATE TYPE order_status AS ENUM ('pending', 'active', 'completed', 'cancelled');

-- 1. Profiles Table (Extends auth.users)
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    role user_role NOT NULL DEFAULT 'client',
    full_name TEXT,
    avatar_url TEXT,
    location TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Protect Profiles with RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone."
    ON profiles FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile."
    ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile."
    ON profiles FOR UPDATE USING (auth.uid() = id);

-- 2. Freelancer Details Table
CREATE TABLE freelancer_details (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
    title TEXT,
    bio TEXT,
    hourly_rate NUMERIC(10, 2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Protect Freelancer Details with RLS
ALTER TABLE freelancer_details ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Freelancer details are viewable by everyone."
    ON freelancer_details FOR SELECT USING (true);

CREATE POLICY "Users can insert their own freelancer details."
    ON freelancer_details FOR INSERT WITH CHECK (auth.uid() = profile_id);

CREATE POLICY "Users can update own freelancer details."
    ON freelancer_details FOR UPDATE USING (auth.uid() = profile_id);

-- 3. Gigs Table
CREATE TABLE gigs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    freelancer_id UUID NOT NULL REFERENCES freelancer_details(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    category gig_category NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    delivery_time_days INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Protect Gigs with RLS
ALTER TABLE gigs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Gigs are viewable by everyone."
    ON gigs FOR SELECT USING (true);

CREATE POLICY "Freelancers can insert their own gigs."
    ON gigs FOR INSERT WITH CHECK (
        auth.uid() IN (
            SELECT profile_id 
            FROM freelancer_details 
            WHERE id = freelancer_id
        )
    );

CREATE POLICY "Freelancers can update own gigs."
    ON gigs FOR UPDATE USING (
        auth.uid() IN (
            SELECT profile_id 
            FROM freelancer_details 
            WHERE id = freelancer_id
        )
    );

CREATE POLICY "Freelancers can delete own gigs."
    ON gigs FOR DELETE USING (
        auth.uid() IN (
            SELECT profile_id 
            FROM freelancer_details 
            WHERE id = freelancer_id
        )
    );


-- 4. Orders Table
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    gig_id UUID NOT NULL REFERENCES gigs(id) ON DELETE RESTRICT,
    client_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    status order_status NOT NULL DEFAULT 'pending',
    total_amount NUMERIC(10, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Protect Orders with RLS
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Clients can view their own orders."
    ON orders FOR SELECT USING (auth.uid() = client_id);

CREATE POLICY "Freelancers can view orders for their gigs."
    ON orders FOR SELECT USING (
        auth.uid() IN (
            SELECT fd.profile_id
            FROM gigs g
            JOIN freelancer_details fd ON g.freelancer_id = fd.id
            WHERE g.id = orders.gig_id
        )
    );

CREATE POLICY "Clients can create orders."
    ON orders FOR INSERT WITH CHECK (auth.uid() = client_id);

CREATE POLICY "Freelancers and Clients can update order status."
    ON orders FOR UPDATE USING (
        auth.uid() = client_id OR 
        auth.uid() IN (
            SELECT fd.profile_id
            FROM gigs g
            JOIN freelancer_details fd ON g.freelancer_id = fd.id
            WHERE g.id = orders.gig_id
        )
    );

-- Functions and Triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_freelancer_details_updated_at
    BEFORE UPDATE ON freelancer_details
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_gigs_updated_at
    BEFORE UPDATE ON gigs
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
    BEFORE UPDATE ON orders
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
