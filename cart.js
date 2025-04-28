// cart.js
function addToCart(name, price, cart) {
  const existingItem = cart.find(item => item.name === name);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      name,
      price,
      quantity: 1,
    });
  }
}

function removeItemCart(name, cart) {
  const index = cart.findIndex(item => item.name === name);

  if (index !== -1) {
    const item = cart[index];
    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      cart.splice(index, 1);
    }
  }
}

function checkOpen() {
  const data = new Date();
  const hora = data.getHours();
  return hora >= 18 && hora < 22;
}

module.exports = { addToCart, removeItemCart, checkOpen };
