CREATE TABLE IF NOT EXISTS users
(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) DEFAULT 'Anonymous',
    password VARCHAR(255),
    email VARCHAR(255),
    role VARCHAR(255) DEFAULT 'user'
);

CREATE TABLE IF NOT EXISTS products
(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    price DECIMAL(10, 2),
    image TEXT,
    description TEXT,
    reviews DECIMAL(10, 2) DEFAULT 0
);
