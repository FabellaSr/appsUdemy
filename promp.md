Quiero que me generes la base de un sistema web completo, con arquitectura separada por servicios y preparado para ejecutarse con Docker.

Objetivo del sistema:

La plataforma será para operadores de as400 que podran ver informacion del core a partir de apis.

La solución debe tener dos partes bien diferenciadas:

Sitio público:
SOlo mostrar un formulario de login.

Portal privado para operadores:
Cada proveedor debe poder iniciar sesión.

Debe poder editar su perfil.

Debe poder subir fotos de sus trabajos.

Debe poder administrar su galería.

Debe poder ver información relacionada con pagos realizados o pendientes.

Debe poder ver avisos o notificaciones enviados por la empresa.

También debe existir una parte administrativa para la empresa:

Alta, baja lógica y modificación de proveedores.

Gestión de usuarios proveedores.

Gestión de pagos.

Gestión de publicaciones o trabajos.

Gestión de notificaciones o avisos.

Moderación de fotos o contenido si fuera necesario.

Stack obligatorio:

Frontend: React con TypeScript.

Backend: NestJS con Node.js.

Base de datos: Microsoft SQL Server.

Todo debe estar separado por servicios para ejecutarse con Docker.

Arquitectura requerida:

Un contenedor para frontend.

Un contenedor para backend.

Un contenedor para SQL Server.

El proyecto debe estar organizado en carpetas separadas, por ejemplo:

/frontend

/backend

/docker

Debe incluir docker-compose.yml para levantar todo el entorno.

Debe incluir archivos .env.example para frontend y backend.

Debe explicar qué variables de entorno necesita cada servicio.

Requisitos funcionales mínimos:

Autenticación con login.

Roles al menos para:

admin

proveedor

público sin login

CRUD de proveedores.

CRUD de publicaciones o trabajos.

Subida de imágenes.

Registro y consulta de pagos.

Notificaciones o avisos a proveedores.

Relación entre proveedor y sus trabajos.

Relación entre proveedor y pagos.

Modelo de datos inicial sugerido:

usuarios

proveedores

trabajos

fotos_trabajos

pagos

notificaciones

Necesito que generes:

La estructura completa del proyecto.

El código base del frontend.

El código base del backend con NestJS.

La configuración de conexión a SQL Server.

Dockerfiles para frontend y backend.

docker-compose.yml.

Archivos .env.example.

Un README con instrucciones para levantar el sistema.

Datos mock o seed inicial para pruebas.

Buenas prácticas de separación de responsabilidades.

Lineamientos técnicos:

El frontend debe consumir el backend mediante API REST.

El backend debe exponer endpoints bien organizados por módulos.

El backend debe usar variables de entorno para configuración.

La conexión a base de datos debe configurarse por .env.

El proyecto debe quedar listo para desarrollo local con Docker.

Usar nombres claros en inglés para código, entidades, tablas y endpoints.

Preparar el sistema para poder crecer en el futuro.

Además, quiero que tengas en cuenta estas reglas:

Separar claramente frontend, backend y base de datos.

No mezclar lógica de frontend con backend.

No hardcodear credenciales.

Incluir validaciones básicas.

Dejar una base profesional, mantenible y escalable.

Quiero que me entregues:

primero la arquitectura propuesta,

luego la estructura de carpetas,

luego el contenido de cada archivo importante,

y finalmente las instrucciones para ejecutar todo con Docker.

 Generarte el scaffold NestJS + SQL Server + Docker como artefactos descargables (.zip con todo el código, Dockerfiles, compose, README), entendiendo que no corre en Lovable — lo bajás y lo levantás vos en tu máquina con docker compose up. Lovable acá actúa solo como generador de código, no como entorno de ejecución ni preview.