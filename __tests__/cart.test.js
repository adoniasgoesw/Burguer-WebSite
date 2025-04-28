const { addToCart, removeItemCart, updateCartModal } = require('../cart'); // ajustando o caminho conforme necessário

describe('Cart functions', () => {

  let cart;
  
  beforeEach(() => {
    cart = []; // Inicializa um carrinho vazio antes de cada teste
  });

  test('should add item to the cart', () => {
    addToCart('Product 1', 10.00);
    expect(cart).toHaveLength(1);
    expect(cart[0].name).toBe('Product 1');
    expect(cart[0].quantity).toBe(1);
  });

  test('should increment quantity of an existing item in the cart', () => {
    addToCart('Product 1', 10.00);
    addToCart('Product 1', 10.00);
    expect(cart[0].quantity).toBe(2);
  });

  test('should remove one item from the cart', () => {
    addToCart('Product 1', 10.00);
    removeItemCart('Product 1');
    expect(cart[0].quantity).toBe(1);
  });

  test('should remove item completely from cart if quantity is 1', () => {
    addToCart('Product 1', 10.00);
    removeItemCart('Product 1');
    expect(cart).toHaveLength(0);
  });

  test('should calculate total price correctly', () => {
    addToCart('Product 1', 10.00);
    addToCart('Product 2', 20.00);
    const total = updateCartModal();
    expect(total).toBe(30.00); // Assumindo que você tem a lógica que retorna o total
  });
});
