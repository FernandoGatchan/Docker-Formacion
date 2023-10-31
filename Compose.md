# Guía de Docker Compose para Principiantes

## Introducción

Docker Compose es una herramienta que facilita la definición, construcción y ejecución de aplicaciones multi-contenedor utilizando Docker. Permite configurar todos los componentes de tu aplicación, como servicios, redes y volúmenes, en un solo archivo `docker-compose.yml`, haciendo que la gestión de la aplicación sea más sencilla y clara.

## Actividad: Creando y Desplegando una Aplicación Web con Base de Datos

### Paso 1: Configurar el Entorno de Desarrollo

1. **Instala Docker y Docker Compose** en tu sistema operativo. Puedes descargarlos desde el sitio web oficial de [Docker](https://www.docker.com/products/docker-desktop).

2. **Crea un nuevo directorio para tu proyecto** y accede a él:
    ```bash
    mkdir mi-aplicacion-docker
    cd mi-aplicacion-docker
    ```

### Paso 2: Crear la Aplicación y la Base de Datos

Para este ejemplo, crearemos una aplicación web sencilla con Node.js que se conectará a una base de datos PostgreSQL.

1. **Crea un archivo `server.js`** con el siguiente contenido:
    ```javascript
    const express = require('express');
    const pg = require('pg');
    const app = express();
    const PORT = 3000;

    const pool = new pg.Pool({
      user: 'user',
      host: 'db',
      database: 'mydatabase',
      password: 'password',
      port: 5432,
    });

    app.get('/', async (req, res) => {
      try {
        const result = await pool.query('SELECT NOW()');
        res.send(`¡Hola, Docker! Hora actual en la base de datos: ${result.rows[0].now}`);
      } catch (error) {
        console.error(error);
        res.status(500).send('Ocurrió un error al conectar con la base de datos');
      }
    });

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
    ```

2. **Crea un archivo `package.json`** para gestionar las dependencias:
    ```json
    {
      "name": "mi-aplicacion-docker",
      "version": "1.0.0",
      "main": "server.js",
      "dependencies": {
        "express": "^4.17.1",
        "pg": "^8.5.1"
      }
    }
    ```

### Paso 3: Crear el Dockerfile

Vamos a crear un `Dockerfile` para construir una imagen Docker para nuestra aplicación.

1. **Crea un archivo `Dockerfile`** en el directorio de tu proyecto con el siguiente contenido:
    ```Dockerfile
    FROM node:14

    WORKDIR /usr/src/app

    COPY package*.json ./

    RUN npm install

    COPY . .

    EXPOSE 3000

    CMD [ "node", "server.js" ]
    ```

### Paso 4: Configurar Docker Compose

Ahora, vamos a crear el archivo `docker-compose.yml` para definir los servicios, redes y volúmenes.

1. **Crea un archivo `docker-compose.yml`** en el directorio de tu proyecto con el siguiente contenido:
    ```yaml
    version: '3.8'  # Indica la versión del formato del archivo docker-compose
    
    services:  # Define los servicios que componen tu aplicación
      web:  # Nombre del primer servicio
        build: .  # Construye la imagen del servicio usando el Dockerfile en el directorio actual
        ports:
          - "3000:3000"  # Mapea el puerto 3000 del contenedor al puerto 3000 del host
        depends_on:
          - db  # Establece que el servicio web depende del servicio db
        networks:
          - mynetwork  # Conecta el servicio web a la red personalizada mynetwork

      db:  # Nombre del segundo servicio
        image: postgres:latest  # Utiliza la última imagen de PostgreSQL disponible
        volumes:
          - db-data:/var/lib/postgresql/data  # Monta el volumen db-data en la ruta especificada dentro del contenedor
        environment:
          POSTGRES_DB: mydatabase  # Establece variables de entorno para configurar PostgreSQL
          POSTGRES_USER: user
          POSTGRES_PASSWORD: password
        networks:
          - mynetwork  # Conecta el servicio db a la red personalizada mynetwork

    networks:  # Define las redes personalizadas
      mynetwork:
        driver: bridge  # Utiliza el driver bridge para la red, creando una red privada interna

    volumes:  # Define los volúmenes para almacenar datos persistentes
      db-data:  # Nombre del volumen

    ```

### Paso 5: Construir y Ejecutar la Aplicación

Con todo configurado, ahora puedes construir y ejecutar tu aplicación.

1. **Construye la imagen de Docker**:
    ```bash
    docker-compose build
    ```

2. **Inicia los servicios**:
    ```bash
    docker-compose up
    ```

   Ahora tu aplicación debería estar corriendo en [http://localhost:3000](http://localhost:3000).

### Conclusión

¡Felicidades! Has creado y desplegado una aplicación web que se conecta a una base de datos PostgreSQL utilizando Docker Compose. Has aprendido a definir múltiples servicios, a usar volúmenes para persistir los datos de la base de datos y a conectar los servicios entre sí.

Puedes detener los servicios y limpiar los recursos con el siguiente comando:

```bash
docker-compose down
```

Espero que esta actividad te haya sido útil para comenzar tu viaje con Docker y Docker Compose. ¡Sigue practicando y experimentando!