import { Link } from "react-router";
import CheckoutLockIcon from "../../assets/images/icons/checkout-lock-icon.png";
import "./CheckoutHeader.css";

export function CheckoutHeader({ cart }) {
  let totalQuantity = 0;
  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity;
  });
  let totalItems = `${totalQuantity} items`;
  if (totalQuantity == 1){
    totalItems = `${totalQuantity} item`;
  }
  
  return (
    <div className="checkout-header">
      <div className="header-content">
        <div className="checkout-header-left-section">
          <Link to="/">
            <img
              className="logo"
              src="images/logo.png"
            />
            <img
              className="mobile-logo"
              src="images/mobile-logo.png"
            />
          </Link>
        </div>

        <div className="checkout-header-middle-section">
          Checkout (
          <Link
            className="return-to-home-link"
            to="/"
          >
            {totalItems}
          </Link>
          )
        </div>

        <div className="checkout-header-right-section">
          <img src={CheckoutLockIcon} />
        </div>
      </div>
    </div>
  );
}
