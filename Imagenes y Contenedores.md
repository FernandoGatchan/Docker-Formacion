
## Imagenes y contenedores

Vamos a ver como usar Docker para crear y ejecutar un contenedor simple utilizando Nginx, que es un servidor web popular. Es perfecto para quienes son nuevos en Docker y quieren entender su funcionalidad básica.

### Actividad 1: Crear contenido estático con Nginx

#### Paso 1: Descargar la Imagen de Nginx

Docker ejecuta contenedores a partir de imágenes, por lo que primero necesitarás descargar la imagen de Nginx de Docker Hub.

```sh
docker image pull nginx
```

#### Paso 2: Ejecutar el Contenedor

Una vez que la imagen esté descargada, puedes correr un contenedor basado en esa imagen.

```sh
docker container run --name mi-nginx -d -p 8080:80 nginx
```

Esta línea de comando tiene varios parámetros, aquí sus significados:

- `--name mi-nginx`: asigna el nombre "mi-nginx" al contenedor.
- `-d`: hace que el contenedor se ejecute en segundo plano (modo "detached").
- `-p 8080:80`: vincula el puerto 8080 en tu máquina local al puerto 80 del contenedor.
- `nginx`: especifica que queremos usar la imagen de nginx.

#### Paso 3: Verificar el Estado del Contenedor

Puedes verificar que el contenedor está ejecutándose utilizando el siguiente comando:

```sh
docker container ls
```

Deberías ver tu contenedor "mi-nginx" en la lista.

#### Paso 4: Acceder al Servidor Nginx

Abre un navegador y accede a la dirección `http://localhost:8080`. Deberías ver la página de bienvenida de Nginx, lo que significa que tu contenedor está ejecutándose y escuchando en el puerto 8080.

---

#### Detener el Contenedor

Cuando hayas terminado, puedes detener el contenedor con:

```sh
docker container stop mi-nginx
```

### Iniciar un Contenedor Detenido

Si has detenido un contenedor y deseas volver a iniciarlo, puedes hacerlo con el comando `start`.

```sh
docker container start mi-nginx
```

### Ver Contenedores Detenidos

Para ver todos los contenedores, incluso los que no están en ejecución, utiliza el siguiente comando:

```sh
docker container ls -a
```

### Eliminar Imágenes de Docker

Los contenedores se crean a partir de imágenes. Si ya no necesitas una imagen, puedes eliminarla. Pero primero, asegúrate de que no haya contenedores utilizando la imagen.

1. **Eliminar todos los contenedores que estén usando la imagen de Nginx**:

    ```sh
    docker container rm mi-nginx
    ```

    Nota: El contenedor debe estar detenido antes de poder eliminarlo.

2. **Eliminar la imagen**:

    Primero, encuentra la imagen de Nginx:

    ```sh
    docker image ls
    ```

    Luego, elimina la imagen usando su ID o nombre:

    ```sh
    docker rmi <image_id / image_name>
    ```

    Por ejemplo:

    ```sh
    docker image rm nginx
    ```

### Trabajar con Tags en las Imágenes

Las etiquetas (tags) son una forma de versionar las imágenes de Docker que estás utilizando.

1. **Descargar una versión específica de una imagen**:

    Puedes descargar una versión específica de Nginx especificando la etiqueta:

    ```sh
    docker image pull nginx:1.19
    ```

    Esto descarga la versión 1.19 de Nginx.

2. **Listar las imágenes con sus etiquetas**:

    Para ver las imágenes disponibles junto con sus etiquetas, utiliza:

    ```sh
    docker image ls
    ```

3. **Retagging de una imagen**:

    Puedes cambiar la etiqueta de una imagen existente utilizando el comando `tag`. Esto puede ser útil para organizar tus imágenes o prepararlas para un envío a un registro remoto.

    ```sh
    docker tag nginx:1.19 mi-nginx:latest
    ```

    Este comando cambia la etiqueta de la versión 1.19 de la imagen de Nginx a "latest" bajo el nombre "mi-nginx".

4. **Eliminar una imagen con una etiqueta específica**:

    Si deseas eliminar una imagen específica basada en su etiqueta, puedes hacerlo de la siguiente manera:

    ```sh
    docker image rm nginx:1.19
    ```

    Esto eliminará la imagen de Nginx que tiene la etiqueta 1.19.


---