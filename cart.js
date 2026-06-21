let cart = [];
const cartItemsContainer = document.getElementById("cart-items-container");
const totalPriceElement = document.getElementById("total-price");
const cartSection = document.getElementById("cart-section");

function addToCart(name, price) {
  const existingItem = cart.find((item) => item.name === name);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name: name, price: price, quantity: 1 });
  }
  renderCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
}

function updateQuantity(index, change) {
  if (cart[index].quantity + change <= 0) {
    removeFromCart(index);
  } else {
    cart[index].quantity += change;
    renderCart();
  }
}

function renderCart() {
  if (cart.length > 0) {
    cartSection.style.display = "block";
  } else {
    cartSection.style.display = "none";
  }

  cartItemsContainer.innerHTML = "";
  let total = 0;
  let itemCount = 0;

  cart.forEach((item, index) => {
    itemCount += item.quantity;
    total += item.price * item.quantity;

    const itemDiv = document.createElement("div");
    itemDiv.className = "cart-item";
    itemDiv.innerHTML = `
                    <div class="cart-item-info">
                        <span class="cart-item-name">${item.name}</span>
                        <span class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                    <div class="cart-item-actions">
                        <button class="qty-btn" onclick="updateQuantity(${index}, -1)">-</button>
                        <span style="font-weight:600; font-size:14px;">${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQuantity(${index}, 1)">+</button>
                        <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
                    </div>
                `;
    cartItemsContainer.appendChild(itemDiv);
  });

  totalPriceElement.textContent = `$${total.toFixed(2)}`;
}

renderCart();
