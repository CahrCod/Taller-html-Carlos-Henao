/**
 * Constantes y referencias a elementos del DOM
 */
const API_URL = 'https://rickandmortyapi.com/api/character';
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const charactersGrid = document.getElementById('characters-grid');
const statusContainer = document.getElementById('status-container');
const statusMessage = document.getElementById('status-message');

/**
 * Función principal para inicializar la aplicación.
 * Configura los eventos e invoca la primera carga de datos.
 */
function initApp() {
    // Escuchar el click en el botón de búsqueda
    searchBtn.addEventListener('click', handleSearch);

    // Permitir buscar presionando la tecla Enter en el input
    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    });

    // Cargar el listado inicial de personajes al abrir la app
    fetchCharacters();
}

/**
 * Maneja el evento de búsqueda extrayendo el valor del input.
 */
function handleSearch() {
    const searchTerm = searchInput.value.trim();
    fetchCharacters(searchTerm);
}

/**
 * Realiza la petición a la API de Rick and Morty.
 * @param {string} name - Título o nombre del personaje a buscar (opcional).
 */
async function fetchCharacters(name = '') {
    // Preparamos la UI para la carga
    charactersGrid.innerHTML = '';
    showStatus('Cargando personajes...', false);

    try {
        // Construimos la URL dependiendo si hay un término de búsqueda o no
        const url = name ? `${API_URL}/?name=${encodeURIComponent(name)}` : API_URL;
        
        const response = await fetch(url);
        
        // Manejo de errores de red o http
        if (!response.ok) {
            // El API retorna 404 cuando no encuentra coincidencias
            if (response.status === 404) {
                throw new Error(`No se encontraron resultados para "${name}".`);
            }
            throw new Error(`Ocurrió un error en la petición HTTP: ${response.status}`);
        }

        const data = await response.json();
        
        // Verificamos que existan personajes en la respuesta
        if (data.results && data.results.length > 0) {
            hideStatus();
            renderCharacters(data.results);
        } else {
            showStatus('La lista de personajes está vacía.', false);
        }

    } catch (error) {
        console.error('Error al obtener datos de la API:', error);
        showStatus(error.message, true);
    }
}

/**
 * Renderiza el arreglo de personajes en el contenedor principal.
 * @param {Array} characters - Array de objetos con la info de cada personaje devuelto por la API.
 */
function renderCharacters(characters) {
    // Usamos DocumentFragment para añadir elementos al DOM de forma eficiente
    const fragment = document.createDocumentFragment();

    characters.forEach(character => {
        const card = createCharacterCard(character);
        fragment.appendChild(card);
    });

    charactersGrid.appendChild(fragment);
}

/**
 * Construye el elemento HTML (tarjeta) para un personaje.
 * @param {Object} character - Objeto con los datos del personaje.
 * @returns {HTMLElement} Elemento article configurado.
 */
function createCharacterCard(character) {
    const card = document.createElement('article');
    card.className = 'character-card';

    // Determinar la clase CSS adecuada según el estado (Alive, Dead, Unknown)
    const statusClass = `status-${character.status.toLowerCase()}`;

    // Construcción de la tarjeta mediante template strings
    card.innerHTML = `
        <img src="${character.image}" alt="Retrato de ${character.name}" class="character-image" loading="lazy">
        <div class="character-info">
            <h2 class="character-name">${character.name}</h2>
            <div class="character-status">
                <span class="status-icon ${statusClass}" aria-hidden="true"></span>
                <span>${character.status} - ${character.species}</span>
            </div>
            
            <span class="info-label">Última ubicación conocida:</span>
            <span class="info-value">${character.location.name}</span>
            
            <span class="info-label">Género:</span>
            <span class="info-value">${character.gender}</span>
        </div>
    `;

    return card;
}

/**
 * Muestra el contenedor de estados con un mensaje.
 * @param {string} message - Texto principal a mostrar.
 * @param {boolean} isError - Indica si el estilo debe ser de alerta/error.
 */
function showStatus(message, isError = false) {
    statusMessage.textContent = message;
    
    if (isError) {
        statusMessage.classList.add('error-message');
    } else {
        statusMessage.classList.remove('error-message');
    }
    
    statusContainer.classList.remove('hidden');
}

/**
 * Oculta el contenedor de mensajes de estado.
 */
function hideStatus() {
    statusContainer.classList.add('hidden');
    statusMessage.textContent = '';
    statusMessage.classList.remove('error-message');
}

// Inicializamos la aplicación tan pronto el DOM ha finalizado su carga
document.addEventListener('DOMContentLoaded', initApp);
