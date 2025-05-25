CREATE TABLE makes (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
);

CREATE TABLE finishes (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
);

CREATE TABLE run_types (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
);

CREATE TABLE scales (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
);

CREATE TABLE molds (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    make_id INTEGER REFERENCES makes(id) ON DELETE SET NULL,
    UNIQUE(name, make_id)
);

CREATE TABLE models (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    mold_id INTEGER REFERENCES molds(id) ON DELETE SET NULL,
    run_type_id INTEGER REFERENCES run_types(id),
    finish_id INTEGER REFERENCES finishes(id),
    scale_id INTEGER REFERENCES scales(id),
    UNIQUE(name, mold_id)
);

CREATE TABLE breeds (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
);

CREATE TABLE types (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
);

CREATE TABLE colors (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
);

CREATE TABLE patterns (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
);

CREATE TABLE genders (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
);

CREATE TABLE conditions (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
);

CREATE TABLE locations (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
);

CREATE TABLE horses (
    id SERIAL PRIMARY KEY,
    tagged BOOLEAN NOT NULL DEFAULT FALSE,
    make_id INTEGER REFERENCES makes(id),
    finish_id INTEGER REFERENCES finishes(id),
    run_type_id INTEGER REFERENCES run_types(id),
    scale_id INTEGER REFERENCES scales(id),
    mold_id INTEGER REFERENCES molds(id),
    model_id INTEGER REFERENCES models(id),
    breed_id INTEGER REFERENCES breeds(id),
    type_id INTEGER REFERENCES types(id),
    color_id INTEGER REFERENCES colors(id),
    pattern_id INTEGER REFERENCES patterns(id),
    gender_id INTEGER REFERENCES genders(id),
    condition_id INTEGER REFERENCES conditions(id),
    location_id INTEGER REFERENCES locations(id),
    show_name TEXT,
    office_pony BOOLEAN NOT NULL DEFAULT FALSE,
    status TEXT,
    translation TEXT,
    pedigree TEXT
);