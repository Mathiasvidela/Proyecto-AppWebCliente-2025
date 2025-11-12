//Airtable API Configuration
import { AIRTABLETOKEN, BASEID, TABLENAME } from '../envs.js';
const airTableToken = AIRTABLETOKEN;
const baseId = BASEID;
const tableName = TABLENAME;
const airTableUrl = `https://api.airtable.com/v0/${baseId}/${tableName}`;

//dom elements
const formTitle =  document.getElementById('tituloForm');

const formImg = document.getElementById('formImg');
const formName = document.getElementById('formName');
const formPrice = document.getElementById('formPrice');
const formCategory = document.getElementById('formCategory');
const formDescription = document.getElementById('formDescription');
const formStock = document.getElementById('formStock');
const formStorage = document.getElementById('formStorage');
const formRam = document.getElementById('formRam');
const fromFeature1 = document.getElementById('formFeature1');
const fromFeature2 = document.getElementById('formFeature2');
const fromFeature3 = document.getElementById('formFeature3');

//get action y id del from URL
const params = new URLSearchParams(location.search);
const action = params.get('action');
const productId = params.get('id');

console.log('accion:', action, 'id:', productId);



async function fetchProductData(productId) {
    try {
        const response = await fetch(`${airTableUrl}/${productId}`, {
            headers: {
                Authorization: `Bearer ${airTableToken}`
            }
        });
        const data = await response.json();
        console.log(data);

        const product = {
            img: data.fields.img,
            name: data.fields.name,
            price: data.fields.price,
            category: data.fields.category,
            description: data.fields.description,
            ram: data.fields.ram,
            storage: data.fields.storage,
            id: data.id,
            stock: data.fields.stock,
            feature1: data.fields.feature1,
            feature2: data.fields.feature2,
            feature3: data.fields.feature3
        };

        return product;


    } catch (error) {
        console.error("Error fetching product data:", error);
    };
}


if (action === 'add') {
    formTitle.textContent = 'Agregar Producto';
}
else if (action === 'edit') {
    formTitle.textContent = 'Editar Producto';
    console.log("ID del producto a editar:", productId);

    fetchProductData(productId)
    .then(product => {
        // campos del form
       formImg.value = product.img;
       formName.value = product.name;
       formPrice.value = product.price;
       formCategory.value = product.category;
       formDescription.value = product.description;
       formRam.value = product.ram;
       formStorage.value = product.storage;
       formStock.value = product.stock;
       fromFeature1.value = product.feature1;
       fromFeature2.value = product.feature2;
       fromFeature3.value = product.feature3;
    });  


}