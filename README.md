# Node & Express Web App

Aplicación web desarrollada con **Node.js y Express** como proyecto incremental.

En el **Módulo 7** se incorporó la conexión con una base de datos PostgreSQL, operaciones CRUD, transacciones y Sequelize como ORM.

En el **Módulo 8** se implementó una API RESTful versionada, autenticación mediante JWT, rutas protegidas y subida de archivos.

## Requisitos

* Node.js 18 o superior
* npm
* PostgreSQL

## Instalación

1. **Clonar el repositorio y entrar al directorio:**

```bash id="f89ldh"
git clone https://github.com/estefaniavalenzuelab-dev/node-express-web-app.git
cd node-express-web-app
```

2. **Instalar las dependencias:**

```bash id="n5ebtf"
npm install
```

## Variables de entorno

El proyecto utiliza:

```text id="xftk4r"
.env
.env.example
.gitignore
```

Crear un archivo `.env` a partir de `.env.example` y configurar las credenciales de PostgreSQL.

```env id="4qkqdt"
PORT=3000

NODE_ENV=development

DB_HOST=localhost
DB_PORT=5432
DB_NAME=node_express_app
DB_USER=postgres
DB_PASSWORD=

JWT_SECRET=
JWT_EXPIRES_IN=1h
```

El archivo .env permite mantener las credenciales de PostgreSQL y la configuración de JWT fuera del código y no debe subirse al repositorio.

## Creación de la base de datos

El proyecto utiliza **PostgreSQL** como base de datos relacional.

La conexión se realiza utilizando `pg` y un pool de conexiones.

La configuración se encuentra en:

```text id="j5d2mo"
src/config/database.js
```

Al iniciar correctamente la conexión, la aplicación muestra un mensaje en consola.

### ¿Por qué se utilizó pg?

Se utilizó `pg` porque permite conectar Node.js directamente con PostgreSQL, ejecutar consultas SQL parametrizadas y trabajar con transacciones.

### ¿Cómo se protegen los datos sensibles?

Las credenciales de PostgreSQL se almacenan en variables de entorno mediante el archivo `.env`, evitando escribirlas directamente en el código.

## schema.sql

El archivo:

```text id="bx7a3e"
sql/schema.sql
```

contiene la creación de las tablas utilizadas por el proyecto:

* `usuarios`
* `historial_usuarios`
* `perfiles`
* `pedidos`
* `roles`
* `usuario_roles`

## seed.sql

El archivo:

```text id="24k6ku"
sql/seed.sql
```

contiene datos iniciales para realizar pruebas.

Incluye al menos 3 usuarios:

* Ana Torres
* Carlos Soto
* Daniela Rojas

También contiene datos de perfiles, pedidos, roles y relaciones entre usuarios y roles.

## Ejecución

### Modo normal

```bash id="l7j8rn"
npm start
```

### Modo desarrollo

```bash id="u7pf5m"
npm run dev
```

## Archivo principal

Se utiliza `src/app.js` como punto de entrada porque contiene la configuración inicial y el arranque de la aplicación Express.

## Estructura principal

El proyecto mantiene una arquitectura modular:

```text id="czz1dd"
src/
├── config/
├── controllers/
├── middlewares/
├── models/
├── repositories/
├── routes/
├── services/
├── utils/
└── app.js

sql/
├── schema.sql
└── seed.sql

views/
public/
test/
logs/
```

Esta estructura permite separar las rutas, controladores, servicios, modelos y acceso a datos.

# CRUD

El proyecto implementa operaciones CRUD sobre los datos almacenados en PostgreSQL.

Representa:

* **Create:** INSERT
* **Read:** SELECT
* **Update:** UPDATE
* **Delete:** DELETE

## Create: INSERT

Ejemplo con método `POST`:

```text id="o4hhu6"
POST http://localhost:3000/api/usuarios
```

