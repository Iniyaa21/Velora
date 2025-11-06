import { NavLink, useNavigate, useSearchParams } from "react-router";
import { useState } from "react";
import CartIcon from "../assets/images/icons/cart-icon.png";
import SearchIcon from "../assets/images/icons/search-icon.png";
import "./Header.css";

export function Header({ cart }) {
  const [searchParams] = useSearchParams();
  const searchText = searchParams.get("search");
  const [searchTextInput, setSearchTextInput] = useState(searchText || "");
  const navigate = useNavigate();

  let totalQuantity = 0;
  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity;
  });

  const changeSearchInput = (event) => {
    setSearchTextInput(event.target.value);
  };

  const handleSearchClick = () => {
    navigate(`/?search=${searchTextInput}`);
  };

  const handleSearchKeyDown = (event) => {
    if (event.key == "Enter") {
      handleSearchClick();
    }
  }
  return (
    <div className="header">
      <div className="left-section">
        <NavLink
          to="/"
          className="header-link"
        >
          <img
            className="logo"
            src="images/logo-white.png"
          />
          <img
            className="mobile-logo"
            src="images/mobile-logo-white.png"
          />
        </NavLink>
      </div>

      <div className="middle-section">
        <input
          className="search-bar"
          type="text"
          placeholder="Search"
          value={searchTextInput}
          onChange={changeSearchInput}
          onKeyDown={handleSearchKeyDown}
        />

        <button
          className="search-button"
          onClick={handleSearchClick}
        >
          <img
            className="search-icon"
            src={SearchIcon}
          />
        </button>
      </div>

      <div className="right-section">
        <NavLink
          className="orders-link header-link"
          to="/orders"
        >
          <span className="orders-text">Orders</span>
        </NavLink>

        <NavLink
          className="cart-link header-link"
          to="/checkout"
        >
          <img
            className="cart-icon"
            src={CartIcon}
          />
          <div className="cart-quantity">{totalQuantity}</div>
          <div className="cart-text">Cart</div>
        </NavLink>
      </div>
    </div>
  );
}
