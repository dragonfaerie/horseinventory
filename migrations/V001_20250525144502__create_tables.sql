

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
