CREATE TABLE t_p3068365_syktyvkar_freight_po.orders (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  from_address TEXT,
  to_address TEXT,
  comment TEXT,
  truck TEXT,
  distance TEXT,
  price INTEGER,
  loaders BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);