```json id="hku85a"
{
  "nombre": "Camila Rojas",
  "correo": "camila.rojas@example.com",
  "activo": true
}
```

## Read: SELECT

Obtener todos los usuarios:

```text id="cbkdmb"
GET http://localhost:3000/api/usuarios
```

Obtener un usuario por ID:

```text id="g9b61x"
GET http://localhost:3000/api/usuarios/1
```

El proyecto también permite realizar búsquedas mediante filtros.

Ejemplos:

```text id="i5svwu"
GET /api/usuarios?nombre=Ana
GET /api/usuarios?activo=true
```

## Update: UPDATE

```text id="iht9wu"
PUT http://localhost:3000/api/usuarios/1
```

Se pueden actualizar los campos:

* `nombre`
* `correo`
* `activo`

Solo se modifican los campos enviados en la petición.

### ¿Por qué actualizar solo ciertos campos?

Para evitar modificar información que no fue enviada por el usuario y mantener un mayor control sobre los datos que pueden cambiar.

## Delete: DELETE

```text id="lywgmj"
DELETE http://localhost:3000/api/usuarios/1
```

Antes de realizar operaciones sobre un usuario se valida el ID y también se comprueba si el registro existe.

## Validaciones

El proyecto aplica validaciones para evitar errores en las operaciones.

Entre ellas:

* Validación del ID.
* Validación del nombre.
* Validación del correo.
* Validación del campo `activo`.
* Verificación de existencia del usuario.
* Validación de campos antes de actualizar.
* Consultas parametrizadas para trabajar con PostgreSQL.

# Transacciones

La aplicación utiliza **transacciones PostgreSQL cuando una operación de negocio requiere múltiples modificaciones**.

Ejemplo:

```text id="h2ijwc"
crear usuario
+
crear historial
```

La operación se encuentra disponible mediante:

```text id="5uyvvv"
POST /api/usuarios/registro-completo
```

El proceso funciona de la siguiente manera:

```text id="4swgsu"
BEGIN
↓
Crear usuario
↓
Crear historial
↓
COMMIT
```

Si alguna operación falla:

```text id="p0jzpc"
ROLLBACK
```

Esto permite mantener la consistencia de los datos.

El proyecto también permite forzar un error para comprobar que el usuario no quede registrado cuando se ejecuta el `ROLLBACK`.

Las transacciones fallidas pueden registrarse en:

```text id="s0hscb"
logs/log.txt
```

# ORM

Se utiliza **Sequelize** como ORM.

Su configuración se encuentra en:

```text id="8rl5fc"
src/config/sequelize.js
```

Sequelize permite trabajar con PostgreSQL mediante modelos y métodos de JavaScript.

Ejemplo:

```text id="r9stqx"
GET /api/orm/usuarios
```

Esta ruta permite consultar los usuarios utilizando Sequelize.

## Modelos

El proyecto utiliza Sequelize para representar las entidades:

* **Usuario**
* **Perfil**
* **Pedido**
* **Rol**
* **UsuarioRol**

## Relaciones

El proyecto implementa relaciones **1:1, 1:N y N:M**.

```text id="a3gwpn"
Usuario 1 ─── 1 Perfil
Usuario 1 ─── N Pedido
Usuario N ─── M Rol
```

`UsuarioRol` funciona como tabla intermedia entre usuarios y roles.

## Consulta de relaciones

Ejemplo para obtener un usuario junto con sus pedidos:

```text id="dvltch"
GET /api/orm/usuarios/:id/pedidos
```

Se utiliza `include` de Sequelize para obtener los datos relacionados en una misma consulta.

También se pueden consultar las relaciones del usuario mediante:

```text id="0klqoj"
GET /api/orm/usuarios/:id/relaciones
```

# CRUD con ORM

Además de usuarios, el proyecto implementa operaciones CRUD sobre **pedidos** mediante Sequelize.

