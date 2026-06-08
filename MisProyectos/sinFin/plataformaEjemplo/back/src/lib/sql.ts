import sql, { ConnectionPool } from "mssql";

let pool: ConnectionPool | null = null;
let schemaReady = false;

export async function getSqlPool(): Promise<ConnectionPool> {
  if (pool) return pool;
  pool = await new sql.ConnectionPool({
    server: process.env.SQL_HOST!,
    port: Number(process.env.SQL_PORT || 1433),
    user: process.env.SQL_USER!,
    password: process.env.SQL_PASSWORD!,
    database: process.env.SQL_DATABASE!,
    options: {
      encrypt: process.env.SQL_ENCRYPT === "true",
      trustServerCertificate: process.env.SQL_TRUST_SERVER_CERTIFICATE !== "false",
    },
    pool: { max: 10, min: 0, idleTimeoutMillis: 30000 },
  }).connect();
  console.log("[sqlserver] connected");
  await ensureSchema();
  return pool;
}

async function ensureSchema() {
  if (schemaReady || !pool) return;
  const stmts = [
    `IF NOT EXISTS (SELECT 1 FROM sys.databases WHERE name='${process.env.SQL_DATABASE}')
       CREATE DATABASE [${process.env.SQL_DATABASE}];`,
    `IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='providers' AND xtype='U')
     CREATE TABLE providers (
       id NVARCHAR(64) PRIMARY KEY,
       businessName NVARCHAR(200) NOT NULL,
       category NVARCHAR(80) NOT NULL,
       description NVARCHAR(MAX),
       phone NVARCHAR(40), whatsapp NVARCHAR(40),
       email NVARCHAR(160), location NVARCHAR(200),
       profileImage NVARCHAR(500),
       socialLinks NVARCHAR(MAX),
       taxId NVARCHAR(80),
       createdAt DATETIME2 DEFAULT SYSUTCDATETIME()
     );`,
    `IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='collections' AND xtype='U')
     CREATE TABLE collections (
       id NVARCHAR(64) PRIMARY KEY,
       providerId NVARCHAR(64) NOT NULL,
       title NVARCHAR(200) NOT NULL,
       description NVARCHAR(MAX),
       monthlyPrice DECIMAL(12,2) NOT NULL DEFAULT 0,
       status NVARCHAR(16) NOT NULL DEFAULT 'pending',
       createdAt DATETIME2 DEFAULT SYSUTCDATETIME()
     );`,
    `IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='collection_photos' AND xtype='U')
     CREATE TABLE collection_photos (
       id NVARCHAR(64) PRIMARY KEY,
       collectionId NVARCHAR(64) NOT NULL,
       url NVARCHAR(1000) NOT NULL,
       createdAt DATETIME2 DEFAULT SYSUTCDATETIME()
     );`,
    `IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='collection_prices' AND xtype='U')
     CREATE TABLE collection_prices (
       id INT IDENTITY PRIMARY KEY,
       collectionId NVARCHAR(64) NOT NULL,
       price DECIMAL(12,2) NOT NULL,
       changedAt DATETIME2 DEFAULT SYSUTCDATETIME()
     );`,
    `IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='payments' AND xtype='U')
     CREATE TABLE payments (
       id NVARCHAR(64) PRIMARY KEY,
       providerId NVARCHAR(64) NOT NULL,
       amount DECIMAL(12,2) NOT NULL,
       paymentDate DATETIME2 DEFAULT SYSUTCDATETIME(),
       confirmationDate DATETIME2 NULL,
       receiptNumber NVARCHAR(80),
       status NVARCHAR(16) NOT NULL DEFAULT 'pending'
     );`,
    `IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='logs' AND xtype='U')
     CREATE TABLE logs (
       id INT IDENTITY PRIMARY KEY,
       userId NVARCHAR(64),
       action NVARCHAR(120),
       payload NVARCHAR(MAX),
       createdAt DATETIME2 DEFAULT SYSUTCDATETIME()
     );`,
  ];
  for (const s of stmts) await pool.request().query(s);
  schemaReady = true;
  console.log("[sqlserver] schema ready");
}
