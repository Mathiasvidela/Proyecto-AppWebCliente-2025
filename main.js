//Formulario
import { airTableToken,baseId,tableName} from "./envs.js";


let form = document.querySelector("form");
let modal = document.querySelector("#modal");
let modalText = document.querySelector("#modalText");


function capturar(event){

    event.preventDefault();

    
    let nombreForm = document.querySelector("#name").value.trim();
    let emailForm = document.querySelector("#email").value.trim();
    

    
    modalText.innerHTML=(`<p>Gracias por ponerte en contacto con nostros <span class="font-bold">${nombreForm}</span> 
        pronto nos pondremos en contacto con usted a su mail <span class="font-bold">${emailForm}</span></p>`);
    mostrarModal();
    
    
}

function mostrarModal(){
    modal.classList.remove("hidden");
    modal.classList.add("flex");
}

function cerrarModal(){
    form.reset();
    modal.classList.remove("flex");
    modal.classList.add("hidden");
    
}




//----------------------------------------------------------------------- productos home -------------------------------------------



let listProducts = []; //array vacio para llenar con los productos de Airtable

const airTableUrl = `https://api.airtable.com/v0/${baseId}/${tableName}`;
export const airTableToken = airTableToken;
export const baseId = baseId;
export const tableName = tableName;



async function fetchProductsFromAirtable() {

    try {
        const response = await fetch(airTableUrl, {

            headers: {
                'Authorization': `Bearer ${airTableToken}`,
                'Content-Type': 'application/json'
            }

        });

        const data = await response.json();
        console.log(data);

        const mapProducts = data.records.map(product => ({
            name: product.fields.name,
            description: product.fields.description,
            price: product.fields.price,
            img: product.fields.img,
            category: product.fields.category,
            ram: product.fields.ram,
            storage: product.fields.storage
        }));
        listProducts = mapProducts;

        renderProducts(mapProducts);


    }

    catch (error) {
        console.error('Error fetching products:', error);
    }

};

//inicilizacion de la pagina con productos de Airtable
fetchProductsFromAirtable();




//Dom Elements
let productsContainer = document.querySelector("#productsContainer"); //este es el div donde van todos los productos
const searchBar = document.querySelector("#searchBar");
    //botones de filtro
const categoryButtons = document.querySelectorAll(".category-filter");
const storageButtons = document.querySelectorAll(".storage-filter");
const ramButtons = document.querySelectorAll(".ram-filter");
const priceFilter = document.querySelectorAll(".price-filter");




//funcion que crea los elementos del producto
function createProductCard(product){ // Estructura de la card

    //contenedor principal article
    const article = document.createElement("article");
    article.classList.add("products-card"); //clase css

    //Imagen
    const divImg = document.createElement("div");
    const img = document.createElement("img");
    img.classList.add("products-card-img"); //clase css
    img.src = product.img;
    img.alt = product.name;
    divImg.appendChild(img);

    //titulo y descripcion
    const divTitle = document.createElement("div");
    divTitle.classList.add("products-card-title"); //clase css

    const h3 = document.createElement("h3");
    h3.textContent = product.name;

    const pDesc = document.createElement("p");
    pDesc.textContent = product.description;

    divTitle.appendChild(h3);
    divTitle.appendChild(pDesc);

    //precio y botón
    const divFooter = document.createElement("div");
    divFooter.classList.add("products-card-footer"); //clase css

    const pPrice = document.createElement("p");
    pPrice.classList.add("products-card-precio"); //clase css
    pPrice.textContent = `$${product.price}`;

    const aBtn = document.createElement("a");
    aBtn.href = "./pages/detalleProducto.html";
    aBtn.classList.add("btn-fill"); //clase css
    aBtn.innerHTML = `Comprar <i class="fa-solid fa-cart-shopping"></i>`;

    divFooter.appendChild(pPrice);
    divFooter.appendChild(aBtn);

    // Agregar al artículo
    article.appendChild(divImg);
    article.appendChild(divTitle);
    article.appendChild(divFooter);

    // Devolver el artículo
    return article;

}

function renderProducts(products) {
    productsContainer.innerHTML = ""; //Limpia el contenedor
    products.forEach(product => {
        const productCard = createProductCard(product);
        productsContainer.appendChild(productCard);
    });
}


function filterProducts(text) {
    let filtered = listProducts.filter(product => product.name.toLowerCase().includes(text.toLowerCase()));
    return filtered;
}



//----------------------------------------funciones de busqueda por filtros


//estado inicial de los filtros
let filterState = {
    searchBar: "",
    category: null,
    storage: null,
    ram: null,
    sorting: null
};




