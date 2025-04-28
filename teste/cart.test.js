const { addToCart, removeItemCart, checkOpen } = require('../script');
const { addToCart, removeItemCart, checkOpen } = require('../cart');

describe('Carrinho de Compras', () => {
  let cart;

  beforeEach(() => {
    cart = [];
  });

  test('adiciona item ao carrinho corretamente', () => {
    addToCart('Hamburger Smash', 18.90, cart);
    expect(cart.length).toBe(1);
    expect(cart[0]).toEqual({ name: 'Hamburger Smash', price: 18.90, quantity: 1 });
  });

  test('incrementa a quantidade se item já existir', () => {
    addToCart('Hamburger Smash', 18.90, cart);
    addToCart('Hamburger Smash', 18.90, cart);
    expect(cart[0].quantity).toBe(2);
  });

  test('remove item corretamente', () => {
    addToCart('Hamburger Smash', 18.90, cart);
    removeItemCart('Hamburger Smash', cart);
    expect(cart.length).toBe(0);
  });

  test('decrementa quantidade antes de remover item', () => {
    addToCart('Hamburger Smash', 18.90, cart);
    addToCart('Hamburger Smash', 18.90, cart);
    removeItemCart('Hamburger Smash', cart);
    expect(cart[0].quantity).toBe(1);
  });

  test('verifica se está aberto (horário entre 18h e 22h)', () => {
    const mockDate = new Date();
    jest.spyOn(global, 'Date').mockImplementation(() => ({
      getHours: () => 19,
    }));
    expect(checkOpen()).toBe(true);
  });
});
