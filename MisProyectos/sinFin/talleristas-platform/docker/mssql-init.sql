-- Script opcional. La DB se crea automáticamente desde TypeORM si no existe.
-- Lo dejamos como referencia.
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'talleristas')
BEGIN
    CREATE DATABASE talleristas;
END
GO
