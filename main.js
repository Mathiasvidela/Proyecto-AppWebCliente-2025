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


//Productos
const ListProducts = [

  // ======== Phones ========
  {name: "Zhen phone X pro", description: "Máxima potencia y diseño.", price: 156, img: "./images/phone xpro.png", category: "celulares", ram: "8GB", storage: "256GB"},
  {name: "Zhen phone X", description: "Rendimiento y estilo.", price: 156, img: "./images/zhenphonex.png", category: "celulares", ram: "12GB", storage: "128GB"},
  {name: "Zhen phone SE", description: "Tecnología esencial.", price: 156, img: "./images/zhenphoneSE.png", category: "celulares", ram: "4GB", storage: "64GB"},
  {name: "Zhen phone Y", description: "Confiable y accesible.", price: 156, img: "./images/zhenphone Y.png", category: "celulares", ram: "4GB", storage: "64GB"},

  // ======== Headphones ========
  {name: "ZhenHeadphones Pro Max", description: "Sonido premium.", price: 156, img: "./images/ZhenHeadphones Pro Max.png", category: "headphones", ram: null, storage: null},
  {name: "ZhenHeadphones Elite", description: "Comodidad superior.", price: 156, img: "./images/ZhenHeadphones Elite.png", category: "headphones", ram: null, storage: null},
  {name: "ZhenHeadphones Studio", description: "Audio profesional.", price: 156, img: "./images/ZhenHeadphones Studio.png", category: "headphones", ram: null, storage: null},
  {name: "ZhenHeadphones Play", description: "Diversión sonora.", price: 156, img: "./images/ZhenHeadphones Play.png", category: "headphones", ram: null, storage: null},
  {name: "ZhenHeadphones Go", description: "Ligeros y prácticos.", price: 156, img: "./images/ZhenHeadphones Go.png", category: "headphones", ram: null, storage: null},

  // ======== Smartwatches ========
  {name: "Zhen Watch Pro", description: "Elegante y potente.", price: 1750, img: "./images/zhen watch pro.png", category: "smart watch", ram: "4GB", storage: "32GB"},
  {name: "Zhen Watch Active", description: "Deportividad y estilo.", price: 1400, img: "./images/zhen watch active.png", category: "smart watch", ram: "32GB", storage: "16GB"},
  {name: "Zhen Watch Fit", description: "Cómodo y funcional.", price: 999, img: "./images/zhen watch fit.png", category: "smart watch", ram: "8GB", storage: "8GB"},
  {name: "Zhen Watch Sport", description: "Ideal para entrenar.", price: 850, img: "./images/zhen watch sport.png", category: "smart watch", ram: "8GB", storage: "8GB"},
  {name: "Zhen Watch Core", description: "Simple y versátil.", price: 850, img: "./images/zhen watch core.png", category: "smart watch", ram: "4GB", storage: "32GB"}
 
];

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
    let filtered = ListProducts.filter(product => product.name.toLowerCase().includes(text.toLowerCase()));
    return filtered;
}

//----------------------------------------funciones de busqueda por filtros

function filterByCategory(category) {
    let filtered = ListProducts.filter(product => product.category === category);
    return filtered;
}

function filterByStorage(storage) {
    let filtered = ListProducts.filter(product => product.storage == storage);
    return filtered;
}

function filterByRam(ram) {
    let filtered = ListProducts.filter(product => product.ram == ram);
    return filtered;
}


//------------------------------------------ funcion de destildar filtros

function changeFilter(buttons, button, filteredList) {
  productsContainer.innerHTML = ""; // limpia el contenedor

  if (button.classList.contains("filter-active")) { //si contiene la clase se elimina

    button.classList.remove("filter-active");
    renderProducts(ListProducts); //renderiza todos los productos
    
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

/*
funcion vieja, estoy probnado el change filter() para no repetir codigo

categoryButtons.forEach(button => {
    button.addEventListener("click", () => {

        //destildar boton
        if (button.classList.contains("filter-active")) {

            button.classList.remove("filter-active");
            productsContainer.innerHTML = "";
            renderProducts(ListProducts);
            return;

        } else{
            //destacar boton
            button.classList.add("filter-active");
        }
        

        //toma el valor del boton
        const category = button.textContent.toLowerCase();
        
        //filtra los productos con la funcion
        const filteredProducts = filterByCategory(category); 

        //Limpia el contenedor
        productsContainer.innerHTML = ""; 

        //renderiza los productos filtrados
        renderProducts(filteredProducts);

        //cambiar de boton
        categoryButtons.forEach(btn => { //elimina la clase de los otros botones usando un for each, si un boton es diferente al que se clickeo le borra la clase
            if (btn !== button) {
                btn.classList.remove("filter-active"); 
            }
        });


    });     
});

*/

// CATEGORY FILTER
categoryButtons.forEach(button => {
  button.addEventListener("click", () => {

    const category = button.textContent.trim().toLocaleLowerCase(); //toma el valor del boton
    const filtered = filterByCategory(category); //filtra los productos con la funcion
    changeFilter(categoryButtons, button, filtered); //pasa los 3 parametros a la funcion

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

            sorted = [...ListProducts].sort((a, b) => b.price - a.price);

        } else{

            sorted = [...ListProducts].sort((a, b) => a.price - b.price); //si no de menor a mayor

        }

        changeFilter(priceFilter, button, sorted);


    });


});










//inicializa la página con todos los productos del array
renderProducts(ListProducts);