```text id="d2pcbc"
GET    /api/orm/pedidos
POST   /api/orm/pedidos
GET    /api/orm/pedidos/:id
PUT    /api/orm/pedidos/:id
DELETE /api/orm/pedidos/:id
```

De esta forma, el proyecto cuenta con operaciones sobre más de una entidad relacionada.

# Comparación pg vs Sequelize

## SQL manual vs ORM

Durante el módulo se implementaron consultas mediante `pg` y posteriormente mediante Sequelize.

`pg` permitió comprender directamente:

* SQL.
* Parámetros.
* Resultados.
* Transacciones.

Sequelize agregó:

* Modelos.
* Métodos CRUD.
* Asociaciones.
* Eager loading mediante `include`.

Ambas alternativas consultan PostgreSQL.

### ¿Qué ventaja tiene utilizar ORM?

Sequelize permite trabajar con modelos y relaciones de una forma más organizada, evitando escribir manualmente todas las consultas SQL y facilitando la consulta de datos relacionados.

# Manejo de errores

La aplicación incluye manejo de errores y validaciones para controlar problemas durante las operaciones con la base de datos.

También utiliza middlewares para mantener esta lógica separada del resto de la aplicación.


# API RESTful – Módulo 8

En el Módulo 8 se implementó una API RESTful versionada para permitir el acceso a los recursos de la aplicación desde clientes externos como Postman.

La versión utilizada es:

```text
/api/v1
```

Las respuestas de la API mantienen una estructura consistente utilizando:

```text
status
message
data
```

## Endpoints de Usuarios

La API permite realizar operaciones CRUD sobre usuarios.

```text
GET    /api/v1/usuarios
GET    /api/v1/usuarios/:id
POST   /api/v1/usuarios
PUT    /api/v1/usuarios/:id
DELETE /api/v1/usuarios/:id
```

Se utilizan métodos GET, POST, PUT y DELETE para consultar, crear, actualizar y eliminar usuarios.

## Endpoints de Pedidos

La API permite realizar operaciones CRUD sobre pedidos.

```text
GET    /api/v1/pedidos
GET    /api/v1/pedidos/:id
POST   /api/v1/pedidos
PUT    /api/v1/pedidos/:id
DELETE /api/v1/pedidos/:id
```
Estas rutas permiten consultar, crear, actualizar y eliminar pedidos.

## HATEOAS y respuestas

Las respuestas de la API utilizan una estructura consistente con:

```text
status
message
data
```

Además, en las respuestas de usuarios se incluyen enlaces relacionados mediante HATEOAS.

Ejemplo:

```json
{
  "links": {
    "self": "/api/v1/usuarios/1",
    "pedidos": "/api/v1/usuarios/1/pedidos"
  }
}
```
# Autenticación JWT

La aplicación utiliza JSON Web Token (JWT) para autenticar usuarios y proteger rutas.

## Registro

```text
POST /api/v1/auth/registro
```
## Login
```text
POST /api/v1/auth/login
```
El login genera un token JWT válido.

## Usuario autenticado

```text
GET /api/v1/auth/me
```
El token contiene información como:

```text
iat
exp
sub
```

Para acceder a las rutas protegidas, el token debe enviarse mediante:

```text
Authorization: Bearer <token>
```

Se realizaron pruebas con token válido, sin token, token inválido y token expirado.


## Rutas protegidas

La aplicación protege rutas que requieren autenticación mediante JWT.

Entre las rutas protegidas se encuentran:

```text
GET /api/v1/pedidos
GET /api/v1/auth/me
```

Si no se envía un token válido, la API rechaza la petición.

El token se envía en el header:

```text
Authorization: Bearer <token>
```
# Subida de archivos

La aplicación utiliza `express-fileupload` para recibir archivos mediante:

```text
multipart/form-data
```

## Subir archivo
```text
POST /api/v1/upload
```
El archivo debe enviarse en el campo:

```text
archivo
```

La aplicación valida:

existencia del archivo
extensión permitida
tamaño máximo de 5 MB

