# Node & Express Web App

Aplicación web desarrollada con **Node.js y Express** como proyecto incremental.

En el **Módulo 7** se incorporó la conexión con una base de datos PostgreSQL, operaciones CRUD, transacciones y Sequelize como ORM.

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
```

El archivo `.env` permite mantener las credenciales de la base de datos fuera del código y no debe subirse al repositorio.

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

# Evidencias recomendadas

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


# Entregables

## Google Drive

[Parte 2 – Módulo 7.zip](https://github.com/user-attachments/files/31853162/Parte.2.Modulo.7.zip)
[Parte 1 – Módulo 6.zip](https://github.com/user-attachments/files/31853158/Parte.1.Modulo.6.zip)
