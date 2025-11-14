import { AIRTABLETOKEN, BASEID, TABLENAME } from '../envs.js';

const airTableToken = AIRTABLETOKEN;
const baseId = BASEID;
const tableName = TABLENAME;
const airTableUrl = `https://api.airtable.com/v0/${baseId}/${tableName}`;


// elemtnos del DOM

const btnAgregar = document.getElementById('btnAgregar');

const itemsInsert = document.getElementById('itemsInsert');
const txtBuscarAdmin = document.getElementById('txtBuscarAdmin');

const cancelDelete = document.getElementById('cancelDelete');
const confirmDelete = document.getElementById('confirmDelete');
const deleteModal = document.getElementById('deleteModal');

// fetch de productos desde Airtable

export let listProducts = [];

async function fetchProductsFromAirtable() {

    try {
        const response = await fetch(airTableUrl, {

            headers: {
                'Authorization': `Bearer ${airTableToken}`,
                'Content-Type': 'application/json'
            }

        });

        const data = await response.json();

        const mapProducts = data.records.map(product => ({
            img: product.fields.img,
            name: product.fields.name,
            price: product.fields.price,
            category: product.fields.description,
            description: product.fields.description,
            ram: product.fields.ram,
            storage: product.fields.storage,
            id: product.id,
            stock: product.fields.stock,
            feature1: product.fields.feature1,
            feature2: product.fields.feature2,
            feature3: product.fields.feature3
        }));
        listProducts = mapProducts;

        renderProducts(mapProducts);

        console.log('Productos obtenidos de Airtable:', listProducts);

    }

    catch (error) {
        console.error('Error fetching products:', error);
    }

};

fetchProductsFromAirtable();

//estructura de las filas de la tabla
function createTableRow(product) {
    itemsInsert.innerHTML += `
                <tr>
                    <td><img src=".${product.img}" alt="${product.name}"></td>

                    <td>
                        <div>${product.name}</div>
                    </td>

                    <td>${product.price}</td>
                    
                    <td>${product.category}</td>
                    
                    <td>${product.description}</td>

                    <td>${product.ram}</td>

                    <td>${product.storage}</td>

                    <td>${product.feature1}</td>

                    <td>${product.feature2}</td>

                    <td>${product.feature3}</td>

                    <td>${product.stock}</td>

                    <td class="actions">
                    <button class="btn-fill-black btnEditar" data-id="${product.id}" >Editar</button>
                    <button class="btn-fill btnEliminar" data-id="${product.id}" >Eliminar</button>
                    </td>
                    

                </tr>
                `;
}




// Renderizar productos en el DOM y agregar funcionalidad a los botones
function renderProducts(products) {


    itemsInsert.innerHTML = ''; // Limpiar el contnido
    products.forEach(product => {
        createTableRow(product);
    });

    //botones de productos
    let btnEditar = document.querySelectorAll('.btnEditar');
    let btnEliminar = document.querySelectorAll('.btnEliminar');

    //editar productos
    btnEditar.forEach((button, index) => {

        const id = products[index].id;
        button.addEventListener('click', () => {
            window.location.href = `../pages/formAdmin.html?action=edit&id=${encodeURIComponent(id)}`;
        });

    });

    //agregar productos
    btnAgregar.addEventListener('click', () => {
        window.location.href = '../pages/formAdmin.html?action=add';
    });


    //eliminar productos
    btnEliminar.forEach(button => {

        button.addEventListener('click', async () => { 
            const itemId = button.dataset.id;
            console.log('ID a eliminar:', itemId);

           confirmDeleteModal();

            confirmDelete.addEventListener('click', async () => {
                await deleteProductFromAirtable(itemId);
                fetchProductsFromAirtable();
            });

            cancelDelete.addEventListener('click', () => {
                cancelDeleteModal();
            });


        });

    });



}

function confirmDeleteModal() {
    deleteModal.classList.remove('hidden');
}

function cancelDeleteModal() {
    deleteModal.classList.add('hidden');
    confirmDelete.style.display = 'flex';
}

//buscar productos
txtBuscarAdmin.addEventListener('input', () => {

    const busqueda = txtBuscarAdmin.value.toLowerCase();
    const productosFiltrados = listProducts.filter(product =>
        product.name.toLowerCase().includes(busqueda)

    );

    renderProducts(productosFiltrados);


});

async function deleteProductFromAirtable(itemId) {
    try {
        const response = await fetch(`${airTableUrl}/${itemId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${airTableToken}`,
                'Content-Type': 'application/json'
            }
        });


        console.log('se elimino');
        deleteModal.classList.add('hidden'); //desaparece el modal

    } catch (error) {
        console.error('error al eliminar el producto:', error);
    }
}