Las extensiones permitidas son:

```text
.jpg
.jpeg
.png
.webp
```
Los archivos se renombran antes de guardarse en:
```text
public/uploads/
```
## Eliminar archivo
```text
DELETE /api/v1/upload/:nombre
```
La aplicación también controla el intento de eliminar un archivo inexistente.

## PLUS – Imagen de Perfil

Se implementó una funcionalidad adicional para asociar una imagen a un perfil.

```text
POST /api/v1/perfiles/:id/imagen
```
La imagen se envía en el campo:
```text
archivo
```
El archivo se guarda en:
```text
public/uploads/
```
y su nombre se almacena en el campo:
```text
Perfil.imagen
```
La implementación del PLUS se organiza en:
```text
src/
├── routes/
│   └── perfiles-v1.routes.js
├── controllers/
│   └── perfil-imagen.controller.js
└── services/
    └── perfil-imagen.service.js
```
Si el perfil ya tenía una imagen, la aplicación gestiona el reemplazo del archivo anterior.

# Decisiones técnicas

## ¿Cómo se separaron rutas y controladores?

Las rutas definen los endpoints y sus middlewares. Los controladores interpretan las peticiones y construyen las respuestas HTTP, mientras los servicios concentran la lógica y el acceso a datos o archivos.

Esta separación mantiene la aplicación modular y evita duplicar lógica.

## ¿Qué validaciones se realizan antes de modificar datos?

La API valida los datos requeridos, tipos y condiciones propias de cada operación antes de guardar los cambios.

Además, Sequelize y PostgreSQL mantienen restricciones adicionales de integridad.

## ¿Por qué se protegieron determinadas rutas?

Se protegieron rutas que requieren autenticación para acceder o modificar datos.

Las rutas de registro y login permanecen públicas porque son necesarias para obtener una identidad autenticada.

## ¿Cómo se envía el token?

El token se envía mediante:

```text
Authorization: Bearer <token>
```

## ¿Dónde se almacena el token?

Durante las pruebas de backend se utilizó Postman para conservar y reutilizar el token.

También se revisaron `localStorage` y `sessionStorage` como mecanismos de almacenamiento disponibles en el navegador.

## ¿Cómo se validan los archivos?

El endpoint comprueba que exista un archivo, valida la extensión y el tamaño máximo permitido, genera un nombre controlado y lo almacena en `public/uploads/`.

# Integración de los módulos

El proyecto fue desarrollado de forma incremental:

```text
Módulo 6
Servidor, rutas, vistas y estructura Express

        ↓

Módulo 7
PostgreSQL, CRUD, transacciones, Sequelize y relaciones

        ↓

Módulo 8
API RESTful, JWT y subida de archivos
```

El resultado final es un backend integrado que reúne los contenidos trabajados durante los módulos 6, 7 y 8.

# Evidencias – Módulo 7

01- Postgresql conectado

<img width="682" height="767" alt="1 PostgreSQL conectado" src="https://github.com/user-attachments/assets/2e17ad7a-d638-4fc6-ab21-7235669c898b" />


02- Tablas esquema

<img width="681" height="725" alt="2 Tablas del esquema" src="https://github.com/user-attachments/assets/66e4ad94-e282-4d0d-ac51-0417bf899f3c" />


03- Get usuarios

<img width="1023" height="696" alt="3 Obtener todos los usuarios" src="https://github.com/user-attachments/assets/87c201ee-3198-4d50-8419-7d7cb838185b" />


04- Post usuario

<img width="506" height="697" alt="4  Creación de usuario POST" src="https://github.com/user-attachments/assets/f0a105ac-8df7-4191-8d24-6e571534f075" />


05- Put usuario

<img width="507" height="697" alt="5 UPDATE api usuarios id" src="https://github.com/user-attachments/assets/3b6bff2d-e875-4a23-8800-a3995bdb0033" />


06- Delete usuario

