CREATE TABLE `counter` (
  `slug` TEXT PRIMARY KEY NOT NULL,
  `views` INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_views ON counter(`views`);
