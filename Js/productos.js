import { AIRTABLETOKEN, BASEID,TABLENAME} from "../envs.js";

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
            category: product.fields.category
            
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
                 
                  <h3 class="precio-final">${product.price}</h3>

                  <div class="contador">
                    <label for="cantidad">Cantidad</label>
                    <button class="contadores">-</button>
                    <input class="cantidad" type="number" name="cantidad" value="1" min="1" step="1">
                    <button class="contadores">+</button>
                  </div>
                  
                  <div class="buttons">
                    <a class="btn-fill">Comprar ahora</a>
                    <a href="/pages/detalleProducto.html" class="btn-stroke">Detalles <i class="fa-solid fa-list"></i></a>
                  </div>

                </div>
            </div>
        </section>
    `

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