<img width="509" height="697" alt="6 Delete api usuarios id" src="https://github.com/user-attachments/assets/58d35b6f-b8ed-44f7-8c8e-80a05cd1ac82" />


07- Formulario web

<img width="935" height="646" alt="7 1 Formulario web de usuarios" src="https://github.com/user-attachments/assets/568db3d4-25ae-4be8-b8ec-f3f15ec16ae6" />
<img width="429" height="366" alt="7 2 Formulario web de usuarios" src="https://github.com/user-attachments/assets/76ed8717-4c7b-4b5a-b76f-a5a61db3e4f0" />


08- Transaccion exitosa

<img width="1364" height="709" alt="08-commit-transaccion png" src="https://github.com/user-attachments/assets/b12a1be9-0876-40e9-a753-5b2a8ad2e8bc" />


09- Rollback comprobado

<img width="1324" height="767" alt="9 error forzado ROLLBACK" src="https://github.com/user-attachments/assets/2c9fadf5-dbfe-4270-82ba-9051eff3a965" />
<img width="673" height="185" alt="9b-rollback-comprobado png" src="https://github.com/user-attachments/assets/9d1bded7-8a0e-448c-991a-32f37cd6c7a6" />


10- Modelo usuario sequelize

<img width="619" height="706" alt="10 Modelo Sequelize Usuario" src="https://github.com/user-attachments/assets/a9a4a508-ddd3-448a-85b5-77b1bfc1ea38" />


11- Crud orm

<img width="680" height="692" alt="11  CRUD ORM" src="https://github.com/user-attachments/assets/3d13ac59-2d35-4936-8a0d-db7be1748f05" />


12- Relacion 1:1

<img width="678" height="296" alt="12 Relación 11" src="https://github.com/user-attachments/assets/bbff3d55-0b76-4f5c-8481-caed7fe69a49" />


13- Relacion 1:N

<img width="1365" height="700" alt="13 Relación 1N" src="https://github.com/user-attachments/assets/29cf9e82-88dc-417c-80a4-d9664e330df5" />


14- Relacion N:M

<img width="681" height="767" alt="14  Relación NM" src="https://github.com/user-attachments/assets/17354612-395f-46d7-b0bd-9df7bbfe1f5f" />


15- Tabla usuario roles

<img width="680" height="729" alt="15 Tabla usuario_roles" src="https://github.com/user-attachments/assets/5e6335a4-7290-4ec0-a6b5-c43550c1905d" />


16- Consulta include

<img width="1365" height="699" alt="16-consulta-include" src="https://github.com/user-attachments/assets/97f93cd4-0251-4c6c-b121-99998150408d" />


17- Crud pedido


<img width="681" height="702" alt="17a  post pedido" src="https://github.com/user-attachments/assets/b90a8318-9e7c-4f42-b476-a92289b72c1d" />

   
<img width="679" height="696" alt="17b get pedido" src="https://github.com/user-attachments/assets/490874d3-d160-46f5-842b-4a0622ceb3d3" />


<img width="682" height="691" alt="17c put pedido" src="https://github.com/user-attachments/assets/b30d2020-c0c5-43ed-aeef-c5a436a88c8c" />


<img width="682" height="699" alt="17d delete pedido" src="https://github.com/user-attachments/assets/b2b83410-3450-4c18-9008-109e8ebea6f6" />


18- Manejo error

<img width="676" height="562" alt="18 Manejo de un error" src="https://github.com/user-attachments/assets/6d94482f-fb73-406c-9c8f-743eeb65c237" />


19- Estructura modular

<img width="191" height="500" alt="19 Estructura modular" src="https://github.com/user-attachments/assets/53c8e330-8979-48bb-893b-e459752a5788" />


# Evidencias – Módulo 8

## 01 – GET usuarios

<img width="682" height="701" alt="01 get api" src="https://github.com/user-attachments/assets/d3fc7580-d447-4497-87de-732d5d32e809" />


