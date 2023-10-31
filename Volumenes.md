# Guía sobre Volumenes en Docker

Docker es una plataforma increíblemente poderosa que permite a los desarrolladores empaquetar aplicaciones en contenedores, que luego pueden ejecutarse en cualquier máquina que tenga Docker instalado. Uno de los aspectos más importantes de Docker es la gestión de datos. En esta guía, vamos a explorar cómo funcionan los volúmenes en Docker y cómo puedes usarlos para persistir los datos generados por y utilizados por tus contenedores Docker.

## Paso 1: Instalación de Docker

Antes de comenzar, asegúrate de tener Docker instalado en tu máquina. Puedes descargarlo e instalarlo desde el [sitio oficial de Docker](https://docs.docker.com/get-docker/).

## Paso 2: Crear un Volumen en Docker

Docker permite crear volúmenes, que son áreas de almacenamiento persistente que pueden ser montadas en los contenedores. Para crear un volumen, utiliza el siguiente comando:

```bash
docker volume create mi_volumen
```

Este comando creará un volumen llamado `mi_volumen`. Puedes verificar que el volumen se haya creado correctamente con:

```bash
docker volume ls
```

## Paso 3: Montar el Volumen en un Contenedor

Ahora que tienes un volumen, puedes montarlo en un contenedor. Vamos a correr un contenedor de Nginx y montar el volumen que acabamos de crear:

```bash
docker run -d -p 8080:80 --name mi_nginx --mount source=mi_volumen,target=/usr/share/nginx/html nginx
```

Este comando hace lo siguiente:

- `-d`: Corre el contenedor en background.
- `-p 8080:80`: Mapea el puerto 80 del contenedor al puerto 8080 de tu máquina local.
- `--name mi_nginx`: Asigna el nombre `mi_nginx` al contenedor.
- `--mount source=mi_volumen,target=/usr/share/nginx/html`: Monta el volumen `mi_volumen` en la ruta `/usr/share/nginx/html` dentro del contenedor.
- `nginx`: Especifica la imagen de Docker a utilizar (en este caso, Nginx).

## Paso 4: Verificar el Montaje del Volumen

Para verificar que el volumen está montado correctamente, puedes ejecutar:

```bash
docker exec mi_nginx ls /usr/share/nginx/html
```

Esto debería mostrarte los archivos dentro de `/usr/share/nginx/html` en el contenedor, que debería estar vacío al principio.

## Paso 5: Agregar Datos al Volumen

Ahora, vamos a agregar un archivo al volumen para ver cómo persiste la información. Puedes hacer esto copiando un archivo desde tu máquina al volumen:

```bash
echo "Hola Docker" > index.html
docker cp index.html mi_nginx:/usr/share/nginx/html/index.html
```

## Paso 6: Acceder a los Datos

Ahora, si accedes a [http://localhost:8080](http://localhost:8080) en tu navegador, deberías ver la página con el texto "Hola Docker".

## Paso 7: Limpiar

Una vez que hayas terminado, puedes detener y eliminar el contenedor con:

```bash
docker stop mi_nginx
docker rm mi_nginx
```

Y puedes eliminar el volumen con:

```bash
docker volume rm mi_volumen
```

# Conexión de un Directorio Local de Windows a Docker

La funcionalidad de volúmenes en Docker no solo se limita a los volúmenes gestionados por Docker. También puedes montar directorios de tu sistema de archivos local dentro de un contenedor. Esto es particularmente útil durante el desarrollo, ya que permite reflejar los cambios realizados en tu código fuente inmediatamente en el contenedor que está ejecutando tu aplicación.

## Paso 8: Crear un Directorio Local y Archivo HTML

1. En tu máquina local, crea un nuevo directorio para tu proyecto:

   ```powershell
   mkdir mi_sitio_web
   cd mi_sitio_web
   ```

2. Dentro de ese directorio, crea un archivo HTML:

   ```powershell
   echo '<h1>Hola Docker desde Windows</h1>' > index.html
   ```

## Paso 9: Montar el Directorio Local en el Contenedor Docker

A continuación, montaremos el directorio que acabamos de crear en el contenedor de Nginx. Asegúrate de que estás en el directorio `mi_sitio_web` y ejecuta:

```powershell
docker run -d -p 8080:80 --name mi_nginx -v ${PWD}:/usr/share/nginx/html nginx
```

En este comando:

- `-v ${PWD}:/usr/share/nginx/html`: Monta el directorio actual (`${PWD}`) en la ruta `/usr/share/nginx/html` dentro del contenedor.

## Paso 10: Verificar y Editar el Archivo

1. Abre tu navegador y ve a [http://localhost:8080](http://localhost:8080). Deberías ver el mensaje "Hola Docker desde Windows".

2. Ahora, abre el archivo `index.html` en tu editor de texto favorito y haz algunos cambios. Por ejemplo, puedes cambiar el contenido a:

   ```html
   <h1>Hola Docker, ¡he hecho cambios!</h1>
   ```

3. Guarda el archivo y actualiza la página en tu navegador. Deberías ver los cambios reflejados inmediatamente.

## Conclusión

Conectar un directorio local de tu máquina Windows a un contenedor Docker es una forma excelente de agilizar el desarrollo y las pruebas, permitiéndote ver los cambios en tiempo real sin necesidad de reconstruir o reiniciar tus contenedores. Esto no solo te ahorra tiempo, sino que también hace que el proceso de desarrollo sea mucho más fluido.

Esta capacidad de montar directorios locales es una de las características que hace de Docker una herramienta tan poderosa y flexible para desarrolladores y equipos de operaciones por igual. ¡Explora esta funcionalidad y descubre cómo puede mejorar tu flujo de trabajo!