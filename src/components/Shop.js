import React, { useContext } from "react";
import { ShopContext, BasketContext } from "./GlobalState";
import { Link } from "react-router-dom";
import "../styles/Shop.css";
const Shop = () => {
  const { shopItems, setShopItems } = useContext(ShopContext);
  const { shoppingCart, setShoppingCart } = useContext(BasketContext);

  const itemQuantityInBasket = (item) => {
    const itemInBasket = shoppingCart.filter((cartItem) => {
      return cartItem.id === item.id;
    });
    return itemInBasket.length > 0 ? itemInBasket[0].quantity : 0;
  };

  const updateBasket = (item, e) => {
    let shoppingCartCopy = [...shoppingCart];
    const itemInBasket = shoppingCartCopy.filter((cartItem) => {
      return cartItem.id === item.id;
    })[0];
    if (itemInBasket) {
      itemInBasket.quantity = e.target.value;
    } else {
      shoppingCartCopy = [...shoppingCartCopy, { ...item, quantity: 1 }];
    }

    setShoppingCart(shoppingCartCopy);
  };
  return (
    <div>
      <ul className="shop-list">
        {shopItems.map((item) => {
          return (
            <li key={item.id} className="product-thumbnail">
              <Link to={`/shop/${item.id}`} className="product-thumbnail-link">
                <h3>{item.title}</h3>
                <div className="shop-thumbnail">
                  <img src={item.img} alt={item.title} />
                </div>
              </Link>
              <p>£{item.price}</p>
              <input
                type="number"
                min="0"
                value={itemQuantityInBasket(item)}
                onChange={(e) => {
                  updateBasket(item, e);
                }}
                className="quantity-input"
              ></input>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Shop;
