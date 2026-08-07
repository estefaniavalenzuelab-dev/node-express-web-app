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

### Instalación

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
