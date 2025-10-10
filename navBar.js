let menuBtn = document.querySelector("#menuBtn");
let navList = document.querySelector("#navList");

menuBtn.addEventListener("click", () => {

    if (navList.classList.contains("active")){
        navList.classList.remove("active")
    } else{
        navList.classList.add("active")
    }
})


