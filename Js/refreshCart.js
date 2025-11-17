//------------------- cantidad de productos en el carrito

const cartCount = document.querySelector("#cartCount");
const cartCountFill = document.querySelector(".cartCount");

export function updateCartCount() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    const totalItems = cartItems.reduce((acum, item) => {
    return acum + (item.quantity || 0);
    }, 0);

   
    if (!totalItems) {
        cartCountFill.style.display = 'none';
        return;
    }

    cartCountFill.style.display = 'flex';
    cartCount.innerText = `${totalItems}`;

}


updateCartCount();