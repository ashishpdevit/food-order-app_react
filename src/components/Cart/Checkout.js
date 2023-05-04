import { useRef, useState } from "react";
import Input from "../UI/Input";
import classes from "./Checkout.module.css";

// For check empty field
const isEmpty = (value) => value.trim() === "";
// For check char is equal to 6 digit
const isSixChars = (value) => value.trim().length === 6;

const Checkout = (props) => {
  // console.log(props);
  const [inputIsValid, setFormIsValid] = useState({
    name: true,
    address: true,
    city: true,
    pincode: true,
  });

  const nameInputRef = useRef();
  const addressInputRef = useRef();
  const cityInputRef = useRef();
  const pincodeInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();
    // console.log(
    //   nameInputRef.current.value,
    //   addressInputRef.current.value,
    //   cityInputRef.current.value,
    //   pincodeInputRef.current.value
    // );
    const consumerDetail = {
      name: nameInputRef.current.value,
      address: addressInputRef.current.value,
      city: cityInputRef.current.value,
      pincode: pincodeInputRef.current.value,
    };
    // const consumerDetail = {
    //   user: {
    //     name: nameInputRef.current.value,
    //     address: addressInputRef.current.value,
    //     city: cityInputRef.current.value,
    //     pincode: pincodeInputRef.current.value,
    //   },
    //   order: props.orderItem.items,
    //   bill: { totalBill: props.orderItem.totalAmount },
    // };
    //console.log(consumerDetail);

    const nameIsValid = !isEmpty(nameInputRef.current.value);
    const addressIsValid = !isEmpty(addressInputRef.current.value);
    const cityIsValid = !isEmpty(cityInputRef.current.value);
    const pincodeIsValid = isSixChars(pincodeInputRef.current.value);

    setFormIsValid({
      name: nameIsValid,
      address: addressIsValid,
      city: cityIsValid,
      pincode: pincodeIsValid,
    });

    const formIsValid =
      nameIsValid && addressIsValid && cityIsValid && pincodeIsValid;

    if (!formIsValid) {
      return;
    }
    props.onCompleteOrder(consumerDetail);

    if (formIsValid) {
      //   fetch(
      //     "https://food-app-c10a5-default-rtdb.firebaseio.com/consumerData.json",
      //     {
      //       method: "POST",
      //       headers: { "Content-type": "application/json" },
      //       body: JSON.stringify(consumerDetail),
      //     }
      //   );
      console.log(consumerDetail);
    }
  };

  const nameErrorControl = inputIsValid.name ? "" : classes.invalid;
  const addressErrorControl = inputIsValid.address ? "" : classes.invalid;
  const cityErrorControl = inputIsValid.city ? "" : classes.invalid;
  const pincodeErrorControl = inputIsValid.pincode ? "" : classes.invalid;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
        <h3>Delivery details</h3>
      <Input
        input={{
          id: "name",
          type: "text",
          placeholder: "Fullname",
          className: `${classes.control} ${nameErrorControl}`,
        }}
        ref={nameInputRef}
        label="Your Name"
        value={nameInputRef}
      />
      {!inputIsValid.name && (
        <p className={classes.error}>Please Enter the Fullname</p>
      )}

      <Input
        input={{
          id: "address",
          type: "text",
          placeholder: "Full Address",
          className: `${classes.control} ${addressErrorControl}`,
        }}
        ref={addressInputRef}
        label="Address"
      />
      {!inputIsValid.address && (
        <p className={classes.error}>Please Enter the address</p>
      )}

      <Input
        input={{
          type: "text",
          id: "city",
          placeholder: "City",
          className: `${classes.control} ${cityErrorControl}`,
        }}
        ref={cityInputRef}
        label="City"
      />
      {!inputIsValid.city && (
        <p className={classes.error}>Please Enter the Cityname</p>
      )}

      <Input
        input={{
          id: "pincode",
          type: "text",
          placeholder: "Pincode",
          className: `${classes.control} ${pincodeErrorControl}`,
        }}
        ref={pincodeInputRef}
        label="Pincode"
      />
      {!inputIsValid.pincode && (
        <p className={classes.error}>Please Enter the six digit pincode</p>
      )}
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
