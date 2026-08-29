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

### transacciones

### ORM

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

comparación pg vs Sequelize