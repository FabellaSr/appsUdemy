-- =============================================================
-- DATABASE SETUP - PostgreSQL
-- Proyecto: Family Expenses
-- Compatible con: Docker local, Railway, Supabase
-- Seguro de correr múltiples veces (IF NOT EXISTS).
-- =============================================================

-- -------------------------------------------------------------
-- 1. USERS
--    Tabla unificada: credenciales de auth + datos del miembro.
--    Reemplaza AuthUser (Mongo) + UserEntity (SQL Server).
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
  id            UUID          NOT NULL DEFAULT gen_random_uuid(),
  email         VARCHAR(255)  NOT NULL,
  name          VARCHAR(255)  NOT NULL,
  "passwordHash" VARCHAR(255) NOT NULL,
  role          VARCHAR(20)   NOT NULL DEFAULT 'MEMBER',
  "refreshToken" VARCHAR(500) NULL,

  CONSTRAINT pk_users    PRIMARY KEY (id),
  CONSTRAINT uq_users_email UNIQUE (email)
);

-- -------------------------------------------------------------
-- 2. CATEGORIES
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS categories (
  id    UUID          NOT NULL DEFAULT gen_random_uuid(),
  name  VARCHAR(255)  NOT NULL,
  color VARCHAR(50)   NULL,

  CONSTRAINT pk_categories PRIMARY KEY (id)
);

-- -------------------------------------------------------------
-- 3. EXPENSES
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS expenses (
  id           UUID           NOT NULL DEFAULT gen_random_uuid(),
  date         DATE           NOT NULL,
  "categoryId" VARCHAR(255)   NOT NULL,
  concept      VARCHAR(255)   NOT NULL,
  amount       DECIMAL(18, 2) NOT NULL,
  "userId"     VARCHAR(255)   NOT NULL,
  "receiptUrl" VARCHAR(500)   NULL,
  "createdAt"  TIMESTAMP      NOT NULL DEFAULT NOW(),

  CONSTRAINT pk_expenses PRIMARY KEY (id)
);

-- -------------------------------------------------------------
-- 4. MONTHLY_CLOSES
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS monthly_closes (
  id         UUID      NOT NULL DEFAULT gen_random_uuid(),
  year       INT       NOT NULL,
  month      INT       NOT NULL,
  closed     BOOLEAN   NOT NULL DEFAULT FALSE,
  "closedAt" TIMESTAMP NULL,

  CONSTRAINT pk_monthly_closes PRIMARY KEY (id),
  CONSTRAINT uq_monthly_closes UNIQUE (year, month)
);

-- -------------------------------------------------------------
-- 5. SHARED_FUNDS
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS shared_funds (
  id             SERIAL         NOT NULL,
  year           INT            NOT NULL,
  month          INT            NOT NULL,
  "targetAmount" DECIMAL(18, 2) NOT NULL,
  "createdAt"    TIMESTAMP      NOT NULL DEFAULT NOW(),

  CONSTRAINT pk_shared_funds PRIMARY KEY (id),
  CONSTRAINT uq_shared_funds UNIQUE (year, month)
);

-- -------------------------------------------------------------
-- 6. MEMBER_SALARIES
--    FK a users.id
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS member_salaries (
  id       SERIAL         NOT NULL,
  "userId" UUID           NOT NULL,
  year     INT            NOT NULL,
  month    INT            NOT NULL,
  salary   DECIMAL(18, 2) NOT NULL,

  CONSTRAINT pk_member_salaries  PRIMARY KEY (id),
  CONSTRAINT uq_member_salaries  UNIQUE ("userId", year, month),
  CONSTRAINT fk_member_salaries_users
    FOREIGN KEY ("userId") REFERENCES users(id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

-- =============================================================
-- VERIFICACIÓN FINAL
-- =============================================================
SELECT
  table_name,
  (SELECT COUNT(*) FROM information_schema.columns c
   WHERE c.table_name = t.table_name AND c.table_schema = 'public') AS columnas
FROM information_schema.tables t
WHERE table_schema = 'public'
  AND table_name IN (
    'users', 'categories', 'expenses',
    'monthly_closes', 'shared_funds', 'member_salaries'
  )
ORDER BY table_name;
