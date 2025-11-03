//Airtable API Configuration
import { AIRTABLETOKEN, BASEID, TABLENAME } from '../envs.js';
const airTableToken = AIRTABLETOKEN;
const baseId = BASEID;
const tableName = TABLENAME;
const airTableUrl = `https://api.airtable.com/v0/${baseId}/${tableName}`;

//DOM Elements
const productImg = document.querySelector('#productImg');
const storageInfo  = document.querySelector('#storageInfo');
const ramInfo  = document.querySelector('#ramInfo');
const feature1 = document.querySelector('#feature1');
const feature2 = document.querySelector('#feature2');
const feature3 = document.querySelector('#feature3');
const titleProduct = document.querySelector('#titleProduct');
const priceProduct = document.querySelector('#priceProduct');

// agarrar la id del producto desde el url
function getProductIdFromURL() {
    const params = new URLSearchParams(location.search);
    return params.get("code");

}


//Fetch product de airtable con el id de producto
async function fetchProductData(idProducto) {
    try {
        const response = await fetch(`${airTableUrl}/${idProducto}`, {
            headers: {
                Authorization: `Bearer ${airTableToken}`
            }
        });
        const data = await response.json();
        console.log(data);

        renderProductDetails(data.fields)


    } catch (error) {
        console.error("Error fetching product data:", error);
    };
}


// inicializacion
const idProducto = getProductIdFromURL();
fetchProductData(idProducto);


//mostrar producto en el DOM
function renderProductDetails(campo) {

    titleProduct.innerHTML = `<h2>${campo.name}</h2>`;

    
    priceProduct.innerHTML = `<h3 class="precio-final">$${campo.price}</h3>`;


    // condicion para el almacenamiento
    if (!campo.storage) {
        storageInfo.innerHTML = '';
    } else {
        storageInfo.innerHTML = `<p class="storage-btn">${campo.storage} GB</p>`;
    }

    // condicion para la ram
    if (!campo.ram) {
        ramInfo.innerHTML = '';
    } else {
        ramInfo.innerHTML = `<p class="storage-btn">${campo.ram} GB RAM</p>`;
    }


    productImg.innerHTML = `<img class="producto" src="${campo.img}">`;

    feature1.appendChild(document.createElement("p")).textContent = campo.feature1;
    feature2.appendChild(document.createElement("p")).textContent = campo.feature2;
    feature3.appendChild(document.createElement("p")).textContent = campo.feature3;

 }