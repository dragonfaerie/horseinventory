--CREATE TABLE manufacturers (
--    id SERIAL PRIMARY KEY,
--    name TEXT UNIQUE NOT NULL
--);
--
--CREATE TABLE finishes (
--    id SERIAL PRIMARY KEY,
--    name TEXT UNIQUE NOT NULL
--);
--
--CREATE TABLE run_types (
--    id SERIAL PRIMARY KEY,
--    name TEXT UNIQUE NOT NULL
--);
--
--CREATE TABLE scales (
--    id SERIAL PRIMARY KEY,
--    name TEXT UNIQUE NOT NULL
--);
--
--CREATE TABLE molds (
--    id SERIAL PRIMARY KEY,
--    name TEXT NOT NULL,
--    manufacturer_id INTEGER REFERENCES manufacturers(id) ON DELETE SET NULL,
--    UNIQUE(name, manufacturer_id)
--);

--CREATE TABLE models (
--    id SERIAL PRIMARY KEY,
--    name TEXT NOT NULL,
--    mold_id INTEGER REFERENCES molds(id) ON DELETE SET NULL,
--    run_type_id INTEGER REFERENCES run_types(id),
--    finish_id INTEGER REFERENCES finishes(id),
--    scale_id INTEGER REFERENCES scales(id),
--    UNIQUE(name, mold_id)
--);

--CREATE TABLE breeds (
--    id SERIAL PRIMARY KEY,
--    name TEXT UNIQUE NOT NULL
--);
--
--CREATE TABLE breed_types (
--    id SERIAL PRIMARY KEY,
--    name TEXT UNIQUE NOT NULL
--);

--CREATE TABLE colors (
--    id SERIAL PRIMARY KEY,
--    name TEXT UNIQUE NOT NULL
--);

--CREATE TABLE patterns (
--    id SERIAL PRIMARY KEY,
--    name TEXT UNIQUE NOT NULL
--);

--CREATE TABLE genders (
--    id SERIAL PRIMARY KEY,
--    name TEXT UNIQUE NOT NULL
--);

--CREATE TABLE conditions (
--    id SERIAL PRIMARY KEY,
--    name TEXT UNIQUE NOT NULL
--);

--CREATE TABLE locations (
--    id SERIAL PRIMARY KEY,
--    name TEXT UNIQUE NOT NULL
--);

--CREATE TABLE tracking (
--    id SERIAL PRIMARY KEY,
--    purchase_price NUMERIC(8, 2),
--    sell_price NUMERIC(8, 2),
--    nan_qualified BOOLEAN,
--    first_place INTEGER,
--    second_place INTEGER,
--    third_place INTEGER,
--    fourth_place INTEGER,
--    fifth_place INTEGER
--);

CREATE TABLE horses (
    id SERIAL PRIMARY KEY,
    tagged BOOLEAN NOT NULL DEFAULT FALSE,
    manufacturer_id INTEGER REFERENCES manufacturers(id),
    mold_id INTEGER REFERENCES molds(id),
    scale_id INTEGER REFERENCES scales(id),
    model_id INTEGER REFERENCES models(id),
    breed_id INTEGER REFERENCES breeds(id),
    breed_type_id INTEGER REFERENCES breed_types(id),
    color_id INTEGER REFERENCES colors(id),
    pattern_id INTEGER REFERENCES patterns(id),
    gender_id INTEGER REFERENCES genders(id),
    condition_id INTEGER REFERENCES conditions(id),
    location_id INTEGER REFERENCES locations(id),
    tracking_id INTEGER REFERENCES tracking(id),
    show_name TEXT,
    office_pony TEXT
);
