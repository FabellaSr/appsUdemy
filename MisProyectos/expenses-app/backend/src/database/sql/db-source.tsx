import { DataSource } from 'typeorm';

const master = new DataSource({
  type: 'mssql',
  host: 'localhost',
  port: 1433,
  username: 'sa',
  password: 'YourStrong!Passw0rd',
  database: 'master',
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
});

async function ensureDatabase() {
  await master.initialize();

  await master.query(`
    IF DB_ID('expenses') IS NULL
    BEGIN
      CREATE DATABASE expenses
    END
  `);

  await master.destroy();
}