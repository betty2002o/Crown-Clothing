import React, { Fragment, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { UserContext } from '../../contexts/userContext';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { SignOutUser } from '../../utils/firebase/firebase.utils';
import CartIcon from '../../components/cart-icon/CartIcon';
import CartDropDown from '../../cart-dropdown/CartDropDown';
import { CartContext } from '../../contexts/cartContext';
import './navigation.styles.scss';
function Navigation() {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

  return (
    <Fragment>
      <div className="navigation">
        <Link to="/" className="logo-container">
          <CrwnLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link to="shop" className="nav-link">
            Shop
          </Link>

          {currentUser ? (
            <span className="nav-link" onClick={SignOutUser}>
              Sign Out
            </span>
          ) : (
            <Link to="/auth" className="nav-link">
              Sign In
            </Link>
          )}
          <CartIcon />
        </div>
        {isCartOpen && <CartDropDown />}
      </div>
      <Outlet />
    </Fragment>
  );
}

export default Navigation;
