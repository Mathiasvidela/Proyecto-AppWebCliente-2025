//Formulario


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

//API Airtable
const airTableToken = "pataUae8ipD8y0NgF.95fd129f6bbaf7f974f06334e64f0279ca176d24378c688fd0dd0001dddf1e10";
const baseId = "appPpctPfxobwT5AN";
const tableName = "Products";
const airTableUrl = `https://api.airtable.com/v0/${baseId}/${tableName}`;

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

        console.log('Campos de Airtable:', Object.keys(data.records[0].fields)); // para ver el nombre exacto del campo
        console.log('Distinct categories:', Array.from(new Set(listProducts.map(p => p.category))));
        console.table(listProducts.map(p => ({ name: p.name, category: p.category, len: (p.category||'').length })));

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

function filterByCategory(category) {

    console.log("Filtrando categoría:", category);

    let filtered = listProducts.filter(product => product.category == category);

    console.log("Categoría filtrada:", category);

    return filtered;
}

function filterByStorage(storage) {
    let filtered = listProducts.filter(product => product.storage == storage);
    return filtered;
}

function filterByRam(ram) {
    let filtered = listProducts.filter(product => product.ram == ram);
    return filtered;
}



//------------------------------------------ funcion de destildar filtros




function changeFilter(buttons, button, filteredList) {
  productsContainer.innerHTML = ""; // limpia el contenedor

  if (button.classList.contains("filter-active")) { //si contiene la clase se elimina

    button.classList.remove("filter-active");
    renderProducts(listProducts); //renderiza todos los productos
    
  } else{

    buttons.forEach(button => {
        button.classList.remove("filter-active");
    });

    button.classList.add("filter-active"); //agrega la clase al boton clickeado
    renderProducts(filteredList); //redenderiza los productos filtrados
  }
  
}


//Eventos

//----------------------------------------------- barra de busqueda
searchBar.addEventListener("keyup", (event) => {
    const searchText = event.target.value;
    const filteredProducts = filterProducts(searchText);
    productsContainer.innerHTML = ""; //Limpia el contenedor
    renderProducts(filteredProducts);

    //mensaje de no se encontraron productos
    if (filteredProducts.length === 0) {
        productsContainer.innerHTML = "<p>No se encontraron productos que coincidan con tu búsqueda.</p>";
    }
});


// CATEGORY FILTER
categoryButtons.forEach(button => {
  button.addEventListener("click", () => {

    const category = button.textContent; //toma el valor del boton
   
    const filtered = filterByCategory(category); //filtra los productos con la funcion
    changeFilter(categoryButtons, button, filtered); //pasa los 3 parametros a la funcion
    console.log("Encontrados:", filtered.length);

  });
});


// RAM FILTER
ramButtons.forEach(button => {
    button.addEventListener("click", () => {

        const ram = button.textContent; //toma el valor del boton
        const filteredProducts = filterByRam(ram); //filtra los productos con la funcion
        changeFilter(ramButtons, button, filteredProducts); //pasa los 3 parametros a la funcion

    });
});


// STORAGE FILTER
storageButtons.forEach(button => {
    button.addEventListener("click", () => {

        const storage = button.textContent; //toma el valor del boton
        const filteredProducts = filterByStorage(storage); //filtra los productos con la funcion
        changeFilter(storageButtons, button, filteredProducts); //pasa los 3 parametros a la funcion

    });
});

priceFilter.forEach(button => {
    button.addEventListener("click", () => {
        let sorted;

        if (button.id === "price-high") { //si el id del boton es price-high ordena de mayor a menor

            sorted = [...listProducts].sort((a, b) => b.price - a.price);

        } else{

            sorted = [...listProducts].sort((a, b) => a.price - b.price); //si no de menor a mayor

        }

        changeFilter(priceFilter, button, sorted);


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