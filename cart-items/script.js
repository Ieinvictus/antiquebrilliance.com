function loadCart(){

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  console.log(cart); // 🔥 DEBUG

  let container = document.getElementById("cartItems");
  let total = 0;

  if(!container) return;

  container.innerHTML = "";

  if(cart.length === 0){
    container.innerHTML = "<p>Cart Empty</p>";
    return;
  }

  cart.forEach(item => {

    let itemTotal = item.price * item.qty;
    total += itemTotal;

    container.innerHTML += `
      <div>
        <h2>${item.title}</h2>
        <p>Qty: ${item.qty}</p>
        <p>Total: ₹${itemTotal}</p>
      </div>
    `;
  });

  document.getElementById("totalAmount").innerText = total;
}

document.addEventListener("DOMContentLoaded", loadCart);
