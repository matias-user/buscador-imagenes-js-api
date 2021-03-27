import { barraBusqueda, btnConfirmar, contenedorImg } from './selectores.js';

const key = '20499174-2ed7deefb85cbc785ede711c0';

let busqueda = '';
let url ='';
obtenerResultado();
function obtenerResultado(){

    btnConfirmar.addEventListener('click', () => {
        busqueda = barraBusqueda.value;

        console.log(busqueda);
        fetchQl();
    });
};

function fetchQl(){
    url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&image_type=phot&per_page=40`;
    fetch(url)
        .then( respuesta => respuesta.json())
        .then( resultado => recorrerArray(resultado.hits));
};

function recorrerArray( arrays ){
    limpiarHTML();
    arrays.forEach( array => {
        const { largeImageURL,tags, downloads, pageURL } = array;
        console.log(array, );  
        const divContenedor = document.createElement('div');
        divContenedor.innerHTML = `
            <div class="card m-3 p-1" style="width: 20rem" >
            <p class="text-success text-center" >Click en imagen para ver completa.</p>
                <a href="${largeImageURL}" > <img src="${largeImageURL}" class="card-img-top"> </a>
                    <div class="card-body" >
                        <p class="h3 text-success">${tags}</p>
                        <hr>
                        <p class="text-dark h4 ">Descargas: ${downloads}</p>       
                        <p class="text-dark h4">Pagina origen: <a role="button" class="btn btn-outline-success" href="${pageURL}">ir</a></p>       
                    </div>
            </div>
        `;   
        // const imagenes = document.createElement('img');
        // imagenes.classList.add('mt-3')
        // imagenes.src = largeImageURL;

        contenedorImg.appendChild( divContenedor);
        
    });
};

function limpiarHTML(){
    while(contenedorImg.firstChild){
        contenedorImg.removeChild(contenedorImg.firstChild)
    };
};