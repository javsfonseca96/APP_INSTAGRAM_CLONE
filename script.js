const LIMITE = 9;
let paginaActual = 1;

const grid=document.getElementById("grid");
const btnAnterior = document.getElementById("anterior");
const btnSiguiente = document.getElementById("siguiente");
const  textopagina = document.getElementById("pagina");

//Esto es para Guardar referencias a los elementos del HTML una sola vez, para no buscarlos repetidamente.

async function obtenerFotos(pagina) {
    const url = `https://picsum.photos/v2/list?page=${pagina}&limit=${LIMITE}`;
     try {
        const respuesta = await fetch(url);
        if(!respuesta.ok) throw new Error("Error " + respuesta.status);
        return await respuesta.json(); // arreglo de fotos
     } catch (error) {
        console.error(error);
        return [];
     }
}


function pintarFotos(fotos) {
grid.innerHTML = ""; // Limpiar el grid antes de pintar nuevas fotos

fotos.forEach(foto => {
    const img = document.createElement("img");
    img.src=`https://picsum.photos/id/${foto.id}/400/400`;
    img.alt = "Foto de " + foto.author;
    img.loading = "lazy"; // Carga diferida para mejorar el rendimiento 
    grid.appendChild(img);
});
}

async function cargarPagina(pagina) {
    const fotos = await obtenerFotos(paginaActual);
    pintarFotos(fotos);
    textopagina.textContent = "Pagina" + paginaActual;
    btnAnterior.disabled = paginaActual === 1;
    btnSiguiente.disabled= fotos.length < LIMITE
    // Deshabilitar botón anterior si estamos en la primera página

}

btnSiguiente.addEventListener("click",()=>{
    paginaActual++;
    cargarPagina();
});

btnAnterior.addEventListener(click,()=>{
    if (paginaActual > 1) {
        paginaActual--;
        cargarPagina();
    }
})

cargarPagina(paginaActual); // Cargar la primera página al iniciar
