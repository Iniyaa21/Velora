import axios from "axios";
import { formatMoney } from "../../utils/money";
import { useState } from "react";

export function CartItemDetails({ cartItem, loadCart }) {
  const [isQuantityBeingChanged, setIsQuantityBeingChanged] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);
  const changeQuantity = async () => {
    setIsQuantityBeingChanged(!isQuantityBeingChanged);
    if (isQuantityBeingChanged) {
      await axios.put(`/api/cart-items/${cartItem.productId}`, {
        quantity,
      });
      await loadCart();
      setIsQuantityBeingChanged(false);
    }
  };
  const deleteCartItem = async () => {
    await axios.delete(`/api/cart-items/${cartItem.productId}`);
    await loadCart();
  };
  return (
    <>
      <img
        className="product-image"
        src={cartItem.product.image}
      />
      <div className="cart-item-details">
        <div className="product-name">{cartItem.product.name}</div>
        <div className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity:{" "}
            {isQuantityBeingChanged ? (
              <input
                type="text"
                className="update-quantity-input"
                value={quantity}
                onChange={(event) => {
                  let quantityInput = Number(event.target.value);
                  setQuantity(quantityInput);
                }}
              />
            ) : (
              <span className="quantity-label">{cartItem.quantity}</span>
            )}
          </span>
          <span
            className="update-quantity-link link-primary"
            onClick={changeQuantity}
          >
            Update
          </span>
          <span
            className="delete-quantity-link link-primary"
            onClick={deleteCartItem}
          >
            Delete
          </span>
        </div>
      </div>
    </>
  );
}
