// =========================
// DOM READY
// =========================
document.addEventListener("DOMContentLoaded", function () {

  // =========================
  // MENU (FINAL)
  // =========================
  window.toggleMenu = function () {
    let menu = document.getElementById("sideMenu");
    let icon = document.querySelector(".menu-icon");

    menu.classList.toggle("active");
    icon.classList.toggle("active");
  };

  // 👉 OUTSIDE CLICK CLOSE (premium feel)
  document.addEventListener("click", function(e){
    let menu = document.getElementById("sideMenu");
    let icon = document.querySelector(".menu-icon");

    if(menu && icon){
      if(!menu.contains(e.target) && !icon.contains(e.target)){
        menu.classList.remove("active");
        icon.classList.remove("active");
      }
    }
  });

  // =========================
  // DROPDOWN
  // =========================
  document.querySelectorAll(".dropdown").forEach(item => {
    item.addEventListener("click", () => {
      item.classList.toggle("active");
    });
  });

  // =========================
  // SEARCH
  // =========================
  window.toggleSearch = function () {
    document.getElementById("searchBox").classList.toggle("active");
  };

  // =========================
  // VIDEO AUTO PLAY
  // =========================
  const video = document.querySelector(".hero-video");
  if (video) {
    video.muted = true;
    video.play().catch(() => {});
    video.addEventListener("pause", () => video.play());
  }

  // =========================
  // SLIDER
  // =========================
  document.querySelectorAll(".slider").forEach(slider => {

    let images = slider.querySelectorAll("img");
    let dots = slider.querySelectorAll(".dot");
    let i = 0;

    if(images.length === 0) return;

    setInterval(() => {

      images[i].classList.remove("active");
      if(dots[i]) dots[i].classList.remove("active");

      i = (i + 1) % images.length;

      images[i].classList.add("active");
      if(dots[i]) dots[i].classList.add("active");

    }, 3000);

  });

  // =========================
  // ACCORDION
  // =========================
  document.querySelectorAll(".title").forEach(item => {
    item.addEventListener("click", () => {
      item.parentElement.classList.toggle("active");
    });
  });

  // =========================
  // CART INIT
  // =========================
  window.cart = JSON.parse(localStorage.getItem("cart")) || [];

  // =========================
  // UPDATE CART COUNT
  // =========================
  window.updateCartCount = function () {
    const countEl = document.getElementById("cartCount");
    if (countEl) {
      countEl.innerText = cart.length;
    }
  };

  updateCartCount();

});


// =========================
// ADD TO CART
// =========================
function addToCart(productId){

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let product = products[productId]; // ⚠️ products object required

  if(!product){
    console.error("Product not found:", productId);
    return;
  }

  let item = {
    ...product,
    qty: 1
  };

  cart.push(item);

  localStorage.setItem("cart", JSON.stringify(cart));

  if (typeof updateCartCount === "function") {
    updateCartCount();
  }

  // 🔔 TOAST
  let toast = document.getElementById("toast");
  if(toast){
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2000);
  }
}


// =========================
// REMOVE ITEM
// =========================
function removeItem(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart = cart.filter(item => item.id !== id);

  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}


// =========================
// CHANGE QTY
// =========================
function changeQty(id, type) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.forEach(item => {
    if (item.id === id) {
      if (type === "inc") item.qty++;
      if (type === "dec" && item.qty > 1) item.qty--;
    }
  });

  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}

//auto ckuck img bannet//
function changeImg(el){
  document.getElementById("mainImage").src = el.src;
}

// hide popup//
// OPEN AFTER 2 SEC
setTimeout(()=>{
  document.getElementById("popup").classList.add("show");
},2000);

// CLOSE FUNCTION
function closePopup(){
  document.getElementById("popup").classList.remove("show");
}