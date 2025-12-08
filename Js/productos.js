import { AIRTABLETOKEN, BASEID,TABLENAME} from "../envs.js";
import { updateCartCount } from "./refreshCart.js";

const airTableToken = AIRTABLETOKEN;
const baseId = BASEID;
const tableName = TABLENAME;
const airTableUrl = `https://api.airtable.com/v0/${baseId}/${tableName}`;


//DOM elements
const productsContainer = document.getElementById('productsContainer');

//parametros de la url
const params = new URLSearchParams(location.search);
const categoryUrl = params.get('category');

console.log('categoria:'+ categoryUrl);


async function fetchProductsFromAirtable() {

    try {
        const response = await fetch(airTableUrl, {

            headers: {
                'Authorization': `Bearer ${airTableToken}`,
                'Content-Type': 'application/json'
            }

        });
       



        const data = await response.json();

        console.log("Datos de Airtable", data);

        const mapProducts = data.records.map(product => ({
            name: product.fields.name,
            price: product.fields.price,
            img: product.fields.img,
            id: product.id,
            category: product.fields.category,
            stock: product.fields.stock,
            
        }));
        
         // filtra depende la categoria de la url
        const filtered = mapProducts.filter(product => product.category === categoryUrl);

        renderProducts(filtered);

        


    }

    catch (error) {
        console.error('Error fetching products:', error);
    }

};


function createProductCard(product){
    const section = document.createElement("section");
    section.classList.add("margin");
    productsContainer.appendChild(section);

    section.innerHTML = `

            <div class="grid-detalles-producto">

                <div class="img-producto">
                  <img class="producto" src=".${product.img}" alt="">
                </div>

                <div class="precio">

                  <h2>${product.name}</h2>
                 
                  <h3 class="precio-final">$${product.price}</h3>
                  
                  <div class="buttons">
                    <a class="btn-fill btnComprar">Comprar ahora</a>
                   
                    <a href="/pages/detalleProducto.html?code=${encodeURIComponent(product.id)}" class="btn-stroke">Detalles <i class="fa-solid fa-list"></i></a>
                  </div>

                </div>
            </div>
        </section>
    `

    // boton comprar ahora
    const btnComprar = section.querySelector('.btnComprar');
    const numValue = section.querySelector('.cantidad');

    btnComprar.addEventListener('click', () => {

        //verifica si hay stock
       if (product.stock <= 0) {
        console.log('sin stock');
        //toastMessage(`${product.name} sin stock`, false);
        return;
       }

        //const cantidad = parseInt(numValue.value);

        //se vacia el carrito y luego se carga el producto
        localStorage.removeItem('cart');
        const cart = [{ ...product, quantity: 1 }];
        localStorage.setItem('cart', JSON.stringify(cart));

        updateCartCount();
        
        
        window.location.href = '../pages/cart.html';

    });


    return section;
}

function renderProducts(products) {
    productsContainer.innerHTML = ""; //Limpia el contenedor
    products.forEach(product => {
        const productCard = createProductCard(product);
        productsContainer.appendChild(productCard);
    });
}




//inicilizacion de la pagina con productos de Airtable filtrados
fetchProductsFromAirtable();