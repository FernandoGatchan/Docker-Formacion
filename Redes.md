
# Redes en Docker

Vamos a ver como crear una red de tipo bridge en Docker, donde desplegarás dos contenedores: uno con Nginx y otro con una imagen básica de Linux que utilizarás para probar la conectividad de red. El servidor Nginx no será accesible desde el host, solo desde otros contenedores en la misma red.

## Actividad 1 Práctica: Configuración de Redes en Docker con Nginx

### Paso 1: Crear una Red Bridge

1. **Crear una nueva red de tipo bridge**:

    ```sh
    docker network create --driver bridge mi-red-bridge
    ```

    Esto crea una red llamada "mi-red-bridge".

### Paso 2: Desplegar el Contenedor de Nginx

1. **Correr un contenedor de Nginx**:

    ```sh
    docker run --name mi-nginx --network mi-red-bridge -d nginx
    ```

    Esto inicia un contenedor llamado "mi-nginx" usando la imagen de Nginx, adjuntándolo a "mi-red-bridge" y corriendo en segundo plano.

### Paso 3: Desplegar un Contenedor para Pruebas de Red

1. **Iniciar un contenedor con una imagen básica de Linux** (en este caso, usaremos Alpine por su simplicidad):

    ```sh
    docker run --name mi-alpine --network mi-red-bridge -it alpine /bin/sh
    ```

    Esto inicia un contenedor llamado "mi-alpine" en la red "mi-red-bridge" y te proporciona un shell interactivo.

    Si Alpine no tiene las herramientas necesarias preinstaladas, puedes instalarlas con:

    ```sh
    apk update && apk add curl
    ```

### Paso 4: Probar la Conectividad entre Contenedores

1. **Desde el contenedor `mi-alpine`, haremos ping al contenedor de Nginx**:

    Primero, descubre la dirección IP del contenedor de Nginx con:

    ```sh
    docker inspect mi-nginx
    ```

    Copia la dirección IP y luego, desde el shell de `mi-alpine`, ejecuta:

    ```sh
    ping -c 4 <IP_de_mi-nginx>
    ping -c 4 mi-nginx # Si tienes configurado el DNS
    ```

    Esto debería mostrar que `mi-alpine` puede comunicarse con `mi-nginx` a través de la red.

2. **Usar `curl` para obtener el contenido servido por Nginx**:

    Aún desde el shell de `mi-alpine`, ejecuta:

    ```sh
    curl http://<IP_de_mi-nginx>
    ```

    Esto debería devolver el HTML de la página de bienvenida de Nginx.

### Paso 5: Verificación de la Inaccesibilidad desde el Host

1. **Intentar acceder a Nginx desde el navegador de tu máquina local**:

    Intenta acceder a `http://localhost` o `http://<IP_de_mi-nginx>` desde tu navegador.

    No deberías poder acceder al servidor Nginx, ya que no hemos expuesto ningún puerto al host.

### Paso 6: Limpieza

1. **Detener y eliminar los contenedores y la red**:

    Cuando hayas terminado, puedes limpiar ejecutando:

    ```sh
    docker rm -f mi-nginx mi-alpine
    docker network rm mi-red-bridge
    ```

---