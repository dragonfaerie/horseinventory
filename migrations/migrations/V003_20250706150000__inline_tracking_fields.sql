ALTER TABLE horses
    ADD COLUMN purchase_price DECIMAL(10, 2) NOT NULL DEFAULT 0,
    ADD COLUMN sell_price DECIMAL(10, 2) NOT NULL DEFAULT 0,
    ADD COLUMN nan_qualified BOOLEAN NOT NULL DEFAULT FALSE,
    ADD COLUMN first_place INT NOT NULL DEFAULT 0,
    ADD COLUMN second_place INT NOT NULL DEFAULT 0,
    ADD COLUMN third_place INT NOT NULL DEFAULT 0,
    ADD COLUMN fourth_place INT NOT NULL DEFAULT 0,
    ADD COLUMN fifth_place INT NOT NULL DEFAULT 0;

DO $$
BEGIN
    IF EXISTS (
        SELECT 1
        FROM information_schema.tables
        WHERE table_schema = 'public' AND table_name = 'tracking'
    ) THEN
        UPDATE horses h
        SET purchase_price = COALESCE(t.purchase_price, 0),
            sell_price = COALESCE(t.sell_price, 0),
            nan_qualified = COALESCE(t.nan_qualified, FALSE),
            first_place = COALESCE(t.first_place, 0),
            second_place = COALESCE(t.second_place, 0),
            third_place = COALESCE(t.third_place, 0),
            fourth_place = COALESCE(t.fourth_place, 0),
            fifth_place = COALESCE(t.fifth_place, 0)
        FROM tracking t
        WHERE h.tracking_id = t.id;
    END IF;
END $$;

ALTER TABLE horses DROP CONSTRAINT IF EXISTS horses_tracking_fkey;
ALTER TABLE horses DROP CONSTRAINT IF EXISTS horses_tracking_id_fkey;
ALTER TABLE horses DROP COLUMN IF EXISTS tracking;
ALTER TABLE horses DROP COLUMN IF EXISTS tracking_id;

DROP TABLE IF EXISTS tracking;
