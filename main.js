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


  // Phones
  {name: "Zhen phone X pro", description: "Máxima potencia y diseño.", price: 156, img: "./images/phone xpro.png"},
  {name: "Zhen phone X", description: "Rendimiento y estilo.", price: 156, img: "./images/zhenphonex.png"},
  {name: "Zhen phone SE", description: "Tecnología esencial.", price: 156, img: "./images/zhenphoneSE.png"},
  {name: "Zhen phone Y", description: "Confiable y accesible.", price: 156, img: "./images/zhenphone Y.png"},

  // Headphones
  {name: "ZhenHeadphones Pro Max", description: "Sonido premium.", price: 156, img: "./images/ZhenHeadphones Pro Max.png"},
  {name: "ZhenHeadphones Elite", description: "Comodidad superior.", price: 156, img: "./images/ZhenHeadphones Elite.png"},
  {name: "ZhenHeadphones Studio", description: "Audio profesional.", price: 156, img: "./images/ZhenHeadphones Studio.png"},
  {name: "ZhenHeadphones Play", description: "Diversión sonora.", price: 156, img: "./images/ZhenHeadphones Play.png"},
  {name: "ZhenHeadphones Go", description: "Ligeros y prácticos.", price: 156, img: "./images/ZhenHeadphones Go.png"},

  // Watches
  {name: "Zhen Watch Pro", description: "Elegante y potente.", price: 1750, img: "./images/zhen watch pro.png"},
  {name: "Zhen Watch Active", description: "Deportividad y estilo.", price: 1400, img: "./images/zhen watch active.png"},
  {name: "Zhen Watch Fit", description: "Cómodo y funcional.", price: 999, img: "./images/zhen watch fit.png"},
  {name: "Zhen Watch Sport", description: "Ideal para entrenar.", price: 850, img: "./images/zhen watch sport.png"},
  {name: "Zhen Watch Core", description: "Simple y versátil.", price: 850, img: "./images/zhen watch core.png"}

 
];

let productsContainer = document.querySelector("#productsContainer"); //este es el div donde van todos los productos

//funcion que crea los elementos del producto
function createProductCard(product){

    //contenedor principal article
    const article = document.createElement("article");
    article.classList.add("products-card");

    //Imagen
    const divImg = document.createElement("div");
    const img = document.createElement("img");
    img.classList.add("products-card-img");
    img.src = product.img;
    img.alt = product.name;
    divImg.appendChild(img);

    //titulo y descripcion
    const divTitle = document.createElement("div");
    divTitle.classList.add("products-card-title");

    const h3 = document.createElement("h3");
    h3.textContent = product.name;

    const pDesc = document.createElement("p");
    pDesc.textContent = product.description;

    divTitle.appendChild(h3);
    divTitle.appendChild(pDesc);

    //precio y botón
    const divFooter = document.createElement("div");
    divFooter.classList.add("products-card-footer");

    const pPrice = document.createElement("p");
    pPrice.classList.add("products-card-precio");
    pPrice.textContent = `$${product.price}`;

    const aBtn = document.createElement("a");
    aBtn.href = "./pages/detalleProducto.html";
    aBtn.classList.add("btn-fill");
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

ListProducts.forEach(product => {
    const newProduct = createProductCard(product);
    productsContainer.appendChild(newProduct);
});