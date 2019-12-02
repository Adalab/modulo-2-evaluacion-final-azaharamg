# Buscador de series

Es una aplicación web para la búsqueda de series de televisión. Permite al usuario añadir y eliminar las series como favoritas. Además, las series favoritas quedan guardadas en el localStorage, para que al cargar la web no se pierdan las preferencias del usuario.

## Guía de inicio rápido

Necesitarás instalar [Node.js](https://nodejs.org/) y [Gulp](https://gulpjs.com) para trabajar con este Starter Kit, luego:

1. Descarga o clona el repositorio
2. Instala las dependencias locales con `npm install`
3. Arranca el kit con `gulp`

## Tareas de gulp incluidas

### Inicio de un web server para desarrollo

```
npm start
```

o lo que en este proyecto es lo mismo:

```
gulp
```

Lanza un webserver con BrowserSync y varios watchers estarán pendientes de los archivos SCSS/JS/HTML, en la carpeta **public/**, para recargar el navegador cuando se necesite.

### Versión lista para subir a producción

Para generar los ficheros para producción ejecuta:

```
npm run docs
```

o lo que en este proyecto es lo mismo:

```
gulp docs
```

En la carpeta **docs/** se generarán los CSS y JS minimizados y sin sourcemaps listos para subir al repo. A continuación súbelos al repo y activa en GitHub Pages la opción **master/docs/**, para que GitHub Pages sirva la página desde la carpeta **docs/**.
