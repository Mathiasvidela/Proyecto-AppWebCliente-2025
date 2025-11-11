import { checkIcon } from './icons.js';
import { wrongIcon } from './icons.js';
import { greenColor } from './icons.js';
import { redColor } from './icons.js';
import { updateCartCount } from '../Js/refreshCart.js';

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

const btnMenos = document.querySelector('#btnMenos');
const btnMas = document.querySelector('#btnMas');
const numValue = document.querySelector('#numValue');


const btnCarrito = document.querySelector('#btnCarrito');
const btnComprar = document.querySelector('#btnComprar');

//toast
const toast = document.querySelector('#toast');
const toastText = document.querySelector('#toastText');
const toastIcon = document.querySelector('#toastIcon');


let currentProduct = null;


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

        const product = {
            id: data.id,
            name: data.fields.name,
            price: data.fields.price,   
            img: data.fields.img,
            stock: data.fields.stock,
            storage: data.fields.storage,
            ram: data.fields.ram,
        };

        currentProduct = product;
        renderProductDetails(data.fields)

        return currentProduct;


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
        storageInfo.innerHTML = `<p class="storage-btn"><span class="font-bold">${campo.storage}</span> DE ALMACENAMIENTO</p>`;
    }

    // condicion para la ram
    if (!campo.ram) {
        ramInfo.innerHTML = '';
    } else {
        ramInfo.innerHTML = `<p class="storage-btn"><span class="font-bold">${campo.ram}</span> RAM</p>`;
    }


    productImg.innerHTML = `<img class="producto" src="${campo.img}">`;

    feature1.appendChild(document.createElement("p")).textContent = campo.feature1;
    feature2.appendChild(document.createElement("p")).textContent = campo.feature2;
    feature3.appendChild(document.createElement("p")).textContent = campo.feature3;

 }


 // Contador de cantidad
    btnMenos.addEventListener('click', () => {
        let valor = numValue.value;
        if (valor > 1) {
            numValue.value = parseInt(valor) - 1;
        }
    });

    btnMas.addEventListener('click', () => {
        let valor = numValue.value;
        numValue.value = parseInt(valor) + 1;
    });


    // boton para agregar al carrito
    
    btnCarrito.addEventListener('click', () => {
       

        if (currentProduct.stock <= 0) {
            toastMessage(`${currentProduct.name} sin stock`, false);
            return;
        }else{


            const cantidad = parseInt(numValue.value);
            const cart = JSON.parse(localStorage.getItem('cart')) || [];

            
            const cantProduct = cart.findIndex(index =>
            index.id === currentProduct.id
            );

            //busca si hay otro producto producto con el mismo id
            if (cantProduct >= 0) {
            cart[cantProduct].quantity = parseInt(cart[cantProduct].quantity ) + cantidad;
            } else {
            cart.push({ ...currentProduct, quantity: cantidad });
            }
         
            localStorage.setItem('cart', JSON.stringify(cart));
        
        }

        toastMessage(`${currentProduct.name} agregado al carrito`, true);
        updateCartCount();


        
    });


    // toast funcion

    function toastMessage(message, isSuccess) {
        
        setTimeout(() => {
            if (isSuccess) {
                toastIcon.innerHTML = checkIcon;
                toastIcon.className = greenColor;
            } else {
                toastIcon.innerHTML = wrongIcon;
                toastIcon.className = redColor;
            }
            toastText.innerHTML = message;
            toast.style.opacity = 1;
        }, 100);

        setTimeout(() => {
            toast.style.opacity = 0;
        }, 2000);
    }
