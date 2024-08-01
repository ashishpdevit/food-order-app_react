import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import React, { useContext, useState } from "react";
import CartItems from "./CartItems";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckout, setCheckout] = useState(false);
  const [isOrdering, setIsOrdering] = useState(false);
  const [isOrdered, setIsOrdered] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `₹${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  // const removeFromCartHandler = (id) => {
  //   cartCtx.removeItem({
  //     id: id,
  //     name: props.name,
  //     amount: props.amount,
  //     price: props.price,
  //   });
  // };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItems
          key={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  //for Open customer address
  const openDetailsHandler = (event) => {
    setCheckout(true);
  };

  //for ordering and submit it to DB
  const submitOrderHandler = async (consumerData) => {
    setIsOrdering(true);
    await fetch(
      `${process.env.REACT_APP_API_URL}consumerData.json`,
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          user: consumerData,
          order: cartCtx.items,
          bill: cartCtx.totalAmount,
        }),
      }
    );
    setIsOrdering(false);
    setIsOrdered(true);
    cartCtx.clearCart();
  };

  const modalAction = (
    <div className={classes.actions}>
      <button className={classes["nutton-alt"]} onClick={props.onHideCart}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={openDetailsHandler}>
          Order
        </button>
      )}
    </div>
  );

  const modalContent = (
    <React.Fragment>
      {cartItems}
      <hr/>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <hr/>
      {isCheckout && (
        <Checkout
          onCancel={props.onHideCart}
          // totalBill={totalAmount}
          // orderItem={cartCtx}
          onCompleteOrder={submitOrderHandler}
        />
      )}
      {!isCheckout && modalAction}
    </React.Fragment>
  );
  const isOrderingContent = <p>Your order is sending</p>;
  const isOrderedContent = (
    <React.Fragment>
      <p>Your order has been placed</p>
      <div className={classes.actions}>
        <button className={classes["button-alt"]} onClick={props.onHideCart}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onHideCart={props.onHideCart}>
      {!isOrdering && !isOrdered && modalContent}
      {isOrdering && isOrderingContent}
      {!isOrdering && isOrdered && isOrderedContent}
    </Modal>
  );
};
export default Cart;