function applyFilters() {
    
    //search bar

    let dataFilters = [...listProducts]; // copia del array original

    //filtra barra de busqueda
    if (filterState.searchBar) {
        let text = filterState.searchBar;
        dataFilters = dataFilters.filter(product => product.name.toLowerCase().includes( text.toLowerCase() )  ); 
    }

    // filtra categoria
    if (filterState.category) {
        let category = filterState.category;
        dataFilters = dataFilters.filter(product => product.category === category);
    }

    // filtra almacenamiento
    if (filterState.storage) {
        let storage = filterState.storage;
        dataFilters = dataFilters.filter(product => product.storage === storage);
   }

   // filtra ram
   if (filterState.ram) {
        let ram = filterState.ram;
        dataFilters = dataFilters.filter(product => product.ram === ram);
   }

   //precio mayor menor o menor mayor
   if (filterState.sorting == "price-high") {
        dataFilters = dataFilters.sort((a, b) => b.price - a.price);
   } else {
        dataFilters = dataFilters.sort((a, b) => a.price - b.price);
   }




   // si no hay productos que coincidan con los filtros muestra mensaje sino renderiza los productos filtrados
   if (dataFilters.length === 0) {
        productsContainer.innerHTML = "<p>No se encontraron productos que coincidan con los filtros seleccionados.</p>";
   } else {
        productsContainer.innerHTML = ""; // limpia el contenedor
        renderProducts(dataFilters);
   }



}

// limpia los filtros y vuelve a renderizar todos los productos, funcion con onclick() en el boton
function clearFilters() {

    filterState = {
        searchBar: "",
        category: null,
        storage: null,
        ram: null,
        sorting: null
    };

    productsContainer.innerHTML = ""; // limpia el contenedor
    renderProducts(listProducts); //renderiza todos los productos

    //quitar las clases activas de los botones
    categoryButtons.forEach(button => {
        button.classList.remove("filter-active");
    });

    storageButtons.forEach(button => {
        button.classList.remove("filter-active");
    });

    ramButtons.forEach(button => {
        button.classList.remove("filter-active");
    });

    priceFilter.forEach(button => {
        button.classList.remove("filter-active");
    });
    
}

//------------------------------------------ funcion de destildar filtros

function changeFilter(buttons, button) { //esta funcion solo maneja las clases para la UI

  if (button.classList.contains("filter-active")) { //si contiene la clase se elimina

    button.classList.remove("filter-active");
  }

  else{
    buttons.forEach(button => {
        button.classList.remove("filter-active");
    });

    button.classList.add("filter-active"); //agrega la clase al boton clickeado
  }

}


//Eventos

//----------------------------------------------- barra de busqueda
searchBar.addEventListener("keyup", (event) => {
    const searchText = event.target.value;
    filterState.searchBar = searchText; //se asigna el valor de la busqueda al estado
    applyFilters();
    
});


// CATEGORY FILTER
categoryButtons.forEach(button => {
  button.addEventListener("click", () => {

    const category = button.textContent; //toma el valor del boton

    const active = button.classList.contains("filter-active");
    changeFilter(categoryButtons, button); //funcion para manejar las clases de la UI

    filterState.category = active ? null : category; //asigna en valor del filtro a la variable global

    applyFilters();

  });
});


// RAM FILTER
ramButtons.forEach(button => {
    button.addEventListener("click", () => {

        const ram = button.textContent; //toma el valor del boton

        const active = button.classList.contains("filter-active");
        changeFilter(ramButtons, button); // color obotn

        filterState.ram = active ? null : ram; //asigna en valor del filtro a la variable global

        applyFilters();
        

    });
});


// STORAGE FILTER
storageButtons.forEach(button => {
    button.addEventListener("click", () => {

        const storage = button.textContent; //toma el valor del boton

        const active = button.classList.contains("filter-active");
        changeFilter(storageButtons, button); //color del boton

        filterState.storage = active ? null : storage; //asigna en valor del filtro a la variable global

        applyFilters();

    });
});


// PRICE FILTER

priceFilter.forEach(button => {
    button.addEventListener("click", () => {

        const active = button.classList.contains("filter-active");

        changeFilter(priceFilter, button); //color del boton

        filterState.sorting = active ? null : button.id;
        
        applyFilters();


    });


});










//Editar un producto en Airtable

async function editProductInAirtable(productId) {
    try{

        const response = await fetch(`${airTableUrl}/${productId}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${airTableToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fields: {
                    Name: product.name,
                    Description: product.description,
                    Price: product.price,
                    Category: product.category,
                    Ram: product.ram,
                    Storage: product.storage
                }
            })
        });
        const data = await response.json();
        console.log(data);

    } catch (error) {
        console.error('Error editing product:', error);
    }
}

// ej como editar con la funcion para usar en una page
/*
editProductInAirtable(){
    name: "Zhen phone X pro",
    description: "Máxima potencia y diseño.",
    price: 156,
    category: "celulares",
    ram: "8GB",
    storage: "256GB"
}
    */