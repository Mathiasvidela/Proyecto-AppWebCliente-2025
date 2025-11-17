import { updateCartCount } from "../Js/refreshCart.js";      

const cartContainer = document.querySelector('#cartItems');
const cartProducts = document.querySelector('#cartProducts');

const cantItems = document.querySelector('#cantItems');
const subTotal = document.querySelector('#subTotal');
const total = document.querySelector('#total');
const envio = document.querySelector('#envio');

const emptyCartBtn = document.querySelector('#vaciarBtn');





//------------------- Mostrar los productos en el carrito
function getCartItems() {

  // productos del local storage
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];


   // si esta vacio muestra mensaje
  if (cartItems.length <= 0 || cartItems === '') {
    cartProducts.innerHTML +=
        `
        <div class="cart-products">
        <h3 class="empty-cart">Tu carrito está vacío</h3>
        </div>
        `;

    return;
  }

  const productsHTML = cartItems.map(item => 
    `<div class="cart-product">
      <div class="cart-img">
        <img src=".${item.img}" alt="${item.name}">
      </div>

      <div class="cart-description">
        <h4>${item.name}</h4>
        <p>#${item.id}</p>
        <p>${item.storage || ''}</p>
      </div>

      <div class="cart-price">
        <h4>$${item.price}</h4>
      </div>

      <div class="contador">
        <label for="cantidad">Cantidad</label>

        <input class="cantidad" type="text" id="cantidad" value="${item.quantity}" min="1">

      </div>
    </div>`
);

  cartProducts.innerHTML = `
  <div class="cart-products">
    ${productsHTML}
  </div>
`;

  totalItems();

};



getCartItems();


//calculo de productos

function totalItems(){
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    
    let cantidadTotal = 0;
    let subTotalPrice = 0;

    cartItems.forEach(item => {
        cantidadTotal += item.quantity;
        subTotalPrice += (item.price * (item.quantity));
    });

    if (cantidadTotal < 1000) {
        envio.innerText = 'Gratis';
      } else {
        envio.innerText = '$50'; 
      }
    cantItems.innerText = `${cantidadTotal} items`;
    subTotal.innerText = `${subTotalPrice}`;
    total.innerText = Math.round(`${subTotalPrice * 1.21}`); // Aqui puedes agregar impuestos o costos adicionales si es necesario  

}

//vaciar carrito

emptyCartBtn.addEventListener('click', () => {
    localStorage.removeItem('cart');
    cartProducts.innerHTML = '';
    totalItems();
    getCartItems();
    updateCartCount();

});