`GET /api/v1/usuarios`

## 02 – POST usuario

<img width="679" height="698" alt="02  POST API V1" src="https://github.com/user-attachments/assets/6908aacc-1ebb-44fc-a9c4-8da4e9ea1693" />


`POST /api/v1/usuarios`

## 03 – PUT usuario

<img width="682" height="703" alt="03  PUT api v1 usuarios id" src="https://github.com/user-attachments/assets/bfeefee8-fbd6-4a63-9082-f2c3f92dffa1" />


`PUT /api/v1/usuarios/:id`

## 04 – DELETE usuario

<img width="682" height="700" alt="04  DELETE api v1 usuarios id" src="https://github.com/user-attachments/assets/268d02ff-9fa1-4c9e-9fba-ff245ce4e57f" />
`DELETE /api/v1/usuarios/:id`

## 05 – HATEOAS

Respuesta de la API con enlaces relacionados mediante HATEOAS.

## 06 – Registro de usuario

<img width="678" height="767" alt="06 creacion de usuario con clave" src="https://github.com/user-attachments/assets/72557952-7d2c-451c-8988-21c329ca4765" />


`POST /api/v1/auth/registro`

## 07 – Login

<img width="682" height="767" alt="07  Login correcto" src="https://github.com/user-attachments/assets/f7cb1400-97a8-4891-8fc5-8e552e9a9bfd" />


`POST /api/v1/auth/login`

## 08 – JWT válido

<img width="682" height="767" alt="08  JWT válido" src="https://github.com/user-attachments/assets/4f209808-eb3e-4230-bd7f-c5d97957d263" />


Token JWT generado correctamente después del login.

## 08.1 – JWT decodificado

<img width="682" height="767" alt="8 1 jwt decodificado" src="https://github.com/user-attachments/assets/45dc44b6-86c0-46fc-b4a0-1bad4890adbd" />


Verificación de los atributos `iat` y `exp` del token.

## 09 – Ruta protegida sin token

<img width="682" height="767" alt="09  Ruta protegida sin token" src="https://github.com/user-attachments/assets/db1a4f42-fecd-44b2-be45-248b8f98b8e1" />


Petición rechazada al intentar acceder a una ruta protegida sin autenticación.

## 10 – Ruta protegida con token

<img width="682" height="697" alt="10  Ruta con token" src="https://github.com/user-attachments/assets/e3d1c836-0f24-4b6c-a140-a70a36b7957a" />


Acceso correcto a una ruta protegida utilizando `Authorization: Bearer <token>`.

## 11 – Token inválido

Verificación del rechazo de un token inválido.

<img width="682" height="767" alt="11  Token inválido" src="https://github.com/user-attachments/assets/c5e1f398-e4c7-4587-af81-fa47bbca1388" />


## 12 – Token expirado

<img width="680" height="700" alt="12  token expirado" src="https://github.com/user-attachments/assets/112c406a-d9a8-4578-9f76-be1d07db4e37" />


Verificación del rechazo de un token expirado.

## 13 – Upload correcto

<img width="682" height="729" alt="13  upload ok" src="https://github.com/user-attachments/assets/7a783e8a-77cf-4cc5-93da-9ee776bc1fef" />


Archivo válido subido correctamente mediante `multipart/form-data`.

## 14 – Upload sin archivo

<img width="682" height="697" alt="14  upload sin archivo" src="https://github.com/user-attachments/assets/4442e31b-4149-415d-957e-ae8aec0bd26c" />


Respuesta de error al realizar la petición sin enviar un archivo.

## 15 – Extensión no permitida

<img width="679" height="701" alt="15  Extensión no permitida" src="https://github.com/user-attachments/assets/ed07b0ba-07a2-4a76-8a86-cc0fa805be4c" />


Respuesta de error al intentar subir un archivo con una extensión no permitida.

## 16 – Archivo demasiado grande

