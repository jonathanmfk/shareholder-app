# De que trata el proyecto?

El proyecto trata sobre una web app, que pinta un listado tanto de accionistas como empresas accionista, se puede visualizar desde la app los datos de si composición accionaria.

La información que permite visualizar es la siguiente:

- Nombre
- Tipo de documento
- Documento
- Porcentaje de participación

Dentro de app tambien se puede ver el detalle de un accionista e incluye opción para pregunta PEP (Persona Políticamente Expuesta), en la ayuda de la pregunta PEP está una opción donde muestra un mensaje de informando que el proceso de actualización se debe realizar desde una oficina y no desde al app.

# Comandos de la app


## CELLS (**cells-cli**)

**cells-cli** es la herramienta de línea de comandos que le proporciona tareas y comandos comunes para trabajar en un proyecto Cells.

### Instalación

Para instalar Cells ejecute el comando:

~~~sh
npm -g install @cells/cells-cli
~~~

Una vez instalado, el comando `cells` estará disponible para usar.
## Instalación de dependencias

* Para instalar las dependecias utiliza el siguente comando corto

~~~
$ npm i
~~~
## Ejecutar la App

* Para iniciar la app tiene que utilizar el atajo corto de npm

~~~
$ npm start
~~~
* O en su defecto utilizar el comando propio de Cells.
~~~
$ cells app:serve -c dev.js
~~~
