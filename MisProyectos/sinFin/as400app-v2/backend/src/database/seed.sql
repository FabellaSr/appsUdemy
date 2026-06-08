-- =====================================================================
-- AS400 Tasks Manager - SQL Server seed (idempotent)
-- =====================================================================

MERGE dbo.Sections AS T
USING (VALUES
  ('installations', 'Instalaciones',   'Gestión de instalaciones AS400', 'Package',   1, 10),
  ('maintenance',   'Mantenimiento',   'Tareas de mantenimiento',        'Wrench',    0, 20),
  ('updates',       'Actualizaciones', 'Updates programados',            'RefreshCw', 0, 30)
) AS S ([id],[title],[description],[icon],[enabled],[sort_order])
ON (T.id = S.id)
WHEN NOT MATCHED THEN
  INSERT (id, title, description, icon, enabled, sort_order)
  VALUES (S.id, S.title, S.description, S.icon, S.enabled, S.sort_order);

MERGE dbo.AppSettings AS T
USING (VALUES
  ('as400.baseUrl',   'http://AS400_HOST:PORT/quomrest', 'Base URL de los web services del AS400'),
  ('as400.timeoutMs', '15000',                           'Timeout en ms para llamadas al AS400'),
  ('app.version',     '1.0.0',                           'Versión de la app')
) AS S ([key],[value],[description])
ON (T.[key] = S.[key])
WHEN NOT MATCHED THEN
  INSERT ([key], [value], description) VALUES (S.[key], S.[value], S.description);
