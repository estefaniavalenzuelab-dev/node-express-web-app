```text
README.md
```

Contenido inicial:

```markdown
## Node & Express Web App

Aplicación web desarrollada con Node.js y Express como proyecto incremental.

### Requisitos

- Node.js 18 o superior
- npm
- PostgreSQL

### Instalación

1. **Clonar el repositorio y entrar al directorio:**
   ```bash
   git clone URL_DEL_REPOSITORIO
   cd node-express-web-app
   ```

2. **Instalar las dependencias:**
   ```bash
   npm install
   ```


### variables de entorno

.env
.env.example
.gitignore

### creación de base



### schema.sql


### seed.sql


```bash
git clone URL_DEL_REPOSITORIO
cd node-express-web-app
npm install
```

### Ejecución

#### Modo normal

```bash
npm start
```

#### Modo desarrollo

```bash
npm run dev
```

### Variables de entorno

Crear un archivo `.env` a partir de `.env.example`:

```env
PORT=3000
```

### Archivo principal

Se utiliza `src/app.js` como punto de entrada porque contiene la configuración
inicial y el arranque de la aplicación Express.
```

### rutas

### CRUD

Rrepresenta:

#### Create: INSERT

ej metodo POST:
http://localhost:3000/api/usuarios

{
  "nombre": "Camila Rojas",
  "correo": "camila.rojas@example.com",
  "activo": true
}

#### Read: SELECT


#### Update: UPDATE
#### Delete: DELETE

### transacciones

La aplicación utiliza transacciones PostgreSQL cuando una operación de negocio requiere múltiples modificaciones.

Ejemplo:

```text
crear usuario
+
crear historial

### ORM

Ejemplo:

```text
GET /api/orm/usuarios/:id/pedidos

### Modelos

El proyecto utiliza Sequelize para representar las entidades:

- **Usuario**
- **Perfil**
- **Pedido**
- **Rol**
- **UsuarioRol**

#### Relaciones

```text
Usuario 1 ─── 1 Perfil
Usuario 1 ─── N Pedido
Usuario N ─── M Rol

## Comparación pg vs Sequelize

```markdown
### SQL manual vs ORM

Durante el módulo se implementaron consultas mediante `pg` y posteriormente mediante Sequelize.

`pg` permitió comprender directamente:

- SQL.
- Parámetros.
- Resultados.
- Transacciones.

Sequelize agregó:

- Modelos.
- Métodos CRUD.
- Asociaciones.
- Eager loading mediante `include`.

Ambas alternativas consultan PostgreSQL.

## 105. Evidencias recomendadas

Guarda capturas de:

1. Tabla `historial_usuarios`.
2. `BEGIN` manual.
3. `ROLLBACK` manual.
4. `COMMIT` manual.
5. Transacción exitosa desde Postman.
6. Usuario creado.
7. Historial creado.
8. Petición con error forzado.
9. Respuesta de error.
10. Consulta que demuestra que el usuario no existe después del rollback.
11. Log de transacción fallida.
12. Código donde se observa `client.release()`.

La consigna solicita expresamente evidencia de rollback cuando se fuerza un error.

---

## 106. Justificaciones técnicas esperadas

El estudiante debería poder responder:

### ¿Por qué se utilizó una transacción?

Porque la operación contiene varias modificaciones que deben comportarse como una unidad.

### ¿Por qué se utiliza una sola conexión?

Porque el estado de la transacción pertenece a una conexión PostgreSQL concreta.

### ¿Por qué no utilizar `pool.query()` para cada paso?

Porque cada llamada puede utilizar una conexión distinta y las operaciones dejarían de pertenecer a la misma transacción.

### ¿Por qué se ejecuta rollback?

Para deshacer las modificaciones realizadas dentro de la transacción cuando una operación falla.

### ¿Por qué se libera el cliente?

Para devolver la conexión al pool y permitir que otras operaciones la reutilicen.

---

## 107. Commits sugeridos

```text
feat: agregar historial de usuarios
feat: implementar transaccion de registro
feat: registrar transacciones fallidas
docs: documentar transacciones postgres