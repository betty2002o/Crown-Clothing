import './cart-dropdown.styles.scss';
import { useContext } from 'react';
import Button from '../components/button/button';
import { CartContext } from '../contexts/cartContext';
import CartItem from '../cart-item/CartItem';

function CartDropDown() {
  const { cartItems } = useContext(CartContext);
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.length ? (
          cartItems.map((cartItem) => <CartItem cartItem={cartItem} />)
        ) : (
          <span className="empty-message"> Cart Is Empty</span>
        )}
      </div>
      <Button>GO TO CHECKOUT</Button>
    </div>
  );
}

export default CartDropDown;
