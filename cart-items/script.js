// =========================
// LOAD CART
// =========================
function loadCart(){

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let container = document.getElementById("cartItems");
  let total = 0;

  if(!container) return;

  container.innerHTML = "";

  if(cart.length === 0){
    container.innerHTML = "<p>🛒 Cart Empty</p>";
    document.getElementById("totalAmount").innerText = "0";
    return;
  }

  cart.forEach(item => {

    let itemTotal = item.price * item.qty;
    total += itemTotal;

    container.innerHTML += `
      <div class="cart-card">

        <div class="cart-img">
          <img src="${item.image}">
        </div>

        <div class="cart-info">
          <h2>${item.title}</h2>

          <p>Price: ₹${item.price}</p>
          <p>Lot: ${item.qty}</p>

          <p class="item-total">₹${itemTotal}</p>
        </div>

        <div class="cart-actions">

          <button onclick="addMore('${item.id}')">+ Add More</button>

          <button onclick="removeItem('${item.id}')">Remove</button>

        </div>

      </div>
    `;
  });

  document.getElementById("totalAmount").innerText = total;
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
// CHECKOUT
// =========================
function goCheckout(){
  window.location.href = "checkout.html";
}

// =========================
// INIT
// =========================
document.addEventListener("DOMContentLoaded", loadCart);