<img width="683" height="703" alt="16  upload archivo grande" src="https://github.com/user-attachments/assets/017cc4a5-82a8-4fdd-b3cb-dd1c87a82c03" />


Respuesta `413` al intentar subir un archivo mayor al tamaño máximo permitido de 5 MB.

## 17 – Eliminar archivo

<img width="679" height="696" alt="17  Eliminar archivo" src="https://github.com/user-attachments/assets/30dd8971-ab3d-4c75-9093-9a100a442c2e" />


Eliminación correcta de un archivo almacenado.

## 17b – Eliminar archivo inexistente

<img width="678" height="696" alt="17b  Eliminar archivo inexistente" src="https://github.com/user-attachments/assets/f17acabd-017d-4d94-9bf9-30bfc6c4b1c2" />


Respuesta `404` al intentar eliminar un archivo que no existe.

## 18 – Carpeta uploads
<img width="216" height="767" alt="18  Public uploads" src="https://github.com/user-attachments/assets/bb6612fa-84a6-4152-aa33-04a8d1f131a9" />


Comprobación de los archivos almacenados en `public/uploads/`.

## 19 – PLUS: Imagen de Perfil

<img width="683" height="696" alt="PLUS imagen válida" src="https://github.com/user-attachments/assets/f9b5e179-b60d-4c56-83a0-03c096e9f785" />


Subida de una imagen y asociación con un Perfil mediante:

`POST /api/v1/perfiles/:id/imagen`

## 20 – PLUS: Perfil.imagen en PostgreSQL

<img width="979" height="278" alt="20 – PLUS Perfil imagen psql" src="https://github.com/user-attachments/assets/2a24e28d-36ef-45a7-b6c2-84017851e0eb" />


Comprobación en PostgreSQL de que el nombre de la imagen quedó asociado al campo `imagen` del Perfil.

## 21 – PLUS: Imagen guardada
<img width="1365" height="646" alt="21  PLUS imagen guardada" src="https://github.com/user-attachments/assets/8fc78e44-d147-4c4f-956a-b33f0391e995" />


Comprobación de que la imagen asociada al Perfil fue guardada correctamente en `public/uploads/`.

## PLUS – Reemplazo de imagen

<img width="1365" height="650" alt="PLUS reemplazar img" src="https://github.com/user-attachments/assets/a6696995-287e-44f4-9636-72c9d2ad4454" />


Comprobación del reemplazo de una imagen de perfil existente y gestión de la imagen anterior.

## 22 – Estructura modular M8 
<img width="182" height="626" alt="22 estructura modular m8" src="https://github.com/user-attachments/assets/234afd9b-c2b9-47c7-a14c-a20596f81787" />


Comprobación de la estructura modular final del proyecto con carpetas separadas para rutas, controladores, middlewares, modelos, repositorios y servicios.

## 23 – Segunda ruta protegida

<img width="680" height="767" alt="23 segunda ruta protegida" src="https://github.com/user-attachments/assets/83ad8934-d96d-404a-8a0f-aa842b29315d" />


`GET /api/v1/auth/me`

Acceso correcto a la segunda ruta protegida utilizando un token JWT válido.

## 24 – Segunda ruta protegida sin token

<img width="675" height="691" alt="24 auth me sin token" src="https://github.com/user-attachments/assets/70104b52-9715-4aa8-91d8-09ed59341c49" />


`GET /api/v1/auth/me`

Respuesta `401 Unauthorized` al intentar acceder sin token de autenticación.

# Entregables

## Google Drive


[Parte 1 – Módulo 6.zip](https://github.com/user-attachments/files/31853158/Parte.1.Modulo.6.zip)

[Parte 2 – Módulo 7.zip](https://github.com/user-attachments/files/31853162/Parte.2.Modulo.7.zip)

[Parte 3 – Módulo 8.zip](https://github.com/user-attachments/files/31919657/Parte.3.Modulo.8.zip)

