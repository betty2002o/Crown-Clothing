import './cart-dropdown.styles.scss';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../button/button';
import { CartContext } from '../../contexts/cartContext';
import CartItem from '../cart-item/CartItem';

function CartDropDown() {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();
  const gotToCheckOutHandler = () => {
    navigate('/checkout');
  };
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.length ? (
          cartItems.map((cartItem) => <CartItem cartItem={cartItem} />)
        ) : (
          <span className="empty-message"> Cart Is Empty</span>
        )}
      </div>
      <Button onClick={gotToCheckOutHandler}>GO TO CHECKOUT</Button>
    </div>
  );
}

export default CartDropDown;
