//------------------- cantidad de productos en el carrito

const cartCount = document.querySelector("#cartCount");

export function updateCartCount() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];


    

    const totalItems = cartItems.reduce((acum, item) => {
    return acum + (item.quantity || 0);
    }, 0);

   
    if (totalItems < 0) {
        cartCount.style.display = 'none';
        return;
    }

    cartCount.style.display = 'block';
    cartCount.innerText = `${totalItems}`;

}


updateCartCount();