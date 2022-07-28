import { createContext, useReducer } from 'react';

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, productToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToRemove.id
  );

  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === productToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (cartItems, cartItemToClear) =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  setCartItems: () => {},
  addItemToCart: () => {},
  cartCount: 0,
  cartTotal: 0,
  removeItemToCart: () => {},
  clearItemFromCart: () => {},
});

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

const CART_ACTION_TYPES = {
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_CART_COUNT: 'SET_CART_COUNT',
  SET_CART_TOTAL: 'SET_CART_TOTAL',
};

const CartReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return { ...state, ...payload };
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return { ...state, isCartOpen: payload };
    default:
      throw new Error(`unhandle type ${type} in CartReducer`);
  }
};

export const CartProvider = ({ children }) => {
  const [{ cartCount, cartTotal, cartItems, isCartOpen }, dispatch] =
    useReducer(CartReducer, INITIAL_STATE);

  const updateCartReducer = (cartItems) => {
    const newCartCount = cartItems.reduce(
      (acc, cartItem) => acc + cartItem.quantity,
      0
    );
    const newCartTotal = cartItems.reduce(
      (acc, cartItem) => acc + cartItem.quantity * cartItem.price,
      0
    );

    const payload = {
      cartItems,
      cartCount: newCartCount,
      cartTotal: newCartTotal,
    };
    dispatch({ type: CART_ACTION_TYPES.SET_CART_ITEMS, payload });
  };

  const setIsCartOpen = (bool) => {
    dispatch({ type: CART_ACTION_TYPES.SET_IS_CART_OPEN, payload: bool });
  };

  const addItemToCart = (product) => {
    const newCartItems = addCartItem(cartItems, product);
    updateCartReducer(newCartItems);
  };

  const removeItemToCart = (product) => {
    const newCartItems = removeCartItem(cartItems, product);
    updateCartReducer(newCartItems);
  };

  const clearItemFromCart = (product) => {
    const newCartItems = clearCartItem(cartItems, product);
    updateCartReducer(newCartItems);
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    removeItemToCart,
    cartCount,
    cartTotal,
    clearItemFromCart,
  };
  return <CartContext.Provider value={value}> {children}</CartContext.Provider>;
};
