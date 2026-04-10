// =========================
// LOAD CART (FINAL)
// =========================
function loadCart(){

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let royalCard = document.getElementById("royal1-card");
  let qtyEl = document.getElementById("royal1-qty");
  let totalEl = document.getElementById("royal1-total");

  let title = document.getElementById("cartTitle");
  let totalBox = document.getElementById("totalAmount");

  let totalAmount = 0;

  // DEFAULT HIDE
  if(royalCard) royalCard.style.display = "none";
  if(title) title.style.display = "none";

  if(cart.length === 0){
    if(totalBox) totalBox.innerText = "0";
    return;
  }

  cart.forEach(item => {

    if(item.id === "royal1"){

      let itemTotal = item.qty * item.price;
      totalAmount += itemTotal;

      // SHOW CARD
      if(royalCard) royalCard.style.display = "block";

      // SHOW TITLE
      if(title) title.style.display = "block";

      // UPDATE DATA
      if(qtyEl) qtyEl.innerText = item.qty;
      if(totalEl) totalEl.innerText = itemTotal;
    }

  });

  // TOTAL
  if(totalBox) totalBox.innerText = totalAmount;
}

// =========================
// ADD MORE
// =========================
function addMore(id){

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.forEach(item => {
    if(item.id === id){
      item.qty++;
    }
  });

  localStorage.setItem("cart", JSON.stringify(cart));

  loadCart();
}

// =========================
// REMOVE
// =========================
function removeItem(id){

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart = cart.filter(item => item.id !== id);

  localStorage.setItem("cart", JSON.stringify(cart));

  loadCart();
}

// =========================
// INIT
// =========================
document.addEventListener("DOMContentLoaded", loadCart);
