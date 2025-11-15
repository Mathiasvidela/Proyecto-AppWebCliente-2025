let form = document.querySelector("form");
let modal = document.querySelector("#modal");
let modalText = document.querySelector("#modalText");

function capturar(event){

    event.preventDefault();

    
    let nombreForm = document.querySelector("#name").value.trim();
    let emailForm = document.querySelector("#email").value.trim();
    

    
    modalText.innerHTML=(`<p>Gracias por ponerte en contacto con nostros <span class="font-bold">${nombreForm}</span> 
        pronto nos pondremos en contacto con usted a su mail <span class="font-bold">${emailForm}</span></p>`);
    mostrarModal();
    
    
}

function mostrarModal(){
    modal.classList.remove("hidden");
    modal.classList.add("flex");
}

function cerrarModal(){
    form.reset();
    modal.classList.remove("flex");
    modal.classList.add("hidden");
    
}


