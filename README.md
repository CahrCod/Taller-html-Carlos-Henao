# Taller-html-Carlos-Henao

# Taller-html-Carlos-Henao

# Rick and Morty Mini Web App

Este proyecto es una mini aplicación web interactiva que consume la API pública de Rick and Morty para mostrar información de los personajes. Fue desarrollada como parte de un taller práctico para aplicar conocimientos de HTML, CSS y JavaScript.

## Características

- **Búsqueda de personajes:** Permite buscar personajes por su nombre utilizando la barra de búsqueda y el botón o la tecla Enter.
- **Visualización en cuadrícula:** Muestra un listado de personajes en tarjetas organizadas.
- **Información detallada:** Cada tarjeta muestra la imagen del personaje, nombre, estado (vivo, muerto, desconocido), especie, última ubicación conocida y género.
- **Diseño Responsivo:** La interfaz se adapta a diferentes tamaños de pantalla, desde dispositivos móviles hasta computadoras de escritorio.
- **Manejo de Errores:** Informa amigablemente al usuario cuando no se encuentran resultados o cuando ocurre un error en la conexión.

## Tecnologías Utilizadas

El proyecto está construido siguiendo el principio de separación de responsabilidades, sin utilizar frameworks ni librerías externas.

- **HTML5:** Utilizado exclusivamente para el maquetado semántico (`index.html`).
- **CSS3:** Encargado de todos los estilos, diseño responsivo, variables CSS y animaciones (`styles.css`).
- **JavaScript (ES6+):** Maneja la lógica de la aplicación, peticiones asíncronas (`fetch` y `async/await`) y manipulación modular del DOM (`app.js`).

## Estructura del Código

- `index.html`: Contiene la estructura principal (Header, Input de búsqueda y el contenedor dinámico para la grilla).
- `styles.css`: Contiene todas las reglas de diseño, colores (modo oscuro), layout (Flexbox/Grid) y efectos de UI.
- `app.js`: Contiene la lógica, bien comentada, para inicializar la app, hacer el fetch a la API, manejar errores y crear los elementos HTML correspondientes en el DOM.

## Endpoints de la API utilzados

Este proyecto utiliza los siguientes endpoints de la [Rick and Morty API](https://rickandmortyapi.com/):

- `GET https://rickandmortyapi.com/api/character`: Obtiene la lista inicial de personajes (página 1).
- `GET https://rickandmortyapi.com/api/character/?name={nombre}`: Filtra los personajes buscando coincidencias por nombre.

