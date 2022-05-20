import React, { useContext, useEffect } from "react";
import { Link, useMatch } from "react-router-dom";
import { BasketContext, ShopContext } from "./GlobalState";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import "../styles/Item.css";

function Item() {
  const { shopItems, setShopItems } = useContext(ShopContext);
  const { shoppingCart, setShoppingCart } = useContext(BasketContext);
  const itemID = useMatch("/shop/:id").params.id;
  const item = shopItems.filter((shopItem) => {
    return Number(shopItem.id) === Number(itemID);
  })[0];

  const isItemInBasket = () => {
    let itemInShoppingCart = shoppingCart.filter((cartItem) => {
      return Number(cartItem.id) === Number(item.id);
    });
    if (itemInShoppingCart.length > 0) {
      return true;
    } else {
    }
    return false;
  };

  const addToBasket = () => {
    let shoppingCartCopy = [...shoppingCart];
    let itemInShoppingCartCopy = shoppingCartCopy.filter((copyItem) => {
      return Number(copyItem.id) === Number(item.id);
    })[0];

    itemInShoppingCartCopy
      ? (itemInShoppingCartCopy.quantity = itemInShoppingCartCopy.quantity + 1)
      : (shoppingCartCopy = [...shoppingCart, { ...item, quantity: 1 }]);

    setShoppingCart(shoppingCartCopy);
  };

  const itemQuantity = () => {
    let quantity;
    if (isItemInBasket()) {
      quantity = shoppingCart.filter((cartItem) => {
        return Number(cartItem.id) === Number(item.id);
      })[0].quantity;
      return quantity;
    } else return false;
  };

  const removeFromBasket = () => {
    let shoppingCartCopy = [...shoppingCart];
    let itemInShoppingCart = shoppingCartCopy.filter((cartItem) => {
      return Number(cartItem.id) === Number(item.id);
    })[0];
    if (itemInShoppingCart === undefined) {
      return;
    } else if (itemInShoppingCart.quantity === 1) {
      shoppingCartCopy = shoppingCartCopy.filter((cartItem) => {
        return Number(cartItem.id) !== Number(item.id);
      });
      setShoppingCart(shoppingCartCopy);
    } else {
      itemInShoppingCart.quantity = Number(itemInShoppingCart.quantity) - 1;
      setShoppingCart(shoppingCartCopy);
    }

    setShoppingCart(shoppingCartCopy);
  };

  const itemDisplay = (
    <div className="item-container">
      <h1>{item.title}</h1>
      <img src={item.img} alt={item.title} className="item-display-image" />
      <p>{item.description}</p>
      <p>Price: £{item.price}</p>
      <div className="basket-modifier">
        <AiOutlinePlusCircle
          className="add-to-basket"
          onClick={() => {
            addToBasket();
          }}
        />
        {isItemInBasket() ? <p>{itemQuantity()} in basket</p> : null}

        {isItemInBasket() ? (
          <AiOutlineMinusCircle
            onClick={removeFromBasket}
            className="remove-from-basket"
          />
        ) : null}
      </div>
    </div>
  );

  return itemDisplay;
}

export default Item;
