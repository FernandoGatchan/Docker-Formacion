# Guía de Dockerfile para Principiantes

## Introducción

Docker es una plataforma que permite desarrollar, desplegar y ejecutar aplicaciones en contenedores. Un contenedor es un entorno ligero y autónomo que incluye todo lo necesario para ejecutar una aplicación, lo cual asegura que funcione igual en todos los entornos.

Un `Dockerfile` es un script de configuración que contiene una serie de instrucciones para construir una imagen de Docker. Una imagen de Docker es una plantilla que contiene un sistema operativo, código, librerías y otros componentes necesarios para ejecutar una aplicación.

En esta guía, aprenderás a crear un `Dockerfile` paso a paso, creando una aplicación de ejemplo.

## Actividad: Creando una Aplicación Web con Docker

### Paso 1: Configurar el Entorno de Desarrollo

1. Instala Docker en tu sistema operativo: [Get Docker](https://docs.docker.com/get-docker/).
2. Crea un nuevo directorio para tu proyecto y accede a él:
    ```bash
    mkdir mi-aplicacion
    cd mi-aplicacion
    ```

### Paso 2: Crear la Aplicación

Para este ejemplo, crearemos una aplicación web simple con Node.js.

1. Crea un archivo `server.js` con el siguiente contenido:
    ```javascript
    const express = require('express');
    const app = express();
    const PORT = 3000;

    app.get('/', (req, res) => {
      res.send('¡Hola, Docker!');
    });

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
    ```

2. Crea un archivo `package.json` para gestionar las dependencias:
    ```json
    {
      "name": "mi-aplicacion",
      "version": "1.0.0",
      "description": "Una aplicación web simple con Docker",
      "main": "server.js",
      "scripts": {
        "start": "node server.js"
      },
      "dependencies": {
        "express": "^4.17.1"
      }
    }
    ```

### Paso 3: Crear el Dockerfile

Ahora, vamos a crear el `Dockerfile` que describe cómo se construirá la imagen de Docker para nuestra aplicación.

1. Crea un archivo llamado `Dockerfile` (sin extensión) en el directorio de tu proyecto.
2. Añade las siguientes instrucciones al `Dockerfile`:

    ```Dockerfile
    # Utilizar una imagen base de Node.js
    FROM node:14

    # Crear el directorio de la aplicación en el contenedor
    WORKDIR /usr/src/app

    # Copiar los archivos de dependencias
    COPY package*.json ./

    # Instalar las dependencias
    RUN npm install

    # Copiar el resto de los archivos de la aplicación
    COPY . .

    # Exponer el puerto que la aplicación utilizará
    EXPOSE 3000

    # Definir el comando para ejecutar la aplicación
    CMD [ "node", "server.js" ]
    ```

### Paso 4: Construir y Ejecutar la Imagen de Docker

Ahora que tenemos nuestro `Dockerfile`, podemos construir la imagen y ejecutarla en un contenedor.

1. Construye la imagen de Docker:
    ```bash
    docker build -t mi-aplicacion .
    ```

2. Una vez construida la imagen, ejecuta la aplicación en un contenedor:
    ```bash
    docker run -p 3000:3000 -d mi-aplicacion
    ```

3. Abre tu navegador y visita `http://localhost:3000`. Deberías ver el mensaje "¡Hola, Docker!".

### Conclusión

¡Felicidades! Has creado y desplegado tu primera aplicación con Docker. Este es sólo el principio. Docker tiene muchas más funcionalidades y opciones para explorar. Puedes comenzar a experimentar con diferentes imágenes base, variables de entorno, volúmenes, y más.

Espero que esta guía te haya sido útil para comenzar tu viaje con Docker. ¡Buena suerte y sigue experimentando!