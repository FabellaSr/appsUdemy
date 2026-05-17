-- =====================================================================
-- AS400 Tasks Manager - SQL Server schema (idempotent)
-- =====================================================================

IF NOT EXISTS (SELECT 1 FROM sys.tables WHERE name = 'Sections')
BEGIN
  CREATE TABLE dbo.Sections (
    id           NVARCHAR(64)  NOT NULL PRIMARY KEY,
    title        NVARCHAR(128) NOT NULL,
    description  NVARCHAR(512) NULL,
    icon         NVARCHAR(64)  NULL,
    enabled      BIT           NOT NULL CONSTRAINT DF_Sections_enabled DEFAULT (0),
    sort_order   INT           NOT NULL CONSTRAINT DF_Sections_order   DEFAULT (0),
    created_at   DATETIME2     NOT NULL CONSTRAINT DF_Sections_created DEFAULT SYSUTCDATETIME(),
    updated_at   DATETIME2     NOT NULL CONSTRAINT DF_Sections_updated DEFAULT SYSUTCDATETIME()
  );
END;

IF NOT EXISTS (SELECT 1 FROM sys.tables WHERE name = 'InstallationAudit')
BEGIN
  CREATE TABLE dbo.InstallationAudit (
    id          BIGINT IDENTITY(1,1) PRIMARY KEY,
    usuario     NVARCHAR(64)  NOT NULL,
    tipo        NVARCHAR(16)  NOT NULL,
    numero      NVARCHAR(32)  NOT NULL,
    secuencia   NVARCHAR(16)  NULL,
    accion      NVARCHAR(32)  NOT NULL,  -- START | INSTALL_OBJECTS | INSTALL_SOURCES | BACKUP | CHANGE
    resultado   NVARCHAR(16)  NOT NULL,  -- OK | ERROR
    mensaje     NVARCHAR(MAX) NULL,
    payload     NVARCHAR(MAX) NULL,
    created_at  DATETIME2     NOT NULL CONSTRAINT DF_Audit_created DEFAULT SYSUTCDATETIME()
  );
  CREATE INDEX IX_Audit_tipo_numero ON dbo.InstallationAudit (tipo, numero, secuencia);
  CREATE INDEX IX_Audit_usuario     ON dbo.InstallationAudit (usuario);
  CREATE INDEX IX_Audit_created_at  ON dbo.InstallationAudit (created_at DESC);
END;

IF NOT EXISTS (SELECT 1 FROM sys.tables WHERE name = 'AppSettings')
BEGIN
  CREATE TABLE dbo.AppSettings (
    [key]       NVARCHAR(128) NOT NULL PRIMARY KEY,
    [value]     NVARCHAR(MAX) NULL,
    description NVARCHAR(512) NULL,
    updated_at  DATETIME2     NOT NULL CONSTRAINT DF_Settings_updated DEFAULT SYSUTCDATETIME()
  );
END;
