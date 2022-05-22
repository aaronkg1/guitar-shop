import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { BasketContext } from "./GlobalState";
import "../styles/Basket.css";
import { FaCross, FaTrash } from "react-icons/fa";

const Basket = () => {
  const { shoppingCart, setShoppingCart } = useContext(BasketContext);

  useEffect(() => {
    shoppingCart.forEach((item) => {
      if (item.quantity < 1) {
        setShoppingCart(
          shoppingCart.filter((shoppingItem) => {
            return item.id !== shoppingItem.id;
          })
        );
      }
    });
  }, [shoppingCart]);

  const updateQuantity = async (item, e) => {
    const itemIndex = shoppingCart.indexOf(item);
    const shoppingCartCopy = [...shoppingCart];
    const itemCopy = { ...item, quantity: e.target.value };
    shoppingCartCopy[itemIndex] = itemCopy;

    setShoppingCart(() => {
      return shoppingCartCopy;
    });
  };

  const removeFromBasket = (item) => {
    setShoppingCart(
      shoppingCart.filter((cartItem) => {
        return item.id !== cartItem.id;
      })
    );
  };

  const calculateTotal = () => {
    const initialValue = 0;
    const total = shoppingCart.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, initialValue);
    return total;
  };
  return (
    <div className="basket-container">
      <h1>Basket</h1>
      {shoppingCart.length > 0 ? (
        <table className="shopping-basket">
          <thead>
            <tr>
              <th colSpan={2}>Item</th>
              <th>Price</th>
              <th>Quantity</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {shoppingCart.map((item) => {
              return (
                <tr key={item.id}>
                  <td>
                    <Link className="item-title" to={`/shop/${item.id}`}>
                      {item.title}
                    </Link>
                  </td>
                  <td>
                    <Link to={`/shop/${item.id}`}>
                      {" "}
                      <img
                        src={item.img}
                        alt={item.title}
                        className="item-image"
                      />
                    </Link>
                  </td>
                  <td>£{item.price}</td>
                  <td>
                    <input
                      className="quantity-box"
                      type="number"
                      min="0"
                      max="10"
                      value={item.quantity}
                      onChange={(e) => {
                        updateQuantity(item, e);
                      }}
                    />
                  </td>
                  <td>
                    <FaTrash
                      className="remove-item"
                      onClick={() => {
                        removeFromBasket(item);
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot className="table-foot">
            <tr>
              <td colSpan="3">Total - £{calculateTotal()}</td>
              <td>
                <button className="table-foot">Checkout</button>
              </td>
            </tr>
          </tfoot>
        </table>
      ) : (
        <div>
          <h3>
            Shopping Basket Empty!{" "}
            <Link className="shop-link" to={`/shop`}>
              Check out our shop
            </Link>
          </h3>
        </div>
      )}
    </div>
  );
};

export default Basket;
