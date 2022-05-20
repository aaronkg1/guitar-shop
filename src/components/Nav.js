import React, { useContext, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { BasketContext } from "./GlobalState";

import { Link } from "react-router-dom";

import "../styles/Nav.css";

const Nav = () => {
  const { shoppingCart } = useContext(BasketContext);

  useEffect(() => {
    calculateItemsTotal();
  }, [shoppingCart]);

  const calculateItemsTotal = () => {
    const initialValue = 0;
    const total = shoppingCart.reduce((total, item) => {
      return Number(total) + Number(item.quantity);
    }, initialValue);
    return total;
  };

  const displayNumber = calculateItemsTotal();
  return (
    <nav className="nav-bar">
      <h3 className="nav-logo">Aaron's Axes</h3>
      <ul className="nav-links">
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/shop">
          <li>Shop</li>
        </Link>
        <Link to="/basket">
          <li>
            <div className="basket-icon-container">
              <div className="basket-size-icon">{displayNumber}</div>
              <FaShoppingCart className="shopping-cart" />
            </div>
          </li>
        </Link>
      </ul>
    </nav>
  );
};

export default Nav;
