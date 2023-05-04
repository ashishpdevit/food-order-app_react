import classes from "./Input.module.css";
import React, { forwardRef } from "react";
const Input = React.forwardRef((props, ref) => {
  let classname =  props.input.className ?  props.input.className : classes.input;

  return (
    <div className={classname}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={ref} {...props.input} />
    </div>
  );
});

export default Input;
