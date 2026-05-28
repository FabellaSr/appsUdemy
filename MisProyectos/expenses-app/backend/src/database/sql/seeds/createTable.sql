-- =============================================================
-- DATABASE SETUP - SQL Server
-- Proyecto: Family Expenses
-- Ejecutar en orden. Seguro de correr múltiples veces (IF NOT EXISTS).
-- =============================================================

USE expenses;
GO

-- -------------------------------------------------------------
-- 1. USERS
--    Tabla base. Las demás tienen FK hacia acá.
-- -------------------------------------------------------------
IF NOT EXISTS (SELECT 1 FROM sys.tables WHERE name = 'users')
BEGIN
  CREATE TABLE dbo.users (
    id        UNIQUEIDENTIFIER  NOT NULL DEFAULT NEWSEQUENTIALID(),
    authId    NVARCHAR(255)     NOT NULL,
    email     NVARCHAR(255)     NOT NULL,
    name      NVARCHAR(255)     NOT NULL,
    role      VARCHAR(20)       NOT NULL DEFAULT 'MEMBER',

    CONSTRAINT PK_users PRIMARY KEY (id)
  );
  PRINT 'Tabla users creada.';
END
ELSE
  PRINT 'Tabla users ya existe, se omite.';
GO

-- -------------------------------------------------------------
-- 2. CATEGORIES
-- -------------------------------------------------------------
IF NOT EXISTS (SELECT 1 FROM sys.tables WHERE name = 'categories')
BEGIN
  CREATE TABLE dbo.categories (
    id    UNIQUEIDENTIFIER  NOT NULL DEFAULT NEWSEQUENTIALID(),
    name  NVARCHAR(255)     NOT NULL,
    color NVARCHAR(50)      NULL,

    CONSTRAINT PK_categories PRIMARY KEY (id)
  );
  PRINT 'Tabla categories creada.';
END
ELSE
  PRINT 'Tabla categories ya existe, se omite.';
GO

-- -------------------------------------------------------------
-- 3. EXPENSES
-- -------------------------------------------------------------
IF NOT EXISTS (SELECT 1 FROM sys.tables WHERE name = 'expenses')
BEGIN
  CREATE TABLE dbo.expenses (
    id          UNIQUEIDENTIFIER  NOT NULL DEFAULT NEWSEQUENTIALID(),
    [date]      DATE              NOT NULL,
    categoryId  NVARCHAR(255)     NOT NULL,
    concept     NVARCHAR(255)     NOT NULL,
    amount      DECIMAL(18, 2)    NOT NULL,
    userId      NVARCHAR(255)     NOT NULL,
    receiptUrl  NVARCHAR(500)     NULL,
    createdAt   DATETIME2         NOT NULL DEFAULT SYSUTCDATETIME(),

    CONSTRAINT PK_expenses PRIMARY KEY (id)
  );
  PRINT 'Tabla expenses creada.';
END
ELSE
  PRINT 'Tabla expenses ya existe, se omite.';
GO

-- -------------------------------------------------------------
-- 4. MONTHLY_CLOSES
-- -------------------------------------------------------------
IF NOT EXISTS (SELECT 1 FROM sys.tables WHERE name = 'monthly_closes')
BEGIN
  CREATE TABLE dbo.monthly_closes (
    id        UNIQUEIDENTIFIER  NOT NULL DEFAULT NEWSEQUENTIALID(),
    year      INT               NOT NULL,
    month     INT               NOT NULL,
    closed    BIT               NOT NULL DEFAULT 0,
    closedAt  DATETIME2         NULL,

    CONSTRAINT PK_monthly_closes   PRIMARY KEY (id),
    CONSTRAINT UQ_monthly_closes   UNIQUE (year, month)
  );
  PRINT 'Tabla monthly_closes creada.';
END
ELSE
  PRINT 'Tabla monthly_closes ya existe, se omite.';
GO

-- -------------------------------------------------------------
-- 5. SHARED_FUNDS
--    Un registro por mes con el monto total a dividir.
--    Un único fondo por mes (UNIQUE year+month).
-- -------------------------------------------------------------
IF NOT EXISTS (SELECT 1 FROM sys.tables WHERE name = 'shared_funds')
BEGIN
  CREATE TABLE dbo.shared_funds (
    id            INT            NOT NULL IDENTITY(1,1),
    year          INT            NOT NULL,
    month         INT            NOT NULL,
    targetAmount  DECIMAL(18,2)  NOT NULL,
    createdAt     DATETIME2      NOT NULL DEFAULT SYSUTCDATETIME(),

    CONSTRAINT PK_shared_funds  PRIMARY KEY (id),
    CONSTRAINT UQ_shared_funds  UNIQUE (year, month)
  );
  PRINT 'Tabla shared_funds creada.';
END
ELSE
  PRINT 'Tabla shared_funds ya existe, se omite.';
GO

-- -------------------------------------------------------------
-- 6. MEMBER_SALARIES
--    Salario declarado por usuario por mes.
--    FK a users.id con ON DELETE NO ACTION para evitar drops
--    problemáticos con synchronize:true en SQL Server.
-- -------------------------------------------------------------
IF NOT EXISTS (SELECT 1 FROM sys.tables WHERE name = 'member_salaries')
BEGIN
  CREATE TABLE dbo.member_salaries (
    id      INT               NOT NULL IDENTITY(1,1),
    userId  UNIQUEIDENTIFIER  NOT NULL,
    year    INT               NOT NULL,
    month   INT               NOT NULL,
    salary  DECIMAL(18,2)     NOT NULL,

    CONSTRAINT PK_member_salaries   PRIMARY KEY (id),
    CONSTRAINT UQ_member_salaries   UNIQUE (userId, year, month),
    CONSTRAINT FK_member_salaries_users
      FOREIGN KEY (userId) REFERENCES dbo.users(id)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION
  );
  PRINT 'Tabla member_salaries creada.';
END
ELSE
  PRINT 'Tabla member_salaries ya existe, se omite.';
GO

-- =============================================================
-- VERIFICACIÓN FINAL
-- =============================================================
SELECT
  t.name          AS tabla,
  p.rows          AS filas_aprox
FROM sys.tables t
JOIN sys.partitions p
  ON t.object_id = p.object_id AND p.index_id IN (0, 1)
WHERE t.name IN (
  'users', 'categories', 'expenses',
  'monthly_closes', 'shared_funds', 'member_salaries'
)
ORDER BY t.name;
GO