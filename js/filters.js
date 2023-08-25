// Obtengo las referencias a los elementos del DOM
const filterSelect = document.getElementById("filtro-select"); // Cambia "filter-select" a "filtro-select"
const columnaAudiencia = document.querySelector(".columna-audiencia");
const columnaPublicaciones = document.querySelector(".columna-publicaciones");
const columnaDesempeno = document.querySelector(".columna-desempeño");

// Agrego un evento al selector de filtro
filterSelect.addEventListener("change", updateColumns);

// Función para actualizar las columnas según el filtro seleccionado
function updateColumns() {
  const selectedFilter = filterSelect.value;

  if (selectedFilter === "todos") {
    columnaAudiencia.style.display = "block";
    columnaPublicaciones.style.display = "block";
    columnaDesempeno.style.display = "block";
  } else if (selectedFilter === "audiencia") {
    columnaAudiencia.style.display = "block";
    columnaPublicaciones.style.display = "none";
    columnaDesempeno.style.display = "none";
  } else if (selectedFilter === "publicaciones") {
    columnaAudiencia.style.display = "none";
    columnaPublicaciones.style.display = "block";
    columnaDesempeno.style.display = "none";
  } else if (selectedFilter === "desempeno") {
    columnaAudiencia.style.display = "none";
    columnaPublicaciones.style.display = "none";
    columnaDesempeno.style.display = "block";
  }
}



