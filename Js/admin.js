import { AIRTABLETOKEN, BASEID, TABLENAME } from '../envs.js';

const airTableToken = AIRTABLETOKEN;
const baseId = BASEID;
const tableName = TABLENAME;
const airTableUrl = `https://api.airtable.com/v0/${baseId}/${tableName}`;


// elemtnos del DOM

const btnEditar = document.querySelectorAll('#btnEditar');
const btnEliminar = document.querySelectorAll('#btnEliminar');
const itemsInsert = document.getElementById('itemsInsert');
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

        console.log("Datos de Airtable", data);

        const mapProducts = data.records.map(product => ({
            name: product.fields.name,
            description: product.fields.description,
            price: product.fields.price,
            img: product.fields.img,
            category: product.fields.category,
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
                    <td><img src="${product.img}" alt="${product.name}"></td>

                    <td>
                        <div>${product.name}</div>
                    </td>

                    <td>${product.price}</td>

                    <td><span class="chip">${product.category}</span></td>

                    <td>${product.ram}</td>

                    <td>${product.storage}</td>

                    <td>${product.feature1}</td>

                    <td>${product.feature2}</td>

                    <td>${product.feature3}</td>

                    <td>${product.stock}</td>

                    <td class="actions">
                    <button class="btn-fill-black" id="btnEditar">Editar</button>
                    <button class="btn-fill" id="btnEliminar">Eliminar</button>
                    </td>
                    

                </tr>
                `;
}


// Renderizar productos en el DOM
function renderProducts(products) {
    itemsInsert.innerHTML = ''; // Limpiar el contnido
    products.forEach(product => {
        createTableRow(product);
